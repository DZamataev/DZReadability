/*
 Copyright (c) 2012 Curtis Hard - GeekyGoodness
 */

/*
 Modified by Denis Zamataev. 2014
 */

#import <Foundation/Foundation.h>

#import <HTMLReader.h>

#import "DZReadability_constants.h"

typedef void (^GGReadabilityParserCompletionHandler)( NSString * content );
typedef void (^GGReadabilityParserErrorHandler)( NSError * error );

@interface GGReadabilityParser : NSObject {
    
    float loadProgress;
    
@private
    GGReadabilityParserErrorHandler errorHandler;
    GGReadabilityParserCompletionHandler completionHandler;
    GGReadabilityParserOptions options;
    NSURL * URL;
    NSURL * baseURL;
    long long dataLength;
    NSMutableData * responseData;
    NSURLConnection * URLConnection;
    NSURLResponse * URLResponse;
    
}

@property ( nonatomic, assign ) float loadProgress;

- (id)initWithOptions:(GGReadabilityParserOptions)parserOptions;
- (id)initWithURL:(NSURL *)aURL
          options:(GGReadabilityParserOptions)parserOptions
completionHandler:(GGReadabilityParserCompletionHandler)cHandler
     errorHandler:(GGReadabilityParserErrorHandler)eHandler;

- (void)cancel;
- (void)render;
- (void)renderWithString:(NSString *)string;

- (HTMLElement *)processXMLDocument:(HTMLDocument *)XML baseURL:(NSURL *)theBaseURL error:(NSError **)error;
@end