//
//  DZReadability.m
//  Pods
//
//  Created by Denis Zamataev on 10/29/14.
//
//

#import "DZReadability.h"

@interface DZReadability () <UIWebViewDelegate>
@property (nonatomic, strong) UIWebView *webView;
@end

@implementation DZReadability
- (instancetype)init {
    self = [super init];
    if (self) {
    }
    return self;
}

- (void)parseContent:(NSString*)text baseUrl:(NSURL*)baseUrl inWebView:(UIWebView*)webView completion:(DZReadabilityCompletion)completionBlock {
    if (text && text.length)
        [webView loadHTMLString:text baseURL:baseUrl];
    [self performSelector:@selector(perform:)   withObject:webView afterDelay:5.0f];
    completionBlock(self, nil, nil);
}

- (void)perform:(UIWebView*)webView {
    id oldDelegate = webView.delegate;
    webView.delegate = self;
    NSString *js = [self redabilityJS];
    NSLog(@"Starts executing js");
    [webView stringByEvaluatingJavaScriptFromString:js];
    
    [self injectReadabilityCSS:webView];
    
    
    webView.delegate = oldDelegate;
}

- (void)injectReadabilityCSS:(UIWebView*)webView {
    NSString* css = [[NSString alloc] initWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"readability" ofType:@"css"] encoding:NSUTF8StringEncoding error:nil];
    NSString* js = [NSString stringWithFormat:
                    @"var styleNode = document.createElement('style');\n"
                    "styleNode.type = \"text/css\";\n"
                    "var styleText = document.createTextNode(%@);\n"
                    "styleNode.appendChild(styleText);\n"
                    "document.getElementsByTagName('head')[0].appendChild(styleNode);\n",css];
    NSLog(@"js:\n%@",js);
    [webView stringByEvaluatingJavaScriptFromString:js];
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
