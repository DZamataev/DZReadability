//  HTMLDocument.h
//
//  Public domain. https://github.com/nolanw/HTMLReader

#import <Foundation/Foundation.h>
#import "HTMLDocumentType.h"
#import "HTMLElement.h"
#import "HTMLNode.h"
#import "HTMLQuirksMode.h"
#import "HTMLSupport.h"

/**
 * An HTMLDocument is the root of a tree of nodes representing parsed HTML.
 *
 * For more information, see http://www.whatwg.org/specs/web-apps/current-work/multipage/syntax.html#writing
 */
@interface HTMLDocument : HTMLNode

/**
 * Parses an HTML string into a document.
 */
+ (instancetype)documentWithString:(NSString *)string;

/**
 * Initializes a document with a string of HTML.
 */
- (instancetype)initWithString:(NSString *)string;

/**
 * The document type node.
 *
 * The setter replaces the existing documentType, if there is one; otherwise, the new documentType will be placed immediately before the rootElement, if there is one; otherwise the new documentType is added as the last child.
 */
@property (strong, nonatomic) HTMLDocumentType *documentType;

/**
 * The document's quirks mode.
 */
@property (assign, nonatomic) HTMLQuirksMode quirksMode;

/**
 * The first element in tree order. Typically the `<html>` element.
 *
 * The setter replaces the existing rootElement, if there is one; otherwise, the new rootElement is added as the last child.
 */
@property (strong, nonatomic) HTMLElement *rootElement;

@end
