//
//  DZReadability_OSXTests.m
//  DZReadability-OSXTests
//
//  Created by Admin on 04/12/14.
//  Copyright (c) 2014 dzamataev. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import <XCTest/XCTest.h>

#import <DZReadability.h>

@interface DZReadability_OSXTests : XCTestCase

@end

@implementation DZReadability_OSXTests

- (void)setUp {
    [super setUp];
    // Put setup code here. This method is called before the invocation of each test method in the class.
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (NSArray*)sampleDocumentURLs {
    return @[[NSURL URLWithString:@"https://ru.wikipedia.org/wiki/%D0%9F%D1%83%D1%82%D0%B8%D0%BD,_%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B8%D1%87"],
             [NSURL URLWithString:@"http://m.habrahabr.ru/company/friifond/blog/245253/"]
             
             
             
             ];
}

- (void)testSamples {
    NSInteger i = 0;
    NSArray *sampleDocumentURLs = [self sampleDocumentURLs];
    
    while (true) {
        
        NSString *sampleName = [NSString stringWithFormat:@"Sample%li",(long)i];
        NSString *samplePath = [[NSBundle mainBundle] pathForResource:sampleName ofType:@"html"];
        NSString *resultName = [NSString stringWithFormat:@"Result%li",(long)i];
        NSString *resultPath = [[NSBundle mainBundle] pathForResource:resultName ofType:@"html"];
        
        NSURL *docUrl = nil;
        if (sampleDocumentURLs.count > i) {
            docUrl = sampleDocumentURLs[i];
        }
        
        if (!samplePath || !docUrl || !resultPath) {
            break;
        }
        
        NSLog(@"Iteration %li", (long)i);
        
        i++;
        
        NSString *sampleContent = [NSString stringWithContentsOfFile:samplePath encoding:NSUTF8StringEncoding error:nil];
        NSString *resultContent = [NSString stringWithContentsOfFile:resultPath encoding:NSUTF8StringEncoding error:nil];
        
        XCTestExpectation *expectation;
        DZReadability *readability;
        
        // download and parse
//        __block NSString *parsedContent = nil;
//        expectation = [self expectationWithDescription:nil];
//        readability = [[DZReadability alloc] initWithURLToDownload:docUrl options:kNilOptions completionHandler:^(DZReadability *sender, NSString *content, NSError *error) {
//            XCTAssert(content && content.length > 0);
//            parsedContent = content;
//            [expectation fulfill];
//        }];
//        [readability start];
//        
//        [self waitForExpectationsWithTimeout:25.0 handler:nil];
        
        // compare parsed samples and result expected
        expectation = [self expectationWithDescription:nil];
        readability = [[DZReadability alloc] initWithURL:docUrl rawDocumentContent:sampleContent options:nil completionHandler:^(DZReadability *sender, NSString *content, NSError *error) {
            XCTAssert(content && content.length > 0);
            XCTAssert([resultContent isEqualToString:content]);
            [expectation fulfill];
        }];
        [readability start];
        
        [self waitForExpectationsWithTimeout:25.0 handler:nil];
        
    }
}
@end
