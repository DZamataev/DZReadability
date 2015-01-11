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
	
	
## About 

The main idea is all about making webpage readable on a mobile device. The parser has enough options to provide you, given an ordinary webpage URL or contents, HTML document with clear markup which contains only the main article contents. There is also an option to download and embed images so you can use the document fully offline, loading it into WebView.
The basic concept was found in Curtis Hard`s repo (https://github.com/curthard89/COCOA-Stuff/tree/master/GGReadabilityParser) and it was greatly improved with new features: iOS compatibility (thanks to HTMLReader project), new clearing options, image download option, CSS selectors instead of XPath, ARC, performance optimizations.
Please feel free to submit bugs and pull requests.
I've found no similiar projects, so pm me if you know some.
It's also nice to know the projects which use this code so please let me know if you do so.


## Author

Denis Zamataev, denis.zamataev@gmail.com

Curtis Hard, https://github.com/curthard89 (https://github.com/curthard89/COCOA-Stuff/tree/master/GGReadabilityParser)

## License

DZReadability s available under the MIT license. See the LICENSE file for more info.

