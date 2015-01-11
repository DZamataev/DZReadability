//
//  DZViewController.m
//  DZReadability
//
//  Created by Denis Zamataev on 09/17/2014.
//  Copyright (c) 2014 Denis Zamataev. All rights reserved.
//

#import "DZViewController.h"

@interface DZViewController ()
@property (strong, nonatomic) IBOutlet UITextView *textView;
- (IBAction)changeSampleTextAction:(id)sender;
@end

@implementation DZViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    UIViewController *vc = segue.destinationViewController;
    UIWebView *webView = (UIWebView*)vc.view;
    assert([webView isKindOfClass:[UIWebView class]]);
    
    
    
    GGReadabilityParserOptions options =
    [DZReadability defaultOptions];
    /*
     uncomment to experiment with options
     
    GGReadabilityParserOptionClearLinkLists
    | GGReadabilityParserOptionClearStyles
    | GGReadabilityParserOptionFixImages
    | GGReadabilityParserOptionFixLinks
    //    | GGReadabilityParserOptionRemoveDivs
    | GGReadabilityParserOptionRemoveEmbeds
    //    | GGReadabilityParserOptionRemoveHeader
    //    | GGReadabilityParserOptionRemoveHeaders
    | GGReadabilityParserOptionRemoveIFrames
    //    | GGReadabilityParserOptionRemoveImages
    | GGReadabilityParserOptionDownloadImages
    | GGReadabilityParserOptionRemoveImageWidthAndHeightAttributes
    | GGReadabilityParserOptionClearClassesAndIds
    | GGReadabilityParserOptionRemoveAudio
    | GGReadabilityParserOptionRemoveVideo
    | GGReadabilityParserOptionClearHRefs
    ;
     */
    
    NSNumber *optionsNum = @(options);
    
    
    
    NSURL *url = [NSURL URLWithString:[self.textView.text stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    void (^handleParseURL)() = ^void() {
        DZReadability *readability = [[DZReadability alloc] initWithURLToDownload:url options:optionsNum completionHandler:^(DZReadability *sender, NSString *content, NSError *error) {
            if (!error) {
            NSLog(@"result content:\n%@", content);
                [webView loadHTMLString:content baseURL:url];
            }
            else {
                NSLog(@"Failed rendering page from url: %@\nError:\n%@", url.absoluteString, error);
            }
        }];
        [readability start];
    };
    
    
    NSString *text = self.textView.text;
    // we should have url even when we parse HTML as text in order to fix links. With this sample url the links will be wrong but not null.
    // definately we must know from what URL the HTML document came from
    NSURL *sampleURL = [NSURL URLWithString:@"https://google.com"];
    void (^handleParseText)() = ^void() {
        DZReadability *readability = [[DZReadability alloc] initWithURL:sampleURL rawDocumentContent:text options:optionsNum completionHandler:^(DZReadability *sender, NSString *content, NSError *error) {
            if (!error) {
                NSLog(@"result content:\n%@", content);
                [webView loadHTMLString:content baseURL:url];
            }
            else {
                NSLog(@"Failed rendering page from url: %@\nError:\n%@", url.absoluteString, error);
            }
        }];
        [readability start];
    };
    
    NSDictionary *knownSegueHandlers = @{@"parseAsURL": [handleParseURL copy], @"parseAsHTML": [handleParseText copy]};
    
    
    void (^ handler)() = knownSegueHandlers[segue.identifier];
    if (handler) {
        handler();
    }
}

- (IBAction)changeSampleTextAction:(id)sender {
    static NSInteger i = 0;
    
    NSString *path = nil;
    while (!path) {
        NSString *sampleName = [NSString stringWithFormat:@"Sample%li",(long)++i];
        path = [[NSBundle mainBundle] pathForResource:sampleName ofType:@"html"];
        if (!path) {
            i = 0;
        }
    }
    NSString *content = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:nil];
    self.textView.text = content;
}
@end
