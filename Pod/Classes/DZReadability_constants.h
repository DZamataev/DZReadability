
enum {
    GGReadabilityParserOptionNone = -1,
    GGReadabilityParserOptionRemoveHeader = 1 << 2,
    GGReadabilityParserOptionRemoveHeaders = 1 << 3,
    GGReadabilityParserOptionRemoveEmbeds = 1 << 4,
    GGReadabilityParserOptionRemoveIFrames = 1 << 5,
    GGReadabilityParserOptionRemoveDivs = 1 << 6,
    GGReadabilityParserOptionRemoveImages = 1 << 7,
    GGReadabilityParserOptionFixImages = 1 << 8,
    GGReadabilityParserOptionFixLinks = 1 << 9,
    GGReadabilityParserOptionClearStyles = 1 << 10,
    GGReadabilityParserOptionClearLinkLists = 1 << 11,
    GGReadabilityParserOptionDownloadImages = 1 << 12,
    GGReadabilityParserOptionRemoveImageWidthAndHeightAttributes = 1 << 13,
    GGReadabilityParserOptionClearClassesAndIds = 1 << 14,
    GGReadabilityParserOptionRemoveAudio = 1 << 15,
    GGReadabilityParserOptionRemoveVideo = 1 << 16,
    GGReadabilityParserOptionClearHRefs = 1 << 17
};
typedef NSInteger GGReadabilityParserOptions;
