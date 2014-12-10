/*
 Copyright (c) 2012 Curtis Hard - GeekyGoodness
 */

#import "GGReadabilityParser.h"

// Original XPath: @".//%@". Alternative XPath: @".//*[matches(name(),'%@','i')]"
NSString * const	tagNameXPath = @".//%@";

@interface GGReadabilityParser ( private )
- (BOOL)checkXMLDocument:(HTMLDocument *)XML bodyElement:(HTMLElement **)theEl error:(NSError **)error;
- (HTMLElement *)findBaseLevelContent:(HTMLElement *)element error:(NSError **)error;
- (NSInteger)scoreElement:(HTMLElement *)element;
@end

@implementation GGReadabilityParser

@synthesize loadProgress;

// CHANGEME: change ivars into private properties where appropriate

- (void)dealloc
{
    [URL release], URL = nil;
    [baseURL release], baseURL = nil;
    [URLResponse release], URLResponse = nil;
    [completionHandler release], completionHandler = nil;
    [errorHandler release], errorHandler = nil;
    [responseData release], responseData = nil;
    [URLConnection release], URLConnection = nil;
    [super dealloc];
}

- (id)initWithOptions:(GGReadabilityParserOptions)parserOptions;
{
    if( ( self = [super init] ) != nil )
    {
        options = parserOptions;
    }
    return self;
}

- (id)initWithURL:(NSURL *)aURL
          options:(GGReadabilityParserOptions)parserOptions
completionHandler:(GGReadabilityParserCompletionHandler)cHandler
     errorHandler:(GGReadabilityParserErrorHandler)eHandler
{
    if( ( self = [super init] ) != nil )
    {
        URL = [aURL retain];
        options = parserOptions;
        completionHandler = [cHandler copy];
        errorHandler = [eHandler copy];
        responseData = [[NSMutableData alloc] init];
        [self setLoadProgress:.1];
    }
    return self;
}

- (void)cancel
{
    if( URLConnection != nil )
    {
        [URLConnection cancel];
    }
}

- (NSError *)defaultError
{
    NSString * errorString = @"Readability was unable to find any suitable content.";
    NSError * error = [NSError errorWithDomain:@"com.geekygoodness.readability"
                                          code:1
                                      userInfo:[NSDictionary dictionaryWithObject:errorString
                                                                           forKey:NSLocalizedDescriptionKey]];
    return error;
}

- (void)errorOut
{
    dispatch_async( dispatch_get_main_queue(), ^(void)
                   {
                       errorHandler([self defaultError]);
                   });
}

- (void)render
{
    // set up the url connection
    URLConnection = [[NSURLConnection connectionWithRequest:[NSURLRequest requestWithURL:URL]
                                                   delegate:self] retain];
    [URLConnection start];
}

#pragma mark NSURLConnectionDelegate

- (void)connection:(NSURLConnection *)connection
  didFailWithError:(NSError *)error
{
    errorHandler( error );
}

- (void)connection:(NSURLConnection *)connection
didReceiveResponse:(NSURLResponse *)response
{
    URLResponse = [response retain];
    baseURL = [[URLResponse URL] retain];
    dataLength = [response expectedContentLength];
}

- (void)connection:(NSURLConnection *)connection
    didReceiveData:(NSData *)data
{
    [responseData appendData:data];
    
    // now set up the percentage
    float prog = ( fabs( (float)[responseData length] / (float)dataLength ) / 100000 ) + 0.1;
    [self setLoadProgress:( prog >= 8.5 ? 8.5 : prog )];
}

