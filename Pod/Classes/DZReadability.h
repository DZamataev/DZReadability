//
//  DZReadability
//  Pods
//
//  Created by Admin on 04/12/14.
//
//

#import <Foundation/Foundation.h>
#import "GGReadabilityParser.h"




@class DZReadability;

typedef void (^DZReadabilityCompletionHandler)( DZReadability *sender, NSString *content, NSError *error );

@interface DZReadability : NSObject
@property (nonatomic, strong) NSString *renderedDocumentContent;

- (instancetype)initWithURLToDownload:(NSURL*)url options:(NSNumber*)optionsNum completionHandler:(DZReadabilityCompletionHandler)completionBlock;
- (instancetype)initWithURL:(NSURL*)url rawDocumentContent:(NSString*)rawDocumentContent options:(NSNumber*)optionsNum completionHandler:(DZReadabilityCompletionHandler)completionBlock;

- (void)start;
@end
