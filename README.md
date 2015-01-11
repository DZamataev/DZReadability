# DZReadability

[![CI Status](http://img.shields.io/travis/Denis Zamataev/DZReadability.svg?style=flat)](https://travis-ci.org/Denis Zamataev/DZReadability)
[![Version](https://img.shields.io/cocoapods/v/DZReadability.svg?style=flat)](http://cocoadocs.org/docsets/DZReadability)
[![License](https://img.shields.io/cocoapods/l/DZReadability.svg?style=flat)](http://cocoadocs.org/docsets/DZReadability)
[![Platform](https://img.shields.io/cocoapods/p/DZReadability.svg?style=flat)](http://cocoadocs.org/docsets/DZReadability)

## Usage

To run the example project, clone the repo, and run `pod install` from the Example directory first.

The use is simple, you have to create a new DZReadability object like this (with URL of the document which then will be downloaded and parsed):
```
	self.readability = [[DZReadability alloc] initWithURLToDownload:docUrl options:nil completionHandler:^(DZReadability *sender, NSString *content, NSError *error) {
		if (!error) {
			NSLog(@"result content:\n%@", content);
	    	// handle returned content
		}
		else {
			// handle error
		}
	}];
	[self.readability start];
```

If you already got the contents which you want to parse you can call
```
	NSString *html = [webView stringByEvaluatingJavaScriptFromString:@"document.documentElement.outerHTML"]; // or any other html as string
	readability = [[DZReadability alloc] initWithURL:docUrl rawDocumentContent:html options:nil completionHandler:^(DZReadability *sender, NSString *content, NSError *error) {
		if (!error) {
			NSLog(@"result content:\n%@", content);
	    	// handle returned content
		}
		else {
			// handle error
		}
	}];
	[readability start];
```

## Requirements
```
ARC
OSX >= 10.7
iOS >= 5.0

dependency 'HTMLReader'
```


## Installation

DZReadability is available through [CocoaPods](http://cocoapods.org). To install
it, simply add the following line to your Podfile:

    pod "DZReadability"

## Author

Denis Zamataev, denis.zamataev@gmail.com

Curtis Hard, https://github.com/curthard89 (https://github.com/curthard89/COCOA-Stuff/tree/master/GGReadabilityParser)

## License

DZReadability s available under the MIT license. See the LICENSE file for more info.

