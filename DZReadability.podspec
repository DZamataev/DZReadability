#
# Be sure to run `pod lib lint DZReadability.podspec' to ensure this is a
# valid spec and remove all comments before submitting the spec.
#
# Any lines starting with a # are optional, but encouraged
#
# To learn more about a Podspec see http://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = "DZReadability"
  s.version          = "0.1.0"
  s.summary          = "iOS and OSX adoption of Readability algorithm which clears HTML"
  s.description      = <<-DESC
                       Adoption of Readability algorithm which works on iOS and OSX and is capable of clearing the messy HTML document (e.g. site) into nice and readable page.
                       Rework of GGReadabilityParser found here: https://github.com/curthard89/COCOA-Stuff/tree/master/GGReadabilityParser
                       Also uses forked version of GDataXML-HTML (original source here: https://github.com/graetzer/GDataXML-HTML)
                       DESC
  s.homepage         = "https://github.com/DZamataev/DZReadability"
  # s.screenshots     = "www.example.com/screenshots_1", "www.example.com/screenshots_2"
  s.license          = 'MIT'
  s.author           = { "Denis Zamataev" => "denis.zamataev@gmail.com" }
  s.source           = { :git => "https://github.com/DZamataev/DZReadability.git", :tag => s.version.to_s }
  s.social_media_url = 'https://twitter.com/dzamataev'

  s.platform     = :ios, '7.0'
  
  s.default_subspec = 'Core'
  
  s.subspec 'Core' do |c|
    c.source_files = 'Pod/Classes'
    c.resource_bundles = {
      'DZReadability' => ['Pod/Assets/*.png']
    }
    c.requires_arc = true
	c.dependency 'DZReadability/GDataXML-HTML'
  end

  s.subspec 'GDataXML-HTML' do |sp|
    sp.source_files = 'Pod/GDataXML-HTML'
	sp.requires_arc = true
    sp.libraries = 'xml2'
    sp.xcconfig = {
      'HEADER_SEARCH_PATHS' => '$(SDKROOT)/usr/include/libxml2'
    }
  end
end
