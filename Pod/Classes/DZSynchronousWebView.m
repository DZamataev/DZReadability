//
//  DZSynchronousWebView.m
//  Pods
//
//  Created by Admin on 05/11/14.
//
//

#import "DZSynchronousWebView.h"

@interface DZSynchronousWebView () <UIWebViewDelegate> {
	id proxyDelegate;
}

@end

@implementation DZSynchronousWebView

-(instancetype) init
{
    self = [super init];
	if (self) {
		self.delegate = self;
	}
	return self;
}

-(instancetype) initWithCoder:(NSCoder *)aDecoder
{
    self = [super initWithCoder:aDecoder];
	if (self) {
		self.delegate = self;
	}
	return self;
}

-(instancetype) initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
		self.delegate = self;
	}
	return self;
}

-(void) setDelegate:(id <UIWebViewDelegate>) delegate;
{
	[super setDelegate:self];
	if(delegate != self)
		proxyDelegate = delegate;
}


-(void) webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
	[self performSelector:@selector(stopRunLoop) withObject:nil afterDelay:.01];
	
	if([proxyDelegate respondsToSelector:@selector(webView:didFailLoadWithError:)])
		[proxyDelegate webView:webView didFailLoadWithError:error];
}

-(BOOL) webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
	if([proxyDelegate respondsToSelector:@selector(webView:shouldStartLoadWithRequest:navigationType:)])
		return [proxyDelegate webView:webView shouldStartLoadWithRequest:request navigationType:navigationType];
	return YES;
}

-(void) webViewDidFinishLoad:(UIWebView *)webView
{
	[self performSelector:@selector(stopRunLoop) withObject:nil afterDelay:.01];
	if([proxyDelegate respondsToSelector:@selector(webViewDidFinishLoad:)])
		[proxyDelegate webViewDidFinishLoad:webView];
}

-(void) stopRunLoop
{
	CFRunLoopRef runLoop = [[NSRunLoop currentRunLoop] getCFRunLoop];
	CFRunLoopStop(runLoop);
	
}

-(void) webViewDidStartLoad:(UIWebView *)webView
{
	if([proxyDelegate respondsToSelector:@selector(webViewDidStartLoad:)])
		[proxyDelegate webViewDidStartLoad:webView];
}


-(void) loadHTMLString:(NSString *)string baseURL:(NSURL *)baseURL
{
	[super loadHTMLString:string baseURL:baseURL];
	
	CFRunLoopRunInMode((CFStringRef)NSDefaultRunLoopMode, 1, NO);
}

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect
{
    // Drawing code
}
*/

@end
