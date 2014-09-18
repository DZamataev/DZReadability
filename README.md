# DZReadability

[![CI Status](http://img.shields.io/travis/Denis Zamataev/DZReadability.svg?style=flat)](https://travis-ci.org/Denis Zamataev/DZReadability)
[![Version](https://img.shields.io/cocoapods/v/DZReadability.svg?style=flat)](http://cocoadocs.org/docsets/DZReadability)
[![License](https://img.shields.io/cocoapods/l/DZReadability.svg?style=flat)](http://cocoadocs.org/docsets/DZReadability)
[![Platform](https://img.shields.io/cocoapods/p/DZReadability.svg?style=flat)](http://cocoadocs.org/docsets/DZReadability)

## Usage

To run the example project, clone the repo, and run `pod install` from the Example directory first.

The use is simple, you have to create a new GGReadabilityParser object like this:
```
GGReadabilityParser * readability = [[GGReadabilityParser alloc] initWithURL:[NSURL URLWithString:@"someURLHere"]
                                                                   options:GGReadabilityParserOptionClearStyles|GGReadabilityParserOptionClearLinkLists|GGReadabilityParserOptionFixLinks|GGReadabilityParserOptionFixImages|GGReadabilityParserOptionRemoveHeader|GGReadabilityParserOptionRemoveIFrames
                                                           completionHandler:^(NSString *content)
{
    // handle returned content
}
                                                                errorHandler:^(NSError *error) 
{
    // handle error returned
}];
```
This will create object, it requires a NSURL for the URL, a list of options that you want the parser to carry out, a completion handler block and an error block.

To get readability to parser just call:
```
[readability render];
```
If you want to check the load progress of it then you can simply check the loadProgress ivar - you can also bind to this.

If you already got the contents which you want to parse you can call
```
NSString *html = [self.webView stringByEvaluatingJavaScriptFromString:@"document.documentElement.outerHTML"]; // or any other html as string
[readability renderWithString:html];
```

## Requirements

## Installation

DZReadability is available through [CocoaPods](http://cocoapods.org). To install
it, simply add the following line to your Podfile:

    pod "DZReadability"

## Author

Denis Zamataev, denis.zamataev@gmail.com

## License

DZReadability is available under the MIT license. See the LICENSE file for more info.

