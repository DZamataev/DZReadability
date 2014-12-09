//  HTMLNode.m
//
//  Public domain. https://github.com/nolanw/HTMLReader

#import "HTMLNode.h"
#import "HTMLDocument.h"
#import "HTMLTextNode.h"
#import "HTMLTreeEnumerator.h"

@interface HTMLChildrenRelationshipProxy : NSMutableOrderedSet

- (instancetype)initWithNode:(HTMLNode *)node children:(NSMutableOrderedSet *)children;

@property (readonly, strong, nonatomic) HTMLNode *node;

@property (readonly, strong, nonatomic) NSMutableOrderedSet *children;

@end

@implementation HTMLNode
{
    NSMutableOrderedSet *_children;
}

- (instancetype)init
{
    if ((self = [super init])) {
        _children = [NSMutableOrderedSet new];
    }
    return self;
}

- (HTMLDocument *)document
{
    HTMLNode *currentNode = self.parentNode;
    while (currentNode && ![currentNode isKindOfClass:[HTMLDocument class]]) {
        currentNode = currentNode.parentNode;
    }
    return (HTMLDocument *)currentNode;
}

- (void)setParentNode:(HTMLNode *)parentNode
{
    [self setParentNode:parentNode updateChildren:YES];
}

- (void)setParentNode:(HTMLNode *)parentNode updateChildren:(BOOL)updateChildren
{
    [_parentNode removeChild:self updateParentNode:NO];
    _parentNode = parentNode;
    if (updateChildren) {
        [parentNode addChild:self updateParentNode:NO];
    }
}

- (HTMLElement *)parentElement
{
    HTMLNode *parent = self.parentNode;
    return [parent isKindOfClass:[HTMLElement class]] ? (HTMLElement *)parent : nil;
}

- (void)setParentElement:(HTMLElement *)parentElement
{
    self.parentNode = parentElement;
}

- (void)removeFromParentNode
{
    [self.parentNode.mutableChildren removeObject:self];
}

- (NSOrderedSet *)children
{
    return [_children copy];
}

// In order to quickly mutate the children set, we need to pull some shenanigans. From the Key-Value Coding Programming Guide:
//
// > When the default implementation of valueForKey: is invoked on a receiver, the following search pattern is used:
// >
// > 1. Searches the class of the receiver for an accessor method whose name matches the pattern get<Key>, <key>, or is<Key>, in that order. If such a method is found it is invoked.…
// > 2. Otherwise (no simple accessor method is found), searches the class of the receiver for methods whose names match the patterns countOf<Key> and objectIn<Key>AtIndex: … and <key>AtIndexes:….
// > If the countOf<Key> method and at least one of the other two possible methods are found, a collection proxy object that responds to all NSArray [sic] methods is returned. Each NSArray [sic] message sent to the collection proxy object will result in some combination of countOf<Key>, objectIn<Key>AtIndex:, and <key>AtIndexes: messages being sent to the original receiver of valueForKey:.
//
// From this, we can see that implementing -children stops us at step 1, and our implementation involves copying the set so it is slow. To work around this, we become KVC-compliant for the key "HTMLMutableChildren" and implement the accessors for that key. Since we don't implement -HTMLMutableChildren et al (step 1), our accessors are used instead (step 2), and all is well.
//
// Note that -mutableOrderedSetValueForKey: will still work for the key "children", it'll just be slow.

- (NSMutableOrderedSet *)mutableChildren
{
    return [[HTMLChildrenRelationshipProxy alloc] initWithNode:self children:_children];
}

- (NSUInteger)numberOfChildren
{
    return _children.count;
}

- (HTMLNode *)childAtIndex:(NSUInteger)index
{
    return _children[index];
}

- (NSUInteger)indexOfChild:(HTMLNode *)child
{
    return [_children indexOfObject:child];
}

- (void)insertObject:(HTMLNode *)node inChildrenAtIndex:(NSUInteger)index
{
    [_children insertObject:node atIndex:index];
    [node setParentNode:self updateChildren:NO];
}

- (void)insertChildren:(NSArray *)array atIndexes:(NSIndexSet *)indexes
{
    [_children insertObjects:array atIndexes:indexes];
    for (HTMLNode *node in array) {
        [node setParentNode:self updateChildren:NO];
    }
}

- (void)removeObjectFromChildrenAtIndex:(NSUInteger)index
{
    HTMLNode *node = _children[index];
    [_children removeObjectAtIndex:index];
    [node setParentNode:nil updateChildren:NO];
}

