//
//  DZReadability.h
//  Pods
//
//  Created by Denis Zamataev on 10/29/14.
//
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@class DZReadability;
@class DZSynchronousWebView;

typedef void (^DZReadabilityCompletion)(DZReadability *sender, NSString *contents, NSError *error);

@interface DZReadability : NSObject

- (void)parseContentFromWebView:(UIWebView*)webView completion:(DZReadabilityCompletion)completionBlock;
- (void)parseContent:(NSString*)text baseUrl:(NSURL*)baseUrl completion:(DZReadabilityCompletion)completionBlock;
@end