- (void)connectionDidFinishLoading:(NSURLConnection *)connection
{
    // async please
    dispatch_async( dispatch_get_global_queue( DISPATCH_QUEUE_PRIORITY_DEFAULT, 0 ), ^(void)
                   {
                       NSString * str = nil;
                       
                       // encodings to try
                       NSInteger encodings[4] = {
                           NSUTF8StringEncoding,
                           NSMacOSRomanStringEncoding,
                           NSASCIIStringEncoding,
                           NSUTF16StringEncoding
                       };
                       
                       // some sites might not be UTF8, so try until nil
                       for( size_t i = 0; i < sizeof( encodings ) / sizeof( NSInteger ); i++ )
                       {
                           if( ( str = [[[NSString alloc] initWithData:responseData
                                                              encoding:encodings[i]] autorelease] ) != nil )
                           {
                               break;
                           }
                       }
                       
                       // if we can’t convert the data to a string, just die
                       if( str == nil )
                       {
                           [self errorOut];
                           return;
                       }
                       
                       // render
                       [self renderWithString:str];
                   });
}

- (void)renderWithString:(NSString *)string
{
    
    // if the main thread, send to an async thread instead
    if( [NSThread currentThread] == [NSThread mainThread] )
    {
        dispatch_async( dispatch_get_global_queue( DISPATCH_QUEUE_PRIORITY_HIGH, 0 ), ^(void){
            [self renderWithString:string];
        });
        return;
    }
    
    NSError * error = nil; // we don’t actually pay attention to this
    
    HTMLDocument * XML = nil;
    
    XML = [HTMLDocument documentWithString:string];
        
	BOOL OKToGo = [self checkXMLDocument:XML bodyElement:NULL error:&error];
    
    // error out if no xml
    if( ! OKToGo )
    {
        [self errorOut];
        return;
    }
	
    HTMLElement * element = [self processXMLDocument:XML baseURL:baseURL error:&error];
    
    
    // we’re done!
    
    NSString * returnContents = [element innerHTML];
    
    // tell our handler :-)
    dispatch_async( dispatch_get_main_queue(), ^(void)
                   {
                       [self setLoadProgress:1.0];
                       if( [returnContents length] == 0 )
                       {
                           [self errorOut];
                           return;
                       }
                       completionHandler( returnContents );
                   });
}

- (BOOL)checkXMLDocument:(HTMLDocument *)XML bodyElement:(HTMLElement **)theEl error:(NSError **)error;
{
	*error = nil;
    
    // find the body tag
    HTMLElement * el = [XML firstNodeMatchingSelector:@"body"];
	
	// is there a child count?
	if( [el numberOfChildren] != 0 )
	{
		if (theEl != NULL)  *theEl = el;
		return YES;
	}
	
    if ((error != NULL) && (*error == nil))  *error = [self defaultError];
	return NO;
}

