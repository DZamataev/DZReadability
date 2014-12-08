/*
 Copyright (c) 2012 Curtis Hard - GeekyGoodness
 */

#import "GGReadabilityParser.h"

// Original XPath: @".//%@". Alternative XPath: @".//*[matches(name(),'%@','i')]"
NSString * const	tagNameXPath = @".//*[lower-case(name())='%@']";

@interface GGReadabilityParser ( private )
- (BOOL)checkXMLDocument:(NSXMLDocument *)XML bodyElement:(NSXMLElement **)theEl error:(NSError **)error;
- (NSXMLElement *)findBaseLevelContent:(NSXMLElement *)element error:(NSError **)error;
- (NSInteger)scoreElement:(NSXMLElement *)element;
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
    
    NSInteger types[2] = {
        NSXMLDocumentTidyHTML,
        NSXMLDocumentTidyXML
    };
    
    NSXMLDocument * XML = nil;
    
    // different types, html, xml
    BOOL OKToGo = NO;
    for( size_t i = 0; i < sizeof( types ) / sizeof( NSInteger ); i++ )
    {
        XML = [[[NSXMLDocument alloc] initWithXMLString:string
                                                options:types[i]
                                                  error:&error] autorelease];
        
		OKToGo = [self checkXMLDocument:XML bodyElement:NULL error:&error];
		if (OKToGo)  break;
    }
    
    // error out if no xml
    if( ! OKToGo )
    {
        [self errorOut];
        return;
    }
	
	NSXMLElement * element = [self processXMLDocument:XML baseURL:baseURL error:&error];
    
    
    // we’re done!
    
    NSString * returnContents = [element XMLString];
    
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

- (BOOL)checkXMLDocument:(NSXMLDocument *)XML bodyElement:(NSXMLElement **)theEl error:(NSError **)error;
{
	*error = nil;
    
    // find the body tag
	NSXMLElement * el = [[XML nodesForXPath:@"//body"
									  error:error] lastObject];
	
	// is there a child count?
	if( [el childCount] != 0 )
	{
		if (theEl != NULL)  *theEl = el;
		return YES;
	}
	
    if ((error != NULL) && (*error == nil))  *error = [self defaultError];
	return NO;
}

- (NSXMLElement *)processXMLDocument:(NSXMLDocument *)XML baseURL:(NSURL *)theBaseURL error:(NSError **)error;
{
    NSXMLElement * theEl = nil;
    BOOL OKToGo = NO;
	
	OKToGo = [self checkXMLDocument:XML bodyElement:&theEl error:error];
	
	// error out if no xml
    if( ! OKToGo )  return nil;
    
    // let the fun begin
    NSXMLElement * element = [self findBaseLevelContent:theEl error:error];
    
    if( ! element )
    {
        // we tried :-(
        *error = [self defaultError];
        return nil;
    }
    
    // CHANGEME: The next comment doesn’t match what’s going on in the code!
    // now that we have the base element to work with, let’s remove all <div>s that don’t have a parent of a p
    
    NSMutableArray * elementsToRemove = [NSMutableArray array];
    
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
        NSArray * removeElements = [element nodesForXPath:[NSString stringWithFormat:tagNameXPath, tagToRemove]
                                                    error:error];
        
        if( removeElements == nil ) return nil;
        
        for( NSXMLElement * removeEl in removeElements )
        {
            [removeEl detach];
        }
    }
    
    // remove any styles
    if( options & GGReadabilityParserOptionClearStyles )
    {
        NSArray * cleanArray = [element nodesForXPath:@".//*[@style]"
                                                error:error];
        for( NSXMLElement * cleanElement in cleanArray )
        {
            [cleanElement removeAttributeForName:@"style"];
        }
    }
    
    // clear link lists
    if( options & GGReadabilityParserOptionClearLinkLists )
    {
        NSArray * lookFor = [NSArray arrayWithObjects:@"similar", @"bookmark", @"links", @"social", @"nav", @"comments", @"comment", @"date", @"author", @"time", @"cat", @"related", nil];
        
        NSXMLNode *elem = element;
        
        do
        {
            NSXMLElement * theElement = ([elem kind] == NSXMLElementKind) ? (NSXMLElement *)elem : nil;
            
            elem = [elem nextNode]; // We do this here, because we might detach elem below
            
            if (theElement == nil)  continue;
            
            // grab the ids
            // CHANGEME: We could use -cssNamesForAttributeWithName: here
            NSArray * idNames = [[[theElement attributeForName:@"id"] stringValue] componentsSeparatedByString:@" "];
            
            BOOL killElement = NO;
            for( NSString * idName in idNames )
            {
                for( NSString * matchAgainst in lookFor )
                {
                    if( [idName rangeOfString:matchAgainst].location != NSNotFound )
                    {
                        killElement = YES;
                        break;
                    }
                }
                if( killElement )
                {
                    break;
                }
            }
            
            if( killElement )
            {
                // we can skip the children of theElement, because we are detaching it anyway
                NSXMLNode * nextSibling = [theElement nextSibling];
                if (nextSibling != nil)  elem = nextSibling;
                
                [theElement detach];
                continue;
            }
            
            // grab the class names
            NSArray * classNames = [[[theElement attributeForName:@"class"] stringValue] componentsSeparatedByString:@" "];
            
            for( NSString * className in classNames )
            {
                for( NSString * matchAgainst in lookFor )
                {
                    if( [className rangeOfString:matchAgainst].location != NSNotFound )
                    {
                        killElement = YES;
                        break;
                    }
                }
                if( killElement )
                {
                    break;
                }
            }
            
            // if kill element, remove it!
            if( killElement )
            {
                // we can skip the children of theElement, because we are detaching it anyway
                NSXMLNode * nextSibling = [theElement nextSibling];
                if (nextSibling != nil)  elem = nextSibling;
                
                [theElement detach];
            }
            
        } while (elem != nil);
    }
    
    [elementsToRemove removeAllObjects];
    
    // do we need to fix the links or the images?
    NSMutableArray * elementsToFix = [NSMutableArray array];
    
    // <img> tags
    if( options & GGReadabilityParserOptionFixImages )
    {
        [elementsToFix addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"img", @"tagName", @"src", @"attributeName",nil]];
    }
    
    // <a> tags
    if( options & GGReadabilityParserOptionFixLinks )
    {
        [elementsToFix addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"a", @"tagName", @"href", @"attributeName",nil]];
    }
    
    if (theBaseURL != nil) {
		for( NSDictionary * dict in elementsToFix )
		{
			// grab the elements
			NSArray * els = [element nodesForXPath:[NSString stringWithFormat:tagNameXPath,[dict objectForKey:@"tagName"]]
											 error:error];
			
			if( els == nil )  return nil;
			
			NSString * attributeName = [dict objectForKey:@"attributeName"];
			
			for( NSXMLElement * fixEl in els )
			{
				NSXMLNode * attribute = [fixEl attributeForName:attributeName];
				NSString * attributeStringValue = [attribute stringValue];
				
				// CHANGEME: This ignores relative paths
				// CHANGEME: This is not necessary when processing webarchives
				if( [attributeStringValue length] != 0 &&
				   [attributeStringValue hasPrefix:@"/"] )
				{
					// needs fixing
					NSString * newAttributeString = [[NSURL URLWithString:attributeStringValue
															relativeToURL:theBaseURL] absoluteString];
					[attribute setStringValue:newAttributeString];
				}
			}
		}
    }
    
	return element;
}

// CHANGEME: rename variables named elem…
- (NSXMLElement *)findBaseLevelContent:(NSXMLElement *)element error:(NSError **)error;
{
    // generally speaking, we hope that the content is within the <p> tags
    
    // clean up the element
    NSArray * toRemove = [NSArray arrayWithObjects:@"noscript", @"script", @"form", nil];
    for( NSString * removeTag in toRemove )
    {
        // find them all
        NSArray * removeArray = [element nodesForXPath:[NSString stringWithFormat:tagNameXPath, removeTag]
                                                 error:error];
        for( NSXMLElement * removeElement in removeArray )
        {
            [removeElement detach];
        }
    }
    
    // basic instant wins
    NSArray * instantWins = [NSArray arrayWithObjects:@"article-body", nil];
    
    NSUInteger pCount = 0;
    NSXMLElement * foundElement = nil;
    
    for( NSString * instantWinName in instantWins )
    {
        NSArray * nodes = [element nodesForXPath:[NSString stringWithFormat:@".//*[contains(@class,'%@') or contains(@id,'%@')]", instantWinName, instantWinName]
                                           error:error];
        if( [nodes count] != 0 )
        {
            for( NSXMLElement * winElement in nodes )
            {
                NSUInteger count = [[winElement nodesForXPath:@".//p"
                                                        error:error] count];
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
    
    NSArray * tags = [element nodesForXPath:@".//p"
                                      error:error];
    
    NSUInteger currentCount = 0;
    NSXMLElement * tagParent = nil;
    for( NSXMLElement * tag in tags )
    {
        NSXMLElement * parent = (NSXMLElement *)[tag parent]; // the parent always is an element
        
        // count how many p tags are inside the parent
        NSUInteger parentTagsCount = [[parent nodesForXPath:@"p"
                                                      error:error] count];
        if( parentTagsCount > currentCount )
        {
            currentCount = parentTagsCount;
            tagParent = parent;
        }
    }
    
    // old school br tags ( people still do this? :-( )
    BOOL usingBR = NO;
    if( tagParent == nil )
    {
        // try old school br tags
        currentCount = 0;
        usingBR = YES;
        tags = [element nodesForXPath:@".//br"
                                error:error];
        for( NSXMLElement * tag in tags )
        {
            NSXMLElement * parent = (NSXMLElement *)[tag parent];
            
            // count how many br tags there are
            NSUInteger parentTagsCount = [[parent nodesForXPath:@"br"
                                                          error:error] count];
            parentTagsCount += [self scoreElement:parent];
            if( parentTagsCount > currentCount )
            {
                currentCount = parentTagsCount;
                tagParent = parent;
            }
        }
    }
    
    // current br count
    if( usingBR && tagParent != nil )
    {
        NSUInteger textChildren = 0;
        NSUInteger brCount = 0;
        for( NSXMLElement * el in [tagParent children] )
        {
            if( [el kind] == NSXMLTextKind )
            {
                textChildren++;
            } else if ( [[[el name] lowercaseString] isEqualToString:@"br"] ) {
                brCount++;
            }
        }
        
        // whats the ratio?
        if( textChildren < ( brCount / 2 ) )
        {
            tagParent = nil;
        } else {
            // remove any br tags directly next to each other
            NSArray * brs = [tagParent nodesForXPath:@".//br[preceding-sibling::br[1]]"
                                               error:error];
            for( NSXMLElement * br in brs )
            {
                [br detach];
            }
        }
        
    }
    
    // if nothing is found, let’s try something else…
    if( tagParent == nil )
    {
        
        // now we’re going to try and find the content, because either they don’t use <p> tags or it’s just horrible markup
        
        NSMutableDictionary * scoreDict = [NSMutableDictionary dictionary];
        
        // grab everything that has it within class or id
        NSXMLNode * elem = element;
        
        do
        {
            NSXMLElement * el;
            if( [elem kind] == NSXMLElementKind )  el = (NSXMLElement *)elem;
            else  continue;
            
            // grab its hash
            NSNumber *scoreNum = [scoreDict objectForKey:el];
            
            NSInteger score = scoreNum ? [scoreNum integerValue] : 0;
            score += [self scoreElement:el];
            
            // store it in the dict
            [scoreDict setObject:[NSNumber numberWithInteger:score]
                          forKey:el];
        } while ((elem = [elem nextNode]) != nil);
        
        __block NSXMLElement *bestKey = nil;
        __block NSInteger bestScore = 0;
        [scoreDict enumerateKeysAndObjectsUsingBlock:^(NSXMLElement *key, NSNumber *scoreNum, BOOL *stop)
         {
             NSInteger score = [scoreNum integerValue];
             if (score > bestScore)
             {
                 bestKey = key;
                 bestScore = score;
             }
         }];
        
        // CHANGEME: The above use of an NSMutableDictionary will fail horribly if there happen to be two NSXMLElement objects in the tree that are equal as defined by -isEqual: . The problem here is that the equality check will ignore the location of the element within the tree. If we try to actually use the scores to find a suitable element the resulting element we get is not deterministic from a global perspective. We can apply the solution used in readability-objc (HashableElement): https://github.com/JanX2/readability-objc [Jan]
        
        // set the parent tag
        tagParent = bestKey;
        
    }
    
    return tagParent;
}

- (NSInteger)scoreElement:(NSXMLElement *)element
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
        NSArray * classNames = [[[element attributeForName:@"class"] stringValue] componentsSeparatedByString:@" "];
        NSArray * idNames = [[[element attributeForName:@"id"] stringValue] componentsSeparatedByString:@" "];
        
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