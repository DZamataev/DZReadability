//
//  DZReadability.m
//  Pods
//
//  Created by Denis Zamataev on 10/29/14.
//
//

#import "DZReadability.h"
#import "DZSynchronousWebView.h"

@interface DZReadability () <UIWebViewDelegate>
@end

@implementation DZReadability
- (instancetype)init {
    self = [super init];
    if (self) {
    }
    return self;
}

- (void)parseContentFromWebView:(UIWebView*)webView completion:(DZReadabilityCompletion)completionBlock {
    NSURL *baseUrl = webView.request.URL.copy;
    NSString *text = [webView stringByEvaluatingJavaScriptFromString:@"document.documentElement.outerHTML"];
    [self parseContent:text baseUrl:baseUrl completion:completionBlock];
}

- (void)parseContent:(NSString*)text baseUrl:(NSURL*)baseUrl completion:(DZReadabilityCompletion)completionBlock {
    assert(text && text.length > 0);
    assert(baseUrl);
    
    DZSynchronousWebView *webView = [[DZSynchronousWebView alloc] init];
    webView.suppressesIncrementalRendering = YES;
    
    [self loadTemplatedContent:text inWebView:webView baseUrl:baseUrl];
    
    NSString *htmlS = [webView stringByEvaluatingJavaScriptFromString:@"document.documentElement.outerHTML"];
    [self invokeReadabilityJSInWebView:webView];
    
    NSString *html = [webView stringByEvaluatingJavaScriptFromString:@"document.documentElement.outerHTML"];
    
    completionBlock(self, html, nil);
}

- (void)loadTemplatedContent:(NSString*)text inWebView:(UIWebView*)webView baseUrl:(NSURL*)baseUrl {
    NSString* template;
    NSString* path = [[NSBundle mainBundle] pathForResource:@"readability-template" ofType:@"html"];
    if (path) {
        template = [NSString stringWithContentsOfFile:path
                                             encoding:NSUTF8StringEncoding
                                                error:NULL];
    }
    NSString *formattedArticle = [template stringByReplacingOccurrencesOfString:@"$$$ARTICLE_CONTENT$$$" withString:text];
    [webView loadHTMLString:formattedArticle baseURL:baseUrl];
    
    // the next line totally removes contextual menu from web view which is triggered on long pressing the link
    [webView stringByEvaluatingJavaScriptFromString: @"document.body.style.webkitTouchCallout='none';" ];
}

- (void)invokeReadabilityJSInWebView:(UIWebView*)webView {
    id oldDelegate = webView.delegate;
    webView.delegate = self;

    
    NSString *js = [self redabilityJS];
    NSLog(@"Starts executing js");
    [webView stringByEvaluatingJavaScriptFromString:js];
    
    webView.delegate = oldDelegate;
}

- (NSString*)redabilityJS {
    NSString *path = [[NSBundle mainBundle] pathForResource:@"readability" ofType:@"js"];
    NSString *content = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:nil];
    return content;
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
    if ([request.URL.scheme isEqualToString:@"debugger"]) {
        NSLog(@"JSLog: %@", [request.URL.absoluteString stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding]);
        return NO;
    }
    return YES;
}
@end