- (HTMLElement *)processXMLDocument:(HTMLDocument *)XML baseURL:(NSURL *)theBaseURL error:(NSError **)error;
{
    HTMLElement * theEl = nil;
    BOOL OKToGo = NO;
	
	OKToGo = [self checkXMLDocument:XML bodyElement:&theEl error:error];
	
	// error out if no xml
    if( ! OKToGo )  return nil;
    
    // let the fun begin
    HTMLElement * element = [self findBaseLevelContent:theEl error:error];
    
    if( ! element )
    {
        // we tried :-(
        *error = [self defaultError];
        return nil;
    }
    
    // CHANGEME: The next comment doesn’t match what’s going on in the code!
    // now that we have the base element to work with, let’s remove all <div>s that don’t have a parent of a p
    
    NSMutableArray * elementsToRemove = [NSMutableArray new];
    
    // remove divs
    if( options & GGReadabilityParserOptionRemoveDivs )
    {
        [elementsToRemove addObject:@"div"];
    }
    
    // remove embeds
    if( options & GGReadabilityParserOptionRemoveEmbeds )
    {
        [elementsToRemove addObject:@"embed"];
        [elementsToRemove addObject:@"object"];
    }
    
    // remove iframes
    if( options & GGReadabilityParserOptionRemoveIFrames )
    {
        [elementsToRemove addObject:@"iframe"];
    }
    
    // remove images
    if( options & GGReadabilityParserOptionRemoveImages )
    {
        [elementsToRemove addObject:@"img"];
    }
    
    // remove headers
    if( options & GGReadabilityParserOptionRemoveHeader )
    {
        [elementsToRemove addObject:@"h1"];
    }
    
    // remove more headers
    if( options & GGReadabilityParserOptionRemoveHeaders )
    {
        for( NSInteger i = 2; i <= 6; i++ )
        {
            [elementsToRemove addObject:[NSString stringWithFormat:@"h%ld", (long)i]];
        }
    }
    
    // remove any tags specified
    for( NSString * tagToRemove in elementsToRemove )
    {
        NSArray * removeElements = [element nodesMatchingSelector:[NSString stringWithFormat:@"*%@", tagToRemove]];
//        NSArray * removeElements = [element nodesForXPath:[NSString stringWithFormat:tagNameXPath, tagToRemove]
//                                                    error:error];
        
//        if( removeElements == nil ) return nil;
        
        for( HTMLElement * removeEl in removeElements )
        {
            [removeEl removeFromParentNode];
        }
    }
    
    // remove any styles
    if( options & GGReadabilityParserOptionClearStyles )
    {
        NSArray *cleanArray = [element nodesMatchingSelector:@"*[@style]"];
//        NSArray * cleanArray = [element nodesForXPath:@".//*[@style]"
//                                                error:error];
        for( HTMLElement * cleanElement in cleanArray )
        {
            [cleanElement removeAttributeWithName:@"style"];
        }
    }
    
    // clear link lists
    if( options & GGReadabilityParserOptionClearLinkLists )
    {
        NSArray * lookFor = [NSArray arrayWithObjects:@"similar", @"bookmark", @"links", @"social", @"nav", @"comments", @"comment", @"date", @"author", @"time", @"cat", @"related", nil];
        
        NSArray * attributeNames = @[@"id", @"class"];
        
        
        void (^recursiveRemoval)(HTMLElement *el, NSArray *toScan, NSArray *toLookFor) = ^void(HTMLElement *el, NSArray *toScan, NSArray *toLookFor) {
            
            BOOL killCondition = NO;
            
            for (NSString *scan in toScan) {
                NSString *found = el[scan];
                if (found && found.length > 0) {
                    for (NSString *matchAgainst in toLookFor) {
                        if ([found rangeOfString:matchAgainst].location != NSNotFound) {
                            killCondition = YES;
                            break;
                        }
                    }
                }
                if (killCondition) {
                    break;
                }
            }
            
            if (killCondition) {
                [el removeFromParentNode];
            }
            else {
                NSArray *children = [el childElementNodes];
                for (HTMLElement *el in children) {
                    recursiveRemoval(el, toScan, toLookFor);
                }
            }
        };
        
        recursiveRemoval(element, attributeNames, lookFor);
    }
    
    [elementsToRemove removeAllObjects];
    
    // do we need to fix the links or the images?
    NSMutableArray * elementsToFix = [NSMutableArray new];
    
    // <img> tags
    if( options & GGReadabilityParserOptionFixImages )
    {
        [elementsToFix addObject:@{@"tagName" : @"img", @"attributeName" : @"src"}];
    }
    
    // <a> tags
    if( options & GGReadabilityParserOptionFixLinks )
    {
        [elementsToFix addObject:@{@"tagName" : @"a", @"attributeName" : @"href"}];
    }
    
    NSURL *fixUrl = baseURL ? baseURL : URL;
    NSString * fixUrlString = [NSString stringWithFormat:@"%@://%@",[fixUrl scheme],[fixUrl host]];
    
    for( NSDictionary * dict in elementsToRemove )
    {
        // grab the elements
        NSString *tagName = [dict objectForKey:@"tagName"];
        NSArray * els = [element nodesMatchingSelector:[NSString stringWithFormat: @"*%@", tagName]];
//        NSArray * els = [element nodesForXPath:[NSString stringWithFormat:@"//%@",[dict objectForKey:@"tagName"]]
//                                         error:&error];
        for( HTMLElement * fixEl in els )
        {
            NSString *attributeName = [dict objectForKey:@"attributeName"];
            NSString *attribute = fixEl[attributeName];
            if ( [attribute length] > 1 &&
                [[attribute substringToIndex:2] isEqualToString:@"//"] )
            {
                // needs fixing
                NSString * newAttributeString = [NSString stringWithFormat:@"%@:%@",[baseURL scheme],attribute];
                fixEl[attributeName] = newAttributeString;
            }
            else if( [attribute length] != 0 &&
                    [[attribute substringToIndex:1] isEqualToString:@"/"] )
            {
                // needs fixing
                NSString * newAttributeString = [NSString stringWithFormat:@"%@%@",fixUrlString, attribute];
                fixEl[attributeName] = newAttributeString;
            }
        }
    }
    
	return element;
}

