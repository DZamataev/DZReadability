//
//  DZReadability
//  Pods
//
//  Created by Denis Zamataev on 04/12/14.
//
//

#import <Foundation/Foundation.h>
#import "DZReadability_constants.h"
#import "GGReadabilityParser.h"

@class DZReadability;

typedef void (^DZReadabilityCompletionHandler)( DZReadability *sender, NSString *content, NSError *error );

@interface DZReadability : NSObject
@property (nonatomic, strong) NSString *renderedDocumentContent;

/* Instantiate parser with URL to download and parse. Options is @(GGReadabilityParserOptions) mask. Nil for default options. */
- (instancetype)initWithURLToDownload:(NSURL*)url options:(NSNumber*)optionsNum completionHandler:(DZReadabilityCompletionHandler)completionBlock;

/* Instantiate parser with HTML string to parse. Options is @(GGReadabilityParserOptions) mask. Nil for default options. */
- (instancetype)initWithURL:(NSURL*)url rawDocumentContent:(NSString*)rawDocumentContent options:(NSNumber*)optionsNum completionHandler:(DZReadabilityCompletionHandler)completionBlock;

/* Start parsing using url to download and parse. Options is @(GGReadabilityParserOptions) mask. Nil for default options. */
- (void)startWithURLToDownload:(NSURL*)url options:(NSNumber*)optionsNum completionHandler:(DZReadabilityCompletionHandler)completionBlock;

/* Start parsing. All the heavy-lifting is done on background thread, but completionHandler then invokes on main thread. */
- (void)start;

/* Default parsing options which are used when instantiating with nil options. */
+ (NSInteger)defaultOptions;
@end
