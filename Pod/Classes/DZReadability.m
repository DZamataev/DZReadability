//
//  DZReadability
//  Pods
//
//  Created by Admin on 04/12/14.
//
//

#import "DZReadability.h"

@interface DZReadability ()
@property (nonatomic, strong) GGReadabilityParser *parser;
@property (nonatomic, strong) NSURL *url;
@property (nonatomic, strong) NSString *rawDocumentContent;
@end

@implementation DZReadability
- (instancetype)initWithURLToDownload:(NSURL*)url options:(NSNumber*)optionsNum completionHandler:(DZReadabilityCompletionHandler)completionBlock {
    return [self initWithURL:url rawDocumentContent:nil options:optionsNum completionHandler:completionBlock];
}

- (instancetype)initWithURL:(NSURL*)url rawDocumentContent:(NSString*)rawDocumentContent options:(NSNumber*)optionsNum completionHandler:(DZReadabilityCompletionHandler)completionBlock {
    self = [super init];
    if (self) {
        self.url = url;
        self.rawDocumentContent = rawDocumentContent;
        
        NSInteger options = kNilOptions;
        if (optionsNum) {
            options = optionsNum.integerValue;
        }
        else {
            options = [self defaultOptions];
        }
        
        __weak typeof(self) welf = self;
        self.parser = [[GGReadabilityParser alloc] initWithURL:url options:options completionHandler:^(NSString *content) {
            completionBlock(welf, content, nil);
        } errorHandler:^(NSError *error) {
            completionBlock(welf, nil, error);
        }];
        

    }
    return self;
}

- (void)start {
    NSParameterAssert(self.parser);
    
    if (self.rawDocumentContent && self.rawDocumentContent.length) {
        [self.parser renderWithString:self.rawDocumentContent];
    }
    else {
        [self.parser render];
    }
}

- (NSInteger)defaultOptions {
    
    NSInteger options =
    GGReadabilityParserOptionClearLinkLists
    | GGReadabilityParserOptionClearStyles
    | GGReadabilityParserOptionFixImages
    | GGReadabilityParserOptionFixLinks
//    | GGReadabilityParserOptionRemoveDivs
    | GGReadabilityParserOptionRemoveEmbeds
//    | GGReadabilityParserOptionRemoveHeader
//    | GGReadabilityParserOptionRemoveHeaders
    | GGReadabilityParserOptionRemoveIFrames
//    | GGReadabilityParserOptionRemoveImages
    | GGReadabilityParserOptionDownloadImages
    | GGReadabilityParserOptionRemoveImageWidthAndHeightAttributes
    ;
    
    return options;
}
@end