// CHANGEME: rename variables named elem…
- (HTMLElement *)findBaseLevelContent:(HTMLElement *)element error:(NSError **)error;
{
    // generally speaking, we hope that the content is within the <p> tags
    
    // clean up the element
    NSArray * toRemove = [NSArray arrayWithObjects:@"noscript", @"script", @"form", nil];
    for( NSString * removeTag in toRemove )
    {
        // find them all
        NSArray * removeArray = [element nodesMatchingSelector:[NSString stringWithFormat:@"%@", removeTag]];
//        NSArray * removeArray = [element nodesForXPath:[NSString stringWithFormat:tagNameXPath, removeTag]
//                                                 error:error];
        for( HTMLElement * removeElement in removeArray )
        {
            [removeElement removeFromParentNode];
        }
    }
    
    // basic instant wins
    NSArray * instantWins = [NSArray arrayWithObjects:@"article-body", nil];
    
    NSUInteger pCount = 0;
    HTMLElement * foundElement = nil;
    
    for( NSString * instantWinName in instantWins )
    {
        NSArray *nodesOfClass = [element nodesMatchingSelector:[NSString stringWithFormat:@".%@", instantWinName]];
        NSArray *nodesOfId = [element nodesMatchingSelector:[NSString stringWithFormat:@"#%@", instantWinName]];
        NSArray *nodes = [NSArray arrayWithArray:[[[NSMutableArray new]
                                                   arrayByAddingObjectsFromArray:nodesOfClass]
                                                  arrayByAddingObjectsFromArray:nodesOfId]];
//        NSArray * nodes = [element nodesForXPath:[NSString stringWithFormat:@".//*[contains(@class,'%@') or contains(@id,'%@')]", instantWinName, instantWinName]
//                                           error:error];
        if( [nodes count] != 0 )
        {
            for( HTMLElement * winElement in nodes )
            {
                NSArray *pNodes = [winElement nodesMatchingSelector:@"*p"];
                NSUInteger count = pNodes.count;
//                NSUInteger count = [[winElement nodesForXPath:@".//p"
//                                                        error:error] count];
                if( count > pCount )
                {
                    pCount = count;
                    foundElement = winElement;
                }
            }
        }
    }
    
    // we found a winning match!
    if( foundElement != nil )
    {
        return foundElement;
    }
    
    NSArray *tags = [element nodesMatchingSelector:@"*p"];
//    NSArray * tags = [element nodesForXPath:@".//p"
//                                      error:error];
    
    NSUInteger currentCount = 0;
    HTMLElement * tagParent = nil;
    for( HTMLElement * tag in tags )
    {
        HTMLElement * parent = [tag parentElement]; // the parent always is an element
        if (parent) {
            // count how many p tags are inside the parent
            NSArray *pNodes = [parent nodesMatchingSelector:@"p"];
            NSUInteger parentTagsCount = pNodes.count;
//            NSUInteger parentTagsCount = [[parent nodesForXPath:@"p"
//                                                          error:error] count];
            if( parentTagsCount > currentCount )
            {
                currentCount = parentTagsCount;
                tagParent = parent;
            }
        }
    }
    
    // old school br tags ( people still do this? :-( )
    BOOL usingBR = NO;
    if( tagParent == nil )
    {
        // try old school br tags
        currentCount = 0;
        usingBR = YES;
        NSArray *tags = [parent nodesMatchingSelector:@"*br"];
//        tags = [element nodesForXPath:@".//br"
//                                error:error];
        for( HTMLElement * tag in tags )
        {
            HTMLElement * parent = [tag parentElement];
            if (parent) {
                // count how many br tags there are
                NSArray *brNodes = [parent nodesMatchingSelector:@"*p"];
                NSUInteger parentTagsCount = brNodes.count;
//                NSUInteger parentTagsCount = [[parent nodesForXPath:@"br"
//                                                              error:error] count];
                parentTagsCount += [self scoreElement:parent];
                if( parentTagsCount > currentCount )
                {
                    currentCount = parentTagsCount;
                    tagParent = parent;
                }
            }
        }
    }
    
    // current br count
    if( usingBR && tagParent != nil )
    {
        NSUInteger textChildren = 0;
        NSUInteger brCount = 0;
        for( HTMLElement * el in [tagParent childElementNodes] )
        {
            if( [[[el tagName] lowercaseString] isEqualToString:@"p"] )
            {
                textChildren++;
            } else if ( [[[el tagName] lowercaseString] isEqualToString:@"br"] ) {
                brCount++;
            }
        }
        
        // whats the ratio?
        if( textChildren < ( brCount / 2 ) )
        {
            tagParent = nil;
        } else {
            // remove any br tags directly next to each other
            NSArray * brs = [tagParent nodesMatchingSelector:@"br[preceding-sibling::br[1]]"];
//            NSArray * brs = [tagParent nodesForXPath:@".//br[preceding-sibling::br[1]]"
//                                               error:error];
            for( HTMLElement * br in brs )
            {
                [br removeFromParentNode];
            }
        }
        
    }
    
    // if nothing is found, let’s try something else…
    if( tagParent == nil )
    {
        
        // now we’re going to try and find the content, because either they don’t use <p> tags or it’s just horrible markup
        NSMutableArray *scores = [NSMutableArray new];
        
        void (^recursiveScore)(HTMLElement *el, GGReadabilityParser *scorer, NSMutableArray *scoresTable) =
        ^void(HTMLElement *el, GGReadabilityParser *scorer, NSMutableArray *scoresTable) {
            NSArray *children = [element childElementNodes];
            for (HTMLElement *child in children) {
                recursiveScore(child, scorer, scoresTable);
            }
            NSInteger *score = [scorer scoreElement:el];
            if (score > 0)
                [scoresTable addObject:@{@"element":el,@"score":@(score)}];
        };
        
        recursiveScore(element, self, scores);
        
        HTMLElement *winner = nil;
        NSInteger bestScore = 0;
        
        for (NSDictionary *scoreResult in scores) {
            NSInteger score = scoreResult[@"score"];
            if (score > bestScore) {
                bestScore = score;
                winner = scoreResult[@"element"];
            }
        }

        if (winner) {
            tagParent = winner;
        }
        else {
            NSLog(@"Scoring doesn't work today");
        }
        
    }
    
    return tagParent;
}

- (NSInteger)scoreElement:(HTMLElement *)element
{
    // these are key words that will probably be inside the class or id of the element that contains the content
    // CHANGEME: move the scores array into an ivar
    NSArray * scores = [NSArray arrayWithObjects:@"post", @"entry", @"content", @"text", @"article", @"story", @"blog", nil];
    NSInteger score = 0;
    for( NSString * positiveWord in scores )
    {
        score += [[[element name] lowercaseString] isEqualToString:positiveWord] ? 150 : 0;
        
        // grab the class names and id names
        // CHANGEME: We could use -cssNamesForAttributeWithName: here
        NSArray * classNames = [element[@"class"] componentsSeparatedByString:@" "];
        NSArray * idNames = [element[@"id"] componentsSeparatedByString:@" "];
        
        // match against the positive class
        for( NSString * className in classNames )
        {
            score += [className rangeOfString:positiveWord].length != 0 ? 20 : 0;
        }
        
        // match against the positive id
        for( NSString * idName in idNames )
        {
            score += [idName rangeOfString:positiveWord].length != 0 ? 30 : 0;
        }
    }
    return score;
}

@end