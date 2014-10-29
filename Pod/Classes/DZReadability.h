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

typedef void (^DZReadabilityCompletion)(DZReadability *sender, NSString *contents, NSError *error);

@interface DZReadability : NSObject

- (void)parseContent:(NSString*)text baseUrl:(NSURL*)baseUrl inWebView:(UIWebView*)webView completion:(DZReadabilityCompletion)completionBlock;
@end
