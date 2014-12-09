/*
 Copyright (c) 2012 Curtis Hard - GeekyGoodness
 */
#import <Foundation/Foundation.h>

#if TARGET_OS_IPHONE

// Since KissXML is a drop in replacement for NSXML,
// it may be desireable (when writing cross-platform code to be used on both Mac OS X and iOS)
// to use the NSXML prefixes instead of the DDXML prefix.
//
// This way, on Mac OS X it uses NSXML, and on iOS it uses KissXML.

#import <DDXML.h>

#ifndef NSXMLNode
#define NSXMLNode DDXMLNode
#endif
#ifndef NSXMLElement
#define NSXMLElement DDXMLElement
#endif
#ifndef NSXMLDocument
#define NSXMLDocument DDXMLDocument
#endif

#ifndef NSXMLInvalidKind
#define NSXMLInvalidKind DDXMLInvalidKind
#endif
#ifndef NSXMLDocumentKind
#define NSXMLDocumentKind DDXMLDocumentKind
#endif
#ifndef NSXMLElementKind
#define NSXMLElementKind DDXMLElementKind
#endif
#ifndef NSXMLAttributeKind
#define NSXMLAttributeKind DDXMLAttributeKind
#endif
#ifndef NSXMLNamespaceKind
#define NSXMLNamespaceKind DDXMLNamespaceKind
#endif
#ifndef NSXMLProcessingInstructionKind
#define NSXMLProcessingInstructionKind DDXMLProcessingInstructionKind
#endif
#ifndef NSXMLCommentKind
#define NSXMLCommentKind DDXMLCommentKind
#endif
#ifndef NSXMLTextKind
#define NSXMLTextKind DDXMLTextKind
#endif
#ifndef NSXMLDTDKind
#define NSXMLDTDKind DDXMLDTDKind
#endif
#ifndef NSXMLEntityDeclarationKind
#define NSXMLEntityDeclarationKind DDXMLEntityDeclarationKind
#endif
#ifndef NSXMLAttributeDeclarationKind
#define NSXMLAttributeDeclarationKind DDXMLAttributeDeclarationKind
#endif
#ifndef NSXMLElementDeclarationKind
#define NSXMLElementDeclarationKind DDXMLElementDeclarationKind
#endif
#ifndef NSXMLNotationDeclarationKind
#define NSXMLNotationDeclarationKind DDXMLNotationDeclarationKind
#endif

#ifndef NSXMLNodeOptionsNone
#define NSXMLNodeOptionsNone DDXMLNodeOptionsNone
#endif
#ifndef NSXMLNodeExpandEmptyElement
#define NSXMLNodeExpandEmptyElement DDXMLNodeExpandEmptyElement
#endif
#ifndef NSXMLNodeCompactEmptyElement
#define NSXMLNodeCompactEmptyElement DDXMLNodeCompactEmptyElement
#endif
#ifndef NSXMLNodePrettyPrint
#define NSXMLNodePrettyPrint DDXMLNodePrettyPrint
#endif

#ifndef NSXMLDocumentTidyHTML
#define NSXMLDocumentTidyHTML 0
#endif
#ifndef NSXMLDocumentTidyXML
#define NSXMLDocumentTidyXML 0
#endif

#elif TARGET_OS_MAC
#import <Foundation/NSXMLParser.h>
#endif // #if TARGET_OS_IPHONE


typedef void (^GGReadabilityParserCompletionHandler)( NSString * content );
typedef void (^GGReadabilityParserErrorHandler)( NSError * error );

enum {
    GGReadabilityParserOptionNone = -1,
    GGReadabilityParserOptionRemoveHeader = 1 << 2,
    GGReadabilityParserOptionRemoveHeaders = 1 << 3,
    GGReadabilityParserOptionRemoveEmbeds = 1 << 4,
    GGReadabilityParserOptionRemoveIFrames = 1 << 5,
    GGReadabilityParserOptionRemoveDivs = 1 << 6,
    GGReadabilityParserOptionRemoveImages = 1 << 7,
    GGReadabilityParserOptionFixImages = 1 << 8,
    GGReadabilityParserOptionFixLinks = 1 << 9,
    GGReadabilityParserOptionClearStyles = 1 << 10,
    GGReadabilityParserOptionClearLinkLists = 1 << 11,
    GGReadabilityParserOptionDownloadImages = 1 << 12,
    GGReadabilityParserOptionRemoveImageWidthAndHeightAttributes = 1 << 13
};
typedef NSInteger GGReadabilityParserOptions;

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

- (NSXMLElement *)processXMLDocument:(NSXMLDocument *)XML baseURL:(NSURL *)theBaseURL error:(NSError **)error;
@end