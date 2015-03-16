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
  s.version          = "0.2.1"
  s.summary          = "iOS and OSX adoption of Readability algorithm which clears HTML"
  s.description      = <<-DESC
                       Adoption of Readability algorithm which works on iOS and OSX and is capable of clearing the messy HTML document (e.g. site) into nice and readable page.
                       Rework of GGReadabilityParser found here: https://github.com/curthard89/COCOA-Stuff/tree/master/GGReadabilityParser
                       DESC
  s.homepage         = "https://github.com/DZamataev/DZReadability"
  # s.screenshots     = "www.example.com/screenshots_1", "www.example.com/screenshots_2"
  s.license          = 'MIT'
  s.author           = { "Denis Zamataev" => "denis.zamataev@gmail.com" }
  s.source           = { :git => "https://github.com/DZamataev/DZReadability.git", :tag => s.version.to_s }
  s.social_media_url = 'https://twitter.com/dzamataev'

  s.ios.deployment_target = '5.0'
  s.osx.deployment_target = '10.7'
  
  s.requires_arc = true
  s.source_files = 'Pod/Classes'
  s.dependency 'HTMLReader', :git => 'https://github.com/hsienchiaolee/HTMLReader.git', :commit => '51f81a6'
end
