//
//  DZReadability_OSXTests.m
//  DZReadability-OSXTests
//
//  Created by Admin on 04/12/14.
//  Copyright (c) 2014 dzamataev. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import <XCTest/XCTest.h>

#import <GGReadabilityParser.h>

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

- (void)testExample {
    // This is an example of a functional test case.
    XCTAssert(YES, @"Pass");
}

- (void)testPerformanceExample {
    // This is an example of a performance test case.
    [self measureBlock:^{
        // Put the code you want to measure the time of here.
    }];
}

@end
