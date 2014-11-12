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
@property (strong, nonatomic) IBOutlet UISwitch *optSwtch_DownloadImages;
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
    GGReadabilityParserOptionClearLinkLists
    |GGReadabilityParserOptionClearStyles
    |GGReadabilityParserOptionFixLinks
    |GGReadabilityParserOptionFixImages
    |GGReadabilityParserOptionRemoveIFrames
    //|GGReadabilityParserOptionRemoveDivs
    //|GGReadabilityParserOptionRemoveEmbeds
    |GGReadabilityParserOptionRemoveHeader
    //|GGReadabilityParserOptionRemoveHeaders
    |GGReadabilityParserOptionRemoveImageWidthAndHeightAttributes
    ;
    
    if (self.optSwtch_DownloadImages.enabled) {
        options = options | GGReadabilityParserOptionDownloadImages;
    }
    
    
    NSURL *url = [NSURL URLWithString:[self.textView.text stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    void (^handleParseURL)() = ^void() {
        GGReadabilityParser *parser = [[GGReadabilityParser alloc] initWithURL:url
                                                                       options:options
                                                             completionHandler:^(NSString *content)
                                       {
                                           [webView loadHTMLString:content baseURL:url];
                                       }
                                                                  errorHandler:^(NSError *error)
                                       {
                                           NSLog(@"Failed rendering page from url: %@\nError:\n%@", url.absoluteString, error);
                                       }];
        [parser render];

    };
    
    
    NSString *text = self.textView.text;
    // we should have url even when we parse HTML as text in order to fix links. With this sample url the links will be wrong but not null.
    // definately we must know from what URL the HTML document came from
    NSURL *sampleURL = [NSURL URLWithString:@"https://google.com"];
    void (^handleParseText)() = ^void() {
        GGReadabilityParser *parser = [[GGReadabilityParser alloc] initWithURL:sampleURL
                                                                       options:options
                                                             completionHandler:^(NSString *content)
                                       {
                                           [webView loadHTMLString:content baseURL:nil];
                                       }
                                                                  errorHandler:^(NSError *error)
                                       {
                                           NSLog(@"Failed rendering HTML page with error:\n%@", error);
                                       }];
        [parser renderWithString:text];
        
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
        NSString *sampleName = [NSString stringWithFormat:@"Sample%i",++i];
        path = [[NSBundle mainBundle] pathForResource:sampleName ofType:@"html"];
        if (!path) {
            i = 0;
        }
    }
    NSString *content = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:nil];
    self.textView.text = content;
}
@end