- (void)removeChildrenAtIndexes:(NSIndexSet *)indexes
{
    NSArray *nodes = [_children objectsAtIndexes:indexes];
    [_children removeObjectsAtIndexes:indexes];
    for (HTMLNode *node in nodes) {
        [node setParentNode:nil updateChildren:NO];
    }
}

- (void)replaceObjectInChildrenAtIndex:(NSUInteger)index withObject:(HTMLNode *)node
{
    HTMLNode *old = _children[index];
    [_children replaceObjectAtIndex:index withObject:node];
    [old setParentNode:nil updateChildren:NO];
    [node setParentNode:self updateChildren:NO];
}

- (void)addChild:(HTMLNode *)node updateParentNode:(BOOL)updateParentNode
{
    [_children addObject:node];
    if (updateParentNode) {
        [node setParentNode:self updateChildren:NO];
    }
}

- (void)removeChild:(HTMLNode *)node updateParentNode:(BOOL)updateParentNode
{
    [_children removeObject:node];
    if (updateParentNode) {
        [node setParentNode:nil updateChildren:NO];
    }
}

- (void)insertString:(NSString *)string atChildNodeIndex:(NSUInteger)index
{
    id candidate = index > 0 ? _children[index - 1] : nil;
    HTMLTextNode *textNode;
    if ([candidate isKindOfClass:[HTMLTextNode class]]) {
        textNode = candidate;
    } else {
        textNode = [HTMLTextNode new];
        [[self mutableChildren] insertObject:textNode atIndex:index];
    }
    [textNode appendString:string];
}

- (NSArray *)childElementNodes
{
	NSMutableArray *childElements = [NSMutableArray arrayWithCapacity:self.numberOfChildren];
	for (id node in _children) {
		if ([node isKindOfClass:[HTMLElement class]]) {
			[childElements addObject:node];
		}
	}
	return childElements;
}

- (NSEnumerator *)treeEnumerator
{
    return [[HTMLTreeEnumerator alloc] initWithNode:self reversed:NO];
}

- (NSEnumerator *)reversedTreeEnumerator
{
	return [[HTMLTreeEnumerator alloc] initWithNode:self reversed:YES];
}

- (NSString *)textContent
{
    NSMutableArray *parts = [NSMutableArray new];
    for (HTMLTextNode *node in self.treeEnumerator) {
        if ([node isKindOfClass:[HTMLTextNode class]]) {
            [parts addObject:node.data];
        }
    }
    return [parts componentsJoinedByString:@""];
}

- (void)setTextContent:(NSString *)textContent
{
    [[self mutableChildren] removeAllObjects];
    if (textContent.length > 0) {
        HTMLTextNode *textNode = [[HTMLTextNode alloc] initWithData:textContent];
        [[self mutableChildren] addObject:textNode];
    }
}

#pragma mark NSCopying

- (id)copyWithZone:(NSZone *)zone
{
    return [[self.class allocWithZone:zone] init];
}

@end

/**
 * The proxy returned by -mutableOrderedSetValueForKey: is quite useless, crashing in -removeObject: and -indexOfObject:. Here's an alternate.
 */
@implementation HTMLChildrenRelationshipProxy : NSMutableOrderedSet

- (instancetype)initWithNode:(HTMLNode *)node children:(NSMutableOrderedSet *)children
{
    if ((self = [super init])) {
        _node = node;
        _children = children;
    }
    return self;
}

- (NSUInteger)count
{
    return _children.count;
}

- (id)objectAtIndex:(NSUInteger)index
{
    return [_children objectAtIndex:index];
}

- (NSUInteger)indexOfObject:(id)object
{
    return [_children indexOfObject:object];
}

- (void)insertObject:(id)object atIndex:(NSUInteger)index
{
    [_node insertObject:object inChildrenAtIndex:index];
}

- (void)insertObjects:(NSArray *)objects atIndexes:(NSIndexSet *)indexes
{
    [_node insertChildren:objects atIndexes:indexes];
}

- (void)replaceObjectAtIndex:(NSUInteger)index withObject:(id)object
{
    [_node replaceObjectInChildrenAtIndex:index withObject:object];
}

- (void)removeObjectAtIndex:(NSUInteger)index
{
    [_node removeObjectFromChildrenAtIndex:index];
}

- (void)removeObjectsAtIndexes:(NSIndexSet *)indexes
{
    [_node removeChildrenAtIndexes:indexes];
}

@end
