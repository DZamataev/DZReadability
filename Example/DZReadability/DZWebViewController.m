//
//  DZWebViewController.m
//  DZReadability
//
//  Created by Denis Zamataev on 9/25/14.
//  Copyright (c) 2014 Denis Zamataev. All rights reserved.
//

#import "DZWebViewController.h"

@interface DZWebViewController ()
@property (nonatomic, strong) IBOutlet UIWebView *webView;

@end

@implementation DZWebViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([segue.identifier isEqualToString:@"viewPageSource"]) {
        UIViewController *vc = segue.destinationViewController;
        UITextView *textView = (UITextView*)vc.view;
        assert([textView isKindOfClass:[UITextView class]]);
        
        NSString *pageSource = [self.webView stringByEvaluatingJavaScriptFromString:@"document.documentElement.outerHTML"];
        textView.text = pageSource;
    }
}

@end
