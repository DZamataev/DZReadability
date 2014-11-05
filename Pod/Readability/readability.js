/*
 RequireJS 2.1.15 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs,require,define;
(function(ba){function G(b){return"[object Function]"===K.call(b)}function H(b){return"[object Array]"===K.call(b)}function v(b,c){if(b){var d;for(d=0;d<b.length&&(!b[d]||!c(b[d],d,b));d+=1);}}function T(b,c){if(b){var d;for(d=b.length-1;-1<d&&(!b[d]||!c(b[d],d,b));d-=1);}}function t(b,c){return fa.call(b,c)}function m(b,c){return t(b,c)&&b[c]}function B(b,c){for(var d in b)if(t(b,d)&&c(b[d],d))break}function U(b,c,d,e){c&&B(c,function(c,g){if(d||!t(b,g))e&&"object"===typeof c&&c&&!H(c)&&!G(c)&&!(c instanceof
RegExp)?(b[g]||(b[g]={}),U(b[g],c,d,e)):b[g]=c});return b}function u(b,c){return function(){return c.apply(b,arguments)}}function ca(b){throw b;}function da(b){if(!b)return b;var c=ba;v(b.split("."),function(b){c=c[b]});return c}function C(b,c,d,e){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=e;d&&(c.originalError=d);return c}function ga(b){function c(a,k,b){var f,l,c,d,e,g,i,p,k=k&&k.split("/"),h=j.map,n=h&&h["*"];if(a){a=a.split("/");l=a.length-1;j.nodeIdCompat&&
Q.test(a[l])&&(a[l]=a[l].replace(Q,""));"."===a[0].charAt(0)&&k&&(l=k.slice(0,k.length-1),a=l.concat(a));l=a;for(c=0;c<l.length;c++)if(d=l[c],"."===d)l.splice(c,1),c-=1;else if(".."===d&&!(0===c||1==c&&".."===l[2]||".."===l[c-1])&&0<c)l.splice(c-1,2),c-=2;a=a.join("/")}if(b&&h&&(k||n)){l=a.split("/");c=l.length;a:for(;0<c;c-=1){e=l.slice(0,c).join("/");if(k)for(d=k.length;0<d;d-=1)if(b=m(h,k.slice(0,d).join("/")))if(b=m(b,e)){f=b;g=c;break a}!i&&(n&&m(n,e))&&(i=m(n,e),p=c)}!f&&i&&(f=i,g=p);f&&(l.splice(0,
g,f),a=l.join("/"))}return(f=m(j.pkgs,a))?f:a}function d(a){z&&v(document.getElementsByTagName("script"),function(k){if(k.getAttribute("data-requiremodule")===a&&k.getAttribute("data-requirecontext")===i.contextName)return k.parentNode.removeChild(k),!0})}function e(a){var k=m(j.paths,a);if(k&&H(k)&&1<k.length)return k.shift(),i.require.undef(a),i.makeRequire(null,{skipMap:!0})([a]),!0}function n(a){var k,c=a?a.indexOf("!"):-1;-1<c&&(k=a.substring(0,c),a=a.substring(c+1,a.length));return[k,a]}function p(a,
k,b,f){var l,d,e=null,g=k?k.name:null,j=a,p=!0,h="";a||(p=!1,a="_@r"+(K+=1));a=n(a);e=a[0];a=a[1];e&&(e=c(e,g,f),d=m(r,e));a&&(e?h=d&&d.normalize?d.normalize(a,function(a){return c(a,g,f)}):-1===a.indexOf("!")?c(a,g,f):a:(h=c(a,g,f),a=n(h),e=a[0],h=a[1],b=!0,l=i.nameToUrl(h)));b=e&&!d&&!b?"_unnormalized"+(O+=1):"";return{prefix:e,name:h,parentMap:k,unnormalized:!!b,url:l,originalName:j,isDefine:p,id:(e?e+"!"+h:h)+b}}function s(a){var k=a.id,b=m(h,k);b||(b=h[k]=new i.Module(a));return b}function q(a,
k,b){var f=a.id,c=m(h,f);if(t(r,f)&&(!c||c.defineEmitComplete))"defined"===k&&b(r[f]);else if(c=s(a),c.error&&"error"===k)b(c.error);else c.on(k,b)}function w(a,b){var c=a.requireModules,f=!1;if(b)b(a);else if(v(c,function(b){if(b=m(h,b))b.error=a,b.events.error&&(f=!0,b.emit("error",a))}),!f)g.onError(a)}function x(){R.length&&(ha.apply(A,[A.length,0].concat(R)),R=[])}function y(a){delete h[a];delete V[a]}function F(a,b,c){var f=a.map.id;a.error?a.emit("error",a.error):(b[f]=!0,v(a.depMaps,function(f,
d){var e=f.id,g=m(h,e);g&&(!a.depMatched[d]&&!c[e])&&(m(b,e)?(a.defineDep(d,r[e]),a.check()):F(g,b,c))}),c[f]=!0)}function D(){var a,b,c=(a=1E3*j.waitSeconds)&&i.startTime+a<(new Date).getTime(),f=[],l=[],g=!1,h=!0;if(!W){W=!0;B(V,function(a){var i=a.map,j=i.id;if(a.enabled&&(i.isDefine||l.push(a),!a.error))if(!a.inited&&c)e(j)?g=b=!0:(f.push(j),d(j));else if(!a.inited&&(a.fetched&&i.isDefine)&&(g=!0,!i.prefix))return h=!1});if(c&&f.length)return a=C("timeout","Load timeout for modules: "+f,null,
f),a.contextName=i.contextName,w(a);h&&v(l,function(a){F(a,{},{})});if((!c||b)&&g)if((z||ea)&&!X)X=setTimeout(function(){X=0;D()},50);W=!1}}function E(a){t(r,a[0])||s(p(a[0],null,!0)).init(a[1],a[2])}function I(a){var a=a.currentTarget||a.srcElement,b=i.onScriptLoad;a.detachEvent&&!Y?a.detachEvent("onreadystatechange",b):a.removeEventListener("load",b,!1);b=i.onScriptError;(!a.detachEvent||Y)&&a.removeEventListener("error",b,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}function J(){var a;
for(x();A.length;){a=A.shift();if(null===a[0])return w(C("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));E(a)}}var W,Z,i,L,X,j={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},h={},V={},$={},A=[],r={},S={},aa={},K=1,O=1;L={require:function(a){return a.require?a.require:a.require=i.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?r[a.map.id]=a.exports:a.exports=r[a.map.id]={}},module:function(a){return a.module?
a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return m(j.config,a.map.id)||{}},exports:a.exports||(a.exports={})}}};Z=function(a){this.events=m($,a.id)||{};this.map=a;this.shim=m(j.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};Z.prototype={init:function(a,b,c,f){f=f||{};if(!this.inited){this.factory=b;if(c)this.on("error",c);else this.events.error&&(c=u(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.errback=
c;this.inited=!0;this.ignore=f.ignore;f.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0;i.startTime=(new Date).getTime();var a=this.map;if(this.shim)i.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],u(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?this.callPlugin():this.load()}},load:function(){var a=
this.map.url;S[a]||(S[a]=!0,i.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;var f=this.exports,l=this.factory;if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(G(l)){if(this.events.error&&this.map.isDefine||g.onError!==ca)try{f=i.execCb(c,l,b,f)}catch(d){a=d}else f=i.execCb(c,l,b,f);this.map.isDefine&&void 0===f&&((b=this.module)?f=b.exports:this.usingExports&&
(f=this.exports));if(a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",w(this.error=a)}else f=l;this.exports=f;if(this.map.isDefine&&!this.ignore&&(r[c]=f,g.onResourceLoad))g.onResourceLoad(i,this.map,this.depMaps);y(c);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var a=
this.map,b=a.id,d=p(a.prefix);this.depMaps.push(d);q(d,"defined",u(this,function(f){var l,d;d=m(aa,this.map.id);var e=this.map.name,P=this.map.parentMap?this.map.parentMap.name:null,n=i.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(f.normalize&&(e=f.normalize(e,function(a){return c(a,P,!0)})||""),f=p(a.prefix+"!"+e,this.map.parentMap),q(f,"defined",u(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),d=m(h,f.id)){this.depMaps.push(f);
if(this.events.error)d.on("error",u(this,function(a){this.emit("error",a)}));d.enable()}}else d?(this.map.url=i.nameToUrl(d),this.load()):(l=u(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),l.error=u(this,function(a){this.inited=!0;this.error=a;a.requireModules=[b];B(h,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&y(a.map.id)});w(a)}),l.fromText=u(this,function(f,c){var d=a.name,e=p(d),P=M;c&&(f=c);P&&(M=!1);s(e);t(j.config,b)&&(j.config[d]=j.config[b]);try{g.exec(f)}catch(h){return w(C("fromtexteval",
"fromText eval for "+b+" failed: "+h,h,[b]))}P&&(M=!0);this.depMaps.push(e);i.completeLoad(d);n([d],l)}),f.load(a.name,n,l,j))}));i.enable(d,this);this.pluginMaps[d.id]=d},enable:function(){V[this.map.id]=this;this.enabling=this.enabled=!0;v(this.depMaps,u(this,function(a,b){var c,f;if("string"===typeof a){a=p(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=m(L,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;q(a,"defined",u(this,function(a){this.defineDep(b,
a);this.check()}));this.errback&&q(a,"error",u(this,this.errback))}c=a.id;f=h[c];!t(L,c)&&(f&&!f.enabled)&&i.enable(a,this)}));B(this.pluginMaps,u(this,function(a){var b=m(h,a.id);b&&!b.enabled&&i.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]);c.push(b)},emit:function(a,b){v(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};i={config:j,contextName:b,registry:h,defined:r,urlFetched:S,defQueue:A,Module:Z,makeModuleMap:p,
nextTick:g.nextTick,onError:w,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=j.shim,c={paths:!0,bundles:!0,config:!0,map:!0};B(a,function(a,b){c[b]?(j[b]||(j[b]={}),U(j[b],a,!0,!0)):j[b]=a});a.bundles&&B(a.bundles,function(a,b){v(a,function(a){a!==b&&(aa[a]=b)})});a.shim&&(B(a.shim,function(a,c){H(a)&&(a={deps:a});if((a.exports||a.init)&&!a.exportsFn)a.exportsFn=i.makeShimExports(a);b[c]=a}),j.shim=b);a.packages&&v(a.packages,function(a){var b,
a="string"===typeof a?{name:a}:a;b=a.name;a.location&&(j.paths[b]=a.location);j.pkgs[b]=a.name+"/"+(a.main||"main").replace(ia,"").replace(Q,"")});B(h,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=p(b))});if(a.deps||a.callback)i.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;a.init&&(b=a.init.apply(ba,arguments));return b||a.exports&&da(a.exports)}},makeRequire:function(a,e){function j(c,d,m){var n,q;e.enableBuildCallback&&(d&&G(d))&&(d.__requireJsBuild=
!0);if("string"===typeof c){if(G(d))return w(C("requireargs","Invalid require call"),m);if(a&&t(L,c))return L[c](h[a.id]);if(g.get)return g.get(i,c,a,j);n=p(c,a,!1,!0);n=n.id;return!t(r,n)?w(C("notloaded",'Module name "'+n+'" has not been loaded yet for context: '+b+(a?"":". Use require([])"))):r[n]}J();i.nextTick(function(){J();q=s(p(null,a));q.skipMap=e.skipMap;q.init(c,d,m,{enabled:!0});D()});return j}e=e||{};U(j,{isBrowser:z,toUrl:function(b){var d,e=b.lastIndexOf("."),k=b.split("/")[0];if(-1!==
e&&(!("."===k||".."===k)||1<e))d=b.substring(e,b.length),b=b.substring(0,e);return i.nameToUrl(c(b,a&&a.id,!0),d,!0)},defined:function(b){return t(r,p(b,a,!1,!0).id)},specified:function(b){b=p(b,a,!1,!0).id;return t(r,b)||t(h,b)}});a||(j.undef=function(b){x();var c=p(b,a,!0),e=m(h,b);d(b);delete r[b];delete S[c.url];delete $[b];T(A,function(a,c){a[0]===b&&A.splice(c,1)});e&&(e.events.defined&&($[b]=e.events),y(b))});return j},enable:function(a){m(h,a.id)&&s(a).enable()},completeLoad:function(a){var b,
c,d=m(j.shim,a)||{},g=d.exports;for(x();A.length;){c=A.shift();if(null===c[0]){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);E(c)}c=m(h,a);if(!b&&!t(r,a)&&c&&!c.inited){if(j.enforceDefine&&(!g||!da(g)))return e(a)?void 0:w(C("nodefine","No define call for "+a,null,[a]));E([a,d.deps||[],d.exportsFn])}D()},nameToUrl:function(a,b,c){var d,e,h;(d=m(j.pkgs,a))&&(a=d);if(d=m(aa,a))return i.nameToUrl(d,b,c);if(g.jsExtRegExp.test(a))d=a+(b||"");else{d=j.paths;a=a.split("/");for(e=a.length;0<e;e-=1)if(h=a.slice(0,
e).join("/"),h=m(d,h)){H(h)&&(h=h[0]);a.splice(0,e,h);break}d=a.join("/");d+=b||(/^data\:|\?/.test(d)||c?"":".js");d=("/"===d.charAt(0)||d.match(/^[\w\+\.\-]+:/)?"":j.baseUrl)+d}return j.urlArgs?d+((-1===d.indexOf("?")?"?":"&")+j.urlArgs):d},load:function(a,b){g.load(i,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||ja.test((a.currentTarget||a.srcElement).readyState))N=null,a=I(a),i.completeLoad(a.id)},onScriptError:function(a){var b=I(a);if(!e(b.id))return w(C("scripterror",
"Script error for: "+b.id,a,[b.id]))}};i.require=i.makeRequire();return i}var g,x,y,D,I,E,N,J,s,O,ka=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,la=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,Q=/\.js$/,ia=/^\.\//;x=Object.prototype;var K=x.toString,fa=x.hasOwnProperty,ha=Array.prototype.splice,z=!!("undefined"!==typeof window&&"undefined"!==typeof navigator&&window.document),ea=!z&&"undefined"!==typeof importScripts,ja=z&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,
Y="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),F={},q={},R=[],M=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(G(requirejs))return;q=requirejs;requirejs=void 0}"undefined"!==typeof require&&!G(require)&&(q=require,require=void 0);g=requirejs=function(b,c,d,e){var n,p="_";!H(b)&&"string"!==typeof b&&(n=b,H(c)?(b=c,c=d,d=e):b=[]);n&&n.context&&(p=n.context);(e=m(F,p))||(e=F[p]=g.s.newContext(p));n&&e.configure(n);return e.require(b,c,d)};g.config=function(b){return g(b)};
g.nextTick="undefined"!==typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=g);g.version="2.1.15";g.jsExtRegExp=/^\/|:|\?|\.js$/;g.isBrowser=z;x=g.s={contexts:F,newContext:ga};g({});v(["toUrl","undef","defined","specified"],function(b){g[b]=function(){var c=F._;return c.require[b].apply(c,arguments)}});if(z&&(y=x.head=document.getElementsByTagName("head")[0],D=document.getElementsByTagName("base")[0]))y=x.head=D.parentNode;g.onError=ca;g.createNode=function(b){var c=
b.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");c.type=b.scriptType||"text/javascript";c.charset="utf-8";c.async=!0;return c};g.load=function(b,c,d){var e=b&&b.config||{};if(z)return e=g.createNode(e,c,d),e.setAttribute("data-requirecontext",b.contextName),e.setAttribute("data-requiremodule",c),e.attachEvent&&!(e.attachEvent.toString&&0>e.attachEvent.toString().indexOf("[native code"))&&!Y?(M=!0,e.attachEvent("onreadystatechange",b.onScriptLoad)):
(e.addEventListener("load",b.onScriptLoad,!1),e.addEventListener("error",b.onScriptError,!1)),e.src=d,J=e,D?y.insertBefore(e,D):y.appendChild(e),J=null,e;if(ea)try{importScripts(d),b.completeLoad(c)}catch(m){b.onError(C("importscripts","importScripts failed for "+c+" at "+d,m,[c]))}};z&&!q.skipDataMain&&T(document.getElementsByTagName("script"),function(b){y||(y=b.parentNode);if(I=b.getAttribute("data-main"))return s=I,q.baseUrl||(E=s.split("/"),s=E.pop(),O=E.length?E.join("/")+"/":"./",q.baseUrl=
O),s=s.replace(Q,""),g.jsExtRegExp.test(s)&&(s=I),q.deps=q.deps?q.deps.concat(s):[s],!0});define=function(b,c,d){var e,g;"string"!==typeof b&&(d=c,c=b,b=null);H(c)||(d=c,c=null);!c&&G(d)&&(c=[],d.length&&(d.toString().replace(ka,"").replace(la,function(b,d){c.push(d)}),c=(1===d.length?["require"]:["require","exports","module"]).concat(c)));if(M){if(!(e=J))N&&"interactive"===N.readyState||T(document.getElementsByTagName("script"),function(b){if("interactive"===b.readyState)return N=b}),e=N;e&&(b||
(b=e.getAttribute("data-requiremodule")),g=F[e.getAttribute("data-requirecontext")])}(g?g.defQueue:R).push([b,c,d])};define.amd={jQuery:!0};g.exec=function(b){return eval(b)};g(q)}})(this);


/*jslint undef: true, nomen: true, eqeqeq: true, plusplus: true, newcap: true, immed: true, browser: true, devel: true, passfail: false */
/*global window: false, readConvertLinksToFootnotes: false, readStyle: false, readSize: false, readMargin: false, Typekit: false, ActiveXObject: false */

alert('go');

var dbg = (typeof console !== 'undefined') ? function(s) {
    console.log("Readability: " + s);
} : function() {};

function NSLog(text) {
    var iframe = document.createElement('iframe');
    var url = "debugger://" + text;
    iframe.setAttribute('src', url);
    iframe.setAttribute('height', '1px');
    iframe.setAttribute('width', '1px');
    document.documentElement.appendChild(iframe);
    iframe.parentNode.removeChild(iframe);
    iframe = null;
};

/*
 * Readability. An Arc90 Lab Experiment. 
 * Website: http://lab.arc90.com/experiments/readability
 * Source:  http://code.google.com/p/arc90labs-readability
 *
 * "Readability" is a trademark of Arc90 Inc and may not be used without explicit permission. 
 *
 * Copyright (c) 2010 Arc90 Inc
 * Readability is licensed under the Apache License, Version 2.0.
**/
var readability = {
    version:                '1.7.1',
    iframeLoads:             0,
    convertLinksToFootnotes: false,
    reversePageScroll:       false, /* If they hold shift and hit space, scroll up */
    frameHack:               false, /**
                                      * The frame hack is to workaround a firefox bug where if you
                                      * pull content out of a frame and stick it into the parent element, the scrollbar won't appear.
                                      * So we fake a scrollbar in the wrapping div.
                                     **/
    biggestFrame:            false,
    bodyCache:               null,   /* Cache the body HTML in case we need to re-use it later */
    flags:                   0x1 | 0x2 | 0x4,   /* Start with all flags set. */

    /* constants */
    FLAG_STRIP_UNLIKELYS:     0x1,
    FLAG_WEIGHT_CLASSES:      0x2,
    FLAG_CLEAN_CONDITIONALLY: 0x4,

    maxPages:    30, /* The maximum number of pages to loop through before we call it quits and just show a link. */
    parsedPages: {}, /* The list of pages we've parsed in this call of readability, for autopaging. As a key store for easier searching. */
    pageETags:   {}, /* A list of the ETag headers of pages we've parsed, in case they happen to match, we'll know it's a duplicate. */
    
    /**
     * All of the regular expressions in use within readability.
     * Defined up here so we don't instantiate them repeatedly in loops.
     **/
    regexps: {
        unlikelyCandidates:    /combx|comment|community|disqus|extra|foot|header|menu|remark|rss|shoutbox|sidebar|sponsor|ad-break|agegate|pagination|pager|popup|tweet|twitter/i,
        okMaybeItsACandidate:  /and|article|body|column|main|shadow/i,
        positive:              /article|body|content|entry|hentry|main|page|pagination|post|text|blog|story/i,
        negative:              /combx|comment|com-|contact|foot|footer|footnote|masthead|media|meta|outbrain|promo|related|scroll|shoutbox|sidebar|sponsor|shopping|tags|tool|widget/i,
        extraneous:            /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single/i,
        divToPElements:        /<(a|blockquote|dl|div|img|ol|p|pre|table|ul)/i,
        replaceBrs:            /(<br[^>]*>[ \n\r\t]*){2,}/gi,
        replaceFonts:          /<(\/?)font[^>]*>/gi,
        trim:                  /^\s+|\s+$/g,
        normalize:             /\s{2,}/g,
        killBreaks:            /(<br\s*\/?>(\s|&nbsp;?)*){1,}/g,
        videos:                /http:\/\/(www\.)?(youtube|vimeo)\.com/i,
        skipFootnoteLink:      /^\s*(\[?[a-z0-9]{1,2}\]?|^|edit|citation needed)\s*$/i,
        nextLink:              /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i, // Match: next, continue, >, >>, » but not >|, »| as those usually mean last.
        prevLink:              /(prev|earl|old|new|<|«)/i
    },
    
    /**
     * Runs readability.
     * 
     * Workflow:
     *  1. Prep the document by removing script tags, css, etc.
     *  2. Build readability's DOM tree.
     *  3. Grab the article content from the current dom tree.
     *  4. Replace the current DOM tree with the new one.
     *  5. Read peacefully.
     *
     * @return void
     **/
    init: function() {
        NSLog('execution');
        /* Before we do anything, remove all scripts that are not readability. */
        window.onload = window.onunload = function() {};

        readability.removeScripts(document);

        if(document.body && !readability.bodyCache) {
            readability.bodyCache = document.body.innerHTML;

        }
        /* Make sure this document is added to the list of parsed pages first, so we don't double up on the first page */
        readability.parsedPages[window.location.href.replace(/\/$/, '')] = true;

        /* Pull out any possible next page link first */
        var nextPageLink = readability.findNextPageLink(document.body);
        
        readability.prepDocument();

        /* Build readability's DOM tree */
        var overlay        = document.createElement("DIV");
        var innerDiv       = document.createElement("DIV");
        var articleTools   = readability.getArticleTools();
        var articleTitle   = readability.getArticleTitle();
        var articleContent = readability.grabArticle();
        var articleFooter  = readability.getArticleFooter();

        if(!articleContent) {
            articleContent    = document.createElement("DIV");
            articleContent.id = "readability-content";
            articleContent.innerHTML = [
                "<p>Sorry, readability was unable to parse this page for content. If you feel like it should have been able to, please <a href='http://code.google.com/p/arc90labs-readability/issues/entry'>let us know by submitting an issue.</a></p>",
                (readability.frameHack ? "<p><strong>It appears this page uses frames.</strong> Unfortunately, browser security properties often cause Readability to fail on pages that include frames. You may want to try running readability itself on this source page: <a href='" + readability.biggestFrame.src + "'>" + readability.biggestFrame.src + "</a></p>" : ""),
                "<p>Also, please note that Readability does not play very nicely with front pages. Readability is intended to work on articles with a sizable chunk of text that you'd like to read comfortably. If you're using Readability on a landing page (like nytimes.com for example), please click into an article first before using Readability.</p>"
            ].join('');

            nextPageLink = null;
        }

        overlay.id              = "readOverlay";
        innerDiv.id             = "readInner";

        /* Apply user-selected styling */
        document.body.className = readStyle;
        document.dir            = readability.getSuggestedDirection(articleTitle.innerHTML);

        if (readStyle === "style-athelas" || readStyle === "style-apertura"){
            overlay.className = readStyle + " rdbTypekit";
        }
        else {
            overlay.className = readStyle;
        }
        innerDiv.className    = readMargin + " " + readSize;

        if(typeof(readConvertLinksToFootnotes) !== 'undefined' && readConvertLinksToFootnotes === true) {
            readability.convertLinksToFootnotes = true;
        }

        /* Glue the structure of our document together. */
        innerDiv.appendChild( articleTitle   );
        innerDiv.appendChild( articleContent );
        innerDiv.appendChild( articleFooter  );
         overlay.appendChild( articleTools   );
         overlay.appendChild( innerDiv       );

        /* Clear the old HTML, insert the new content. */
        document.body.innerHTML = "";
        document.body.insertBefore(overlay, document.body.firstChild);
        document.body.removeAttribute('style');

        if(readability.frameHack)
        {
            var readOverlay = document.getElementById('readOverlay');
            readOverlay.style.height = '100%';
            readOverlay.style.overflow = 'auto';
        }

        /**
         * If someone tries to use Readability on a site's root page, give them a warning about usage.
        **/
        if((window.location.protocol + "//" + window.location.host + "/") === window.location.href)
        {
            articleContent.style.display = "none";
            var rootWarning = document.createElement('p');
                rootWarning.id = "readability-warning";
                rootWarning.innerHTML = "<em>Readability</em> was intended for use on individual articles and not home pages. " +
                    "If you'd like to try rendering this page anyway, <a onClick='javascript:document.getElementById(\"readability-warning\").style.display=\"none\";document.getElementById(\"readability-content\").style.display=\"block\";'>click here</a> to continue.";

            innerDiv.insertBefore( rootWarning, articleContent );
        }

        readability.postProcessContent(articleContent);

        window.scrollTo(0, 0);

        /* If we're using the Typekit library, select the font */
        if (readStyle === "style-athelas" || readStyle === "style-apertura") {
            readability.useRdbTypekit();
        }

        if (nextPageLink) {
            /** 
             * Append any additional pages after a small timeout so that people
             * can start reading without having to wait for this to finish processing.
            **/
            window.setTimeout(function() {
                readability.appendNextPage(nextPageLink);
            }, 500);
        }

        /** Smooth scrolling **/
        document.onkeydown = function(e) {
            var code = (window.event) ? event.keyCode : e.keyCode;
            if (code === 16) {
                readability.reversePageScroll = true;
                return;
            }

            if (code === 32) {
                readability.curScrollStep = 0;
                var windowHeight = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight);

                if(readability.reversePageScroll) {
                    readability.scrollTo(readability.scrollTop(), readability.scrollTop() - (windowHeight - 50), 20, 10);                   
                }
                else {
                    readability.scrollTo(readability.scrollTop(), readability.scrollTop() + (windowHeight - 50), 20, 10);                   
                }
                
                return false;
            }
        };
        
        document.onkeyup = function(e) {
            var code = (window.event) ? event.keyCode : e.keyCode;
            if (code === 16) {
                readability.reversePageScroll = false;
                return;
            }
        };
    },

    /**
     * Run any post-process modifications to article content as necessary.
     * 
     * @param Element
     * @return void
    **/
    postProcessContent: function(articleContent) {
        if(readability.convertLinksToFootnotes && !window.location.href.match(/wikipedia\.org/g)) {
            readability.addFootnotes(articleContent);
        }

        readability.fixImageFloats(articleContent);
    },

    /**
     * Some content ends up looking ugly if the image is too large to be floated.
     * If the image is wider than a threshold (currently 55%), no longer float it,
     * center it instead.
     *
     * @param Element
     * @return void
    **/
    fixImageFloats: function (articleContent) {
        var imageWidthThreshold = Math.min(articleContent.offsetWidth, 800) * 0.55,
            images              = articleContent.getElementsByTagName('img');

        for(var i=0, il = images.length; i < il; i+=1) {
            var image = images[i];
            
            if(image.offsetWidth > imageWidthThreshold) {
                image.className += " blockImage";
            }
        }
    },

    /**
     * Get the article tools Element that has buttons like reload, print.
     *
     * @return void
     **/
    getArticleTools: function () {
        var articleTools = document.createElement("DIV");

        articleTools.id        = "readTools";
        /** This block causes the script to be invalid on iOS UIWebView TODO: fix
        articleTools.innerHTML = 
            "<a href='#' onclick='return window.location.reload()' title='Reload original page' id='reload-page'>Reload Original Page</a>" +
            "<a href='#' onclick='javascript:window.print();' title='Print page' id='print-page'>Print Page</a>" +
         
         **/
        return articleTools;
    },

    /**
     * retuns the suggested direction of the string
     *
     * @return "rtl" || "ltr"
     **/
    getSuggestedDirection: function(text) {
        function sanitizeText() {
            return text.replace(/@\w+/, "");
        }
        
        function countMatches(match) {
            var matches = text.match(new RegExp(match, "g"));
            return matches !== null ? matches.length : 0; 
        }
        
        function isRTL() {            
            var count_heb =  countMatches("[\\u05B0-\\u05F4\\uFB1D-\\uFBF4]");
            var count_arb =  countMatches("[\\u060C-\\u06FE\\uFB50-\\uFEFC]");

            // if 20% of chars are Hebrew or Arbic then direction is rtl
            return  (count_heb + count_arb) * 100 / text.length > 20;
        }

        text  = sanitizeText(text);
        return isRTL() ? "rtl" : "ltr";
    },

    
    /**
     * Get the article title as an H1.
     *
     * @return void
     **/
    getArticleTitle: function () {
        var curTitle = "",
            origTitle = "";

        try {
            curTitle = origTitle = document.title;
            
            if(typeof curTitle !== "string") { /* If they had an element with id "title" in their HTML */
                curTitle = origTitle = readability.getInnerText(document.getElementsByTagName('title')[0]);             
            }
        }
        catch(e) {}
        
        if(curTitle.match(/ [\|\-] /))
        {
            curTitle = origTitle.replace(/(.*)[\|\-] .*/gi,'$1');
            
            if(curTitle.split(' ').length < 3) {
                curTitle = origTitle.replace(/[^\|\-]*[\|\-](.*)/gi,'$1');
            }
        }
        else if(curTitle.indexOf(': ') !== -1)
        {
            curTitle = origTitle.replace(/.*:(.*)/gi, '$1');

            if(curTitle.split(' ').length < 3) {
                curTitle = origTitle.replace(/[^:]*[:](.*)/gi,'$1');
            }
        }
        else if(curTitle.length > 150 || curTitle.length < 15)
        {
            var hOnes = document.getElementsByTagName('h1');
            if(hOnes.length === 1)
            {
                curTitle = readability.getInnerText(hOnes[0]);
            }
        }

        curTitle = curTitle.replace( readability.regexps.trim, "" );

        if(curTitle.split(' ').length <= 4) {
            curTitle = origTitle;
        }
        
        var articleTitle = document.createElement("H1");
        articleTitle.innerHTML = curTitle;
        
        return articleTitle;
    },

    /**
     * Get the footer with the readability mark etc.
     *
     * @return void
     **/
    getArticleFooter: function () {
        var articleFooter = document.createElement("DIV");
        articleFooter.id = "readFooter";
        articleFooter.innerHTML = [
        "<div id='rdb-footer-print'>Excerpted from <cite>" + document.title + "</cite><br />" + window.location.href + "</div>",
        "<div id='rdb-footer-wrapper'>",
             "<div id='rdb-footer-left'>",
                 "<a href='http://kerrick.github.com/readability-js/' id='readability-logo'>Readability JS</a> &mdash;",
                 " <a href='https://github.com/Kerrick/readability-js'>An open source project</a>",
                 " <span id='readability-attribution'>based on <a href='http://lab.arc90.com/experiments/readability'>An Arc90 Laboratory Experiment</a></span>",
             "</div>",
             "<div id='rdb-footer-right'>",
                 "<span class='version'>Readability version " + readability.version + "</span>",
             "</div>",
        "</div>"].join('');

        return articleFooter;
    },
    
    /**
     * Prepare the HTML document for readability to scrape it.
     * This includes things like stripping javascript, CSS, and handling terrible markup.
     * 
     * @return void
     **/
    prepDocument: function () {
        /**
         * In some cases a body element can't be found (if the HTML is totally hosed for example)
         * so we create a new body node and append it to the document.
         */
        if(document.body === null)
        {
            var body = document.createElement("body");
            try {
                document.body = body;       
            }
            catch(e) {
                document.documentElement.appendChild(body);
                dbg(e);
            }
        }

        document.body.id = "readabilityBody";

        var frames = document.getElementsByTagName('frame');
        if(frames.length > 0)
        {
            var bestFrame = null;
            var bestFrameSize = 0;    /* The frame to try to run readability upon. Must be on same domain. */
            var biggestFrameSize = 0; /* Used for the error message. Can be on any domain. */
            for(var frameIndex = 0; frameIndex < frames.length; frameIndex+=1)
            {
                var frameSize = frames[frameIndex].offsetWidth + frames[frameIndex].offsetHeight;
                var canAccessFrame = false;
                try {
                    var frameBody = frames[frameIndex].contentWindow.document.body;
                    canAccessFrame = true;
                }
                catch(eFrames) {
                    dbg(eFrames);
                }

                if(frameSize > biggestFrameSize) {
                    biggestFrameSize         = frameSize;
                    readability.biggestFrame = frames[frameIndex];
                }
                
                if(canAccessFrame && frameSize > bestFrameSize)
                {
                    readability.frameHack = true;
    
                    bestFrame = frames[frameIndex];
                    bestFrameSize = frameSize;
                }
            }

            if(bestFrame)
            {
                var newBody = document.createElement('body');
                newBody.innerHTML = bestFrame.contentWindow.document.body.innerHTML;
                newBody.style.overflow = 'scroll';
                document.body = newBody;
                
                var frameset = document.getElementsByTagName('frameset')[0];
                if(frameset) {
                    frameset.parentNode.removeChild(frameset); }
            }
        }

        /* Remove all stylesheets */
        for (var k=0;k < document.styleSheets.length; k+=1) {
            if (document.styleSheets[k].href !== null && document.styleSheets[k].href.lastIndexOf("readability") === -1) {
                document.styleSheets[k].disabled = true;
            }
        }

        /* Remove all style tags in head (not doing this on IE) - TODO: Why not? */
        var styleTags = document.getElementsByTagName("style");
        for (var st=0;st < styleTags.length; st+=1) {
            styleTags[st].textContent = "";
        }

        /* Turn all double br's into p's */
        /* Note, this is pretty costly as far as processing goes. Maybe optimize later. */
        document.body.innerHTML = document.body.innerHTML.replace(readability.regexps.replaceBrs, '</p><p>').replace(readability.regexps.replaceFonts, '<$1span>');
    },

    /**
     * For easier reading, convert this document to have footnotes at the bottom rather than inline links.
     * @see http://www.roughtype.com/archives/2010/05/experiments_in.php
     *
     * @return void
    **/
    addFootnotes: function(articleContent) {
        var footnotesWrapper = document.getElementById('readability-footnotes'),
            articleFootnotes = document.getElementById('readability-footnotes-list');
        
        if(!footnotesWrapper) {
            footnotesWrapper               = document.createElement("DIV");
            footnotesWrapper.id            = 'readability-footnotes';
            footnotesWrapper.innerHTML     = '<h3>References</h3>';
            footnotesWrapper.style.display = 'none'; /* Until we know we have footnotes, don't show the references block. */
            
            articleFootnotes    = document.createElement('ol');
            articleFootnotes.id = 'readability-footnotes-list';
            
            footnotesWrapper.appendChild(articleFootnotes);
    
            var readFooter = document.getElementById('readFooter');
            
            if(readFooter) {
                readFooter.parentNode.insertBefore(footnotesWrapper, readFooter);
            }
        }

        var articleLinks = articleContent.getElementsByTagName('a');
        var linkCount    = articleFootnotes.getElementsByTagName('li').length;
        for (var i = 0; i < articleLinks.length; i+=1)
        {
            var articleLink  = articleLinks[i],
                footnoteLink = articleLink.cloneNode(true),
                refLink      = document.createElement('a'),
                footnote     = document.createElement('li'),
                linkDomain   = footnoteLink.host ? footnoteLink.host : document.location.host,
                linkText     = readability.getInnerText(articleLink);
            
            if(articleLink.className && articleLink.className.indexOf('readability-DoNotFootnote') !== -1 || linkText.match(readability.regexps.skipFootnoteLink)) {
                continue;
            }
            
            linkCount+=1;

            /** Add a superscript reference after the article link */
            refLink.href      = '#readabilityFootnoteLink-' + linkCount;
            refLink.innerHTML = '<small><sup>[' + linkCount + ']</sup></small>';
            refLink.className = 'readability-DoNotFootnote';
            try { refLink.style.color = 'inherit'; } catch(e) {} /* IE7 doesn't like inherit. */
            
            if(articleLink.parentNode.lastChild === articleLink) {
                articleLink.parentNode.appendChild(refLink);
            } else {
                articleLink.parentNode.insertBefore(refLink, articleLink.nextSibling);
            }

            articleLink.name        = 'readabilityLink-' + linkCount;
            try { articleLink.style.color = 'inherit'; } catch(err) {} /* IE7 doesn't like inherit. */

            footnote.innerHTML      = "<small><sup><a href='#readabilityLink-" + linkCount + "' title='Jump to Link in Article'>^</a></sup></small> ";

            footnoteLink.innerHTML  = (footnoteLink.title ? footnoteLink.title : linkText);
            footnoteLink.name       = 'readabilityFootnoteLink-' + linkCount;
            
            footnote.appendChild(footnoteLink);
            footnote.innerHTML = footnote.innerHTML + "<small> (" + linkDomain + ")</small>";
            
            articleFootnotes.appendChild(footnote);
        }

        if(linkCount > 0) {
            footnotesWrapper.style.display = 'block';
        }
    },

    useRdbTypekit: function () {
        var rdbHead      = document.getElementsByTagName('head')[0];
        var rdbTKScript  = document.createElement('script');
        var rdbTKCode    = null;

        var rdbTKLink    = document.createElement('a');
            rdbTKLink.setAttribute('class','rdbTK-powered');
            rdbTKLink.setAttribute('title','Fonts by Typekit');
            rdbTKLink.innerHTML = "Fonts by <span class='rdbTK'>Typekit</span>";

        if (readStyle === "style-athelas") {
            rdbTKCode = "sxt6vzy";
            dbg("Using Athelas Theme");

            rdbTKLink.setAttribute('href','http://typekit.com/?utm_source=readability&utm_medium=affiliate&utm_campaign=athelas');
            rdbTKLink.setAttribute('id','rdb-athelas');
            document.getElementById("rdb-footer-right").appendChild(rdbTKLink);
        }
        if (readStyle === "style-apertura") {
            rdbTKCode = "bae8ybu";
            dbg("Using Inverse Theme");

            rdbTKLink.setAttribute('href','http://typekit.com/?utm_source=readability&utm_medium=affiliate&utm_campaign=inverse');
            rdbTKLink.setAttribute('id','rdb-inverse');
            document.getElementById("rdb-footer-right").appendChild(rdbTKLink);
        }

        /**
         * Setting new script tag attributes to pull Typekits libraries
        **/
        rdbTKScript.setAttribute('type','text/javascript');
        rdbTKScript.setAttribute('src',"http://use.typekit.com/" + rdbTKCode + ".js");
        rdbTKScript.setAttribute('charset','UTF-8');
        rdbHead.appendChild(rdbTKScript);

        /**
         * In the future, maybe try using the following experimental Callback function?:
         * http://gist.github.com/192350
         * &
         * http://getsatisfaction.com/typekit/topics/support_a_pre_and_post_load_callback_function
        **/
        var typekitLoader = function() {
            dbg("Looking for Typekit.");
            if(typeof Typekit !== "undefined") {
                try {
                    dbg("Caught typekit");
                    Typekit.load();
                    clearInterval(window.typekitInterval);
                } catch(e) {
                    dbg("Typekit error: " + e);
                }
            }
        };

        window.typekitInterval = window.setInterval(typekitLoader, 100);
    },

    /**
     * Prepare the article node for display. Clean out any inline styles,
     * iframes, forms, strip extraneous <p> tags, etc.
     *
     * @param Element
     * @return void
     **/
    prepArticle: function (articleContent) {
        readability.cleanStyles(articleContent);
        readability.killBreaks(articleContent);

        /* Clean out junk from the article content */
        readability.cleanConditionally(articleContent, "form");
        readability.clean(articleContent, "object");
        readability.clean(articleContent, "h1");

        /**
         * If there is only one h2, they are probably using it
         * as a header and not a subheader, so remove it since we already have a header.
        ***/
        if(articleContent.getElementsByTagName('h2').length === 1) {
            readability.clean(articleContent, "h2");
        }
        readability.clean(articleContent, "iframe");

        readability.cleanHeaders(articleContent);

        /* Do these last as the previous stuff may have removed junk that will affect these */
        readability.cleanConditionally(articleContent, "table");
        readability.cleanConditionally(articleContent, "ul");
        readability.cleanConditionally(articleContent, "div");

        /* Remove extra paragraphs */
        var articleParagraphs = articleContent.getElementsByTagName('p');
        for(var i = articleParagraphs.length-1; i >= 0; i-=1) {
            var imgCount    = articleParagraphs[i].getElementsByTagName('img').length;
            var embedCount  = articleParagraphs[i].getElementsByTagName('embed').length;
            var objectCount = articleParagraphs[i].getElementsByTagName('object').length;
            
            if(imgCount === 0 && embedCount === 0 && objectCount === 0 && readability.getInnerText(articleParagraphs[i], false) === '') {
                articleParagraphs[i].parentNode.removeChild(articleParagraphs[i]);
            }
        }

        try {
            articleContent.innerHTML = articleContent.innerHTML.replace(/<br[^>]*>\s*<p/gi, '<p');      
        }
        catch (e) {
            dbg("Cleaning innerHTML of breaks failed. This is an IE strict-block-elements bug. Ignoring.: " + e);
        }
    },
    
    /**
     * Initialize a node with the readability object. Also checks the
     * className/id for special names to add to its score.
     *
     * @param Element
     * @return void
    **/
    initializeNode: function (node) {
        node.readability = {"contentScore": 0};         

        switch(node.tagName) {
            case 'DIV':
                node.readability.contentScore += 5;
                break;

            case 'PRE':
            case 'TD':
            case 'BLOCKQUOTE':
                node.readability.contentScore += 3;
                break;
                
            case 'ADDRESS':
            case 'OL':
            case 'UL':
            case 'DL':
            case 'DD':
            case 'DT':
            case 'LI':
            case 'FORM':
                node.readability.contentScore -= 3;
                break;

            case 'H1':
            case 'H2':
            case 'H3':
            case 'H4':
            case 'H5':
            case 'H6':
            case 'TH':
                node.readability.contentScore -= 5;
                break;
        }
       
        node.readability.contentScore += readability.getClassWeight(node);
    },
    
    /***
     * grabArticle - Using a variety of metrics (content score, classname, element types), find the content that is
     *               most likely to be the stuff a user wants to read. Then return it wrapped up in a div.
     *
     * @param page a document to run upon. Needs to be a full document, complete with body.
     * @return Element
    **/
    grabArticle: function (page) {
        var stripUnlikelyCandidates = readability.flagIsActive(readability.FLAG_STRIP_UNLIKELYS),
            isPaging = (page !== null) ? true: false;

        page = page ? page : document.body;

        var pageCacheHtml = page.innerHTML;

        var allElements = page.getElementsByTagName('*');

        /**
         * First, node prepping. Trash nodes that look cruddy (like ones with the class name "comment", etc), and turn divs
         * into P tags where they have been used inappropriately (as in, where they contain no other block level elements.)
         *
         * Note: Assignment from index for performance. See http://www.peachpit.com/articles/article.aspx?p=31567&seqNum=5
         * TODO: Shouldn't this be a reverse traversal?
        **/
        var node = null;
        var nodesToScore = [];
        for(var nodeIndex = 0; (node = allElements[nodeIndex]); nodeIndex+=1) {
            /* Remove unlikely candidates */
            if (stripUnlikelyCandidates) {
                var unlikelyMatchString = node.className + node.id;
                if (
                    (
                        unlikelyMatchString.search(readability.regexps.unlikelyCandidates) !== -1 &&
                        unlikelyMatchString.search(readability.regexps.okMaybeItsACandidate) === -1 &&
                        node.tagName !== "BODY"
                    )
                )
                {
                    dbg("Removing unlikely candidate - " + unlikelyMatchString);
                    node.parentNode.removeChild(node);
                    nodeIndex-=1;
                    continue;
                }               
            }

            if (node.tagName === "P" || node.tagName === "TD" || node.tagName === "PRE") {
                nodesToScore[nodesToScore.length] = node;
            }

            /* Turn all divs that don't have children block level elements into p's */
            if (node.tagName === "DIV") {
                if (node.innerHTML.search(readability.regexps.divToPElements) === -1) {
                    var newNode = document.createElement('p');
                    try {
                        newNode.innerHTML = node.innerHTML;             
                        node.parentNode.replaceChild(newNode, node);
                        nodeIndex-=1;

                        nodesToScore[nodesToScore.length] = node;
                    }
                    catch(e) {
                        dbg("Could not alter div to p, probably an IE restriction, reverting back to div.: " + e);
                    }
                }
                else
                {
                    /* EXPERIMENTAL */
                    for(var i = 0, il = node.childNodes.length; i < il; i+=1) {
                        var childNode = node.childNodes[i];
                        if(childNode.nodeType === 3) { // Node.TEXT_NODE
                            var p = document.createElement('p');
                            p.innerHTML = childNode.nodeValue;
                            p.style.display = 'inline';
                            p.className = 'readability-styled';
                            childNode.parentNode.replaceChild(p, childNode);
                        }
                    }
                }
            } 
        }

        /**
         * Loop through all paragraphs, and assign a score to them based on how content-y they look.
         * Then add their score to their parent node.
         *
         * A score is determined by things like number of commas, class names, etc. Maybe eventually link density.
        **/
        var candidates = [];
        for (var pt=0; pt < nodesToScore.length; pt+=1) {
            var parentNode      = nodesToScore[pt].parentNode;
            var grandParentNode = parentNode ? parentNode.parentNode : null;
            var innerText       = readability.getInnerText(nodesToScore[pt]);

            if(!parentNode || typeof(parentNode.tagName) === 'undefined') {
                continue;
            }

            /* If this paragraph is less than 25 characters, don't even count it. */
            if(innerText.length < 25) {
                continue; }

            /* Initialize readability data for the parent. */
            if(typeof parentNode.readability === 'undefined') {
                readability.initializeNode(parentNode);
                candidates.push(parentNode);
            }

            /* Initialize readability data for the grandparent. */
            if(grandParentNode && typeof(grandParentNode.readability) === 'undefined' && typeof(grandParentNode.tagName) !== 'undefined') {
                readability.initializeNode(grandParentNode);
                candidates.push(grandParentNode);
            }

            var contentScore = 0;

            /* Add a point for the paragraph itself as a base. */
            contentScore+=1;

            /* Add points for any commas within this paragraph */
            contentScore += innerText.split(',').length;
            
            /* For every 100 characters in this paragraph, add another point. Up to 3 points. */
            contentScore += Math.min(Math.floor(innerText.length / 100), 3);
            
            /* Add the score to the parent. The grandparent gets half. */
            parentNode.readability.contentScore += contentScore;

            if(grandParentNode) {
                grandParentNode.readability.contentScore += contentScore/2;             
            }
        }

        /**
         * After we've calculated scores, loop through all of the possible candidate nodes we found
         * and find the one with the highest score.
        **/
        var topCandidate = null;
        for(var c=0, cl=candidates.length; c < cl; c+=1)
        {
            /**
             * Scale the final candidates score based on link density. Good content should have a
             * relatively small link density (5% or less) and be mostly unaffected by this operation.
            **/
            candidates[c].readability.contentScore = candidates[c].readability.contentScore * (1-readability.getLinkDensity(candidates[c]));

            dbg('Candidate: ' + candidates[c] + " (" + candidates[c].className + ":" + candidates[c].id + ") with score " + candidates[c].readability.contentScore);

            if(!topCandidate || candidates[c].readability.contentScore > topCandidate.readability.contentScore) {
                topCandidate = candidates[c]; }
        }

        /**
         * If we still have no top candidate, just use the body as a last resort.
         * We also have to copy the body node so it is something we can modify.
         **/
        if (topCandidate === null || topCandidate.tagName === "BODY")
        {
            topCandidate = document.createElement("DIV");
            topCandidate.innerHTML = page.innerHTML;
            page.innerHTML = "";
            page.appendChild(topCandidate);
            readability.initializeNode(topCandidate);
        }

        /**
         * Now that we have the top candidate, look through its siblings for content that might also be related.
         * Things like preambles, content split by ads that we removed, etc.
        **/
        var articleContent        = document.createElement("DIV");
        if (isPaging) {
            articleContent.id     = "readability-content";
        }
        var siblingScoreThreshold = Math.max(10, topCandidate.readability.contentScore * 0.2);
        var siblingNodes          = topCandidate.parentNode.childNodes;


        for(var s=0, sl=siblingNodes.length; s < sl; s+=1) {
            var siblingNode = siblingNodes[s];
            var append      = false;

            /**
             * Fix for odd IE7 Crash where siblingNode does not exist even though this should be a live nodeList.
             * Example of error visible here: http://www.esquire.com/features/honesty0707
            **/
            if(!siblingNode) {
                continue;
            }

            dbg("Looking at sibling node: " + siblingNode + " (" + siblingNode.className + ":" + siblingNode.id + ")" + ((typeof siblingNode.readability !== 'undefined') ? (" with score " + siblingNode.readability.contentScore) : ''));
            dbg("Sibling has score " + (siblingNode.readability ? siblingNode.readability.contentScore : 'Unknown'));

            if(siblingNode === topCandidate)
            {
                append = true;
            }

            var contentBonus = 0;
            /* Give a bonus if sibling nodes and top candidates have the example same classname */
            if(siblingNode.className === topCandidate.className && topCandidate.className !== "") {
                contentBonus += topCandidate.readability.contentScore * 0.2;
            }

            if(typeof siblingNode.readability !== 'undefined' && (siblingNode.readability.contentScore+contentBonus) >= siblingScoreThreshold)
            {
                append = true;
            }
            
            if(siblingNode.nodeName === "P") {
                var linkDensity = readability.getLinkDensity(siblingNode);
                var nodeContent = readability.getInnerText(siblingNode);
                var nodeLength  = nodeContent.length;
                
                if(nodeLength > 80 && linkDensity < 0.25)
                {
                    append = true;
                }
                else if(nodeLength < 80 && linkDensity === 0 && nodeContent.search(/\.( |$)/) !== -1)
                {
                    append = true;
                }
            }

            if(append) {
                dbg("Appending node: " + siblingNode);

                var nodeToAppend = null;
                if(siblingNode.nodeName !== "DIV" && siblingNode.nodeName !== "P") {
                    /* We have a node that isn't a common block level element, like a form or td tag. Turn it into a div so it doesn't get filtered out later by accident. */
                    
                    dbg("Altering siblingNode of " + siblingNode.nodeName + ' to div.');
                    nodeToAppend = document.createElement("DIV");
                    try {
                        nodeToAppend.id = siblingNode.id;
                        nodeToAppend.innerHTML = siblingNode.innerHTML;
                    }
                    catch(er) {
                        dbg("Could not alter siblingNode to div, probably an IE restriction, reverting back to original.");
                        nodeToAppend = siblingNode;
                        s-=1;
                        sl-=1;
                    }
                } else {
                    nodeToAppend = siblingNode;
                    s-=1;
                    sl-=1;
                }
                
                /* To ensure a node does not interfere with readability styles, remove its classnames */
                nodeToAppend.className = "";

                /* Append sibling and subtract from our list because it removes the node when you append to another node */
                articleContent.appendChild(nodeToAppend);
            }
        }

        /**
         * So we have all of the content that we need. Now we clean it up for presentation.
        **/
        readability.prepArticle(articleContent);

        if (readability.curPageNum === 1) {
            articleContent.innerHTML = '<div id="readability-page-1" class="page">' + articleContent.innerHTML + '</div>';
        }

        /**
         * Now that we've gone through the full algorithm, check to see if we got any meaningful content.
         * If we didn't, we may need to re-run grabArticle with different flags set. This gives us a higher
         * likelihood of finding the content, and the sieve approach gives us a higher likelihood of
         * finding the -right- content.
        **/
        if(readability.getInnerText(articleContent, false).length < 250) {
        page.innerHTML = pageCacheHtml;

            if (readability.flagIsActive(readability.FLAG_STRIP_UNLIKELYS)) {
                readability.removeFlag(readability.FLAG_STRIP_UNLIKELYS);
                return readability.grabArticle(page);
            }
            else if (readability.flagIsActive(readability.FLAG_WEIGHT_CLASSES)) {
                readability.removeFlag(readability.FLAG_WEIGHT_CLASSES);
                return readability.grabArticle(page);
            }
            else if (readability.flagIsActive(readability.FLAG_CLEAN_CONDITIONALLY)) {
                readability.removeFlag(readability.FLAG_CLEAN_CONDITIONALLY);
                return readability.grabArticle(page);
            } else {
                return null;
            }
        }
        
        return articleContent;
    },
    
    /**
     * Removes script tags from the document.
     *
     * @param Element
    **/
    removeScripts: function (doc) {
        var scripts = doc.getElementsByTagName('script');
        for(var i = scripts.length-1; i >= 0; i-=1)
        {
            if(typeof(scripts[i].src) === "undefined" || (scripts[i].src.indexOf('readability') === -1 && scripts[i].src.indexOf('typekit') === -1))
            {
                scripts[i].nodeValue="";
                scripts[i].removeAttribute('src');
                if (scripts[i].parentNode) {
                        scripts[i].parentNode.removeChild(scripts[i]);          
                }
            }
        }
    },
    
    /**
     * Get the inner text of a node - cross browser compatibly.
     * This also strips out any excess whitespace to be found.
     *
     * @param Element
     * @return string
    **/
    getInnerText: function (e, normalizeSpaces) {
        
        NSLog('getInnerText');
        var textContent    = "";

        if(typeof(e.textContent) === "undefined" && typeof(e.innerText) === "undefined") {
            return "";
        }

        normalizeSpaces = (typeof normalizeSpaces === 'undefined') ? true : normalizeSpaces;

        if (navigator.appName === "Microsoft Internet Explorer") {
            textContent = e.innerText.replace( readability.regexps.trim, "" ); }
        else {
            textContent = e.textContent.replace( readability.regexps.trim, "" ); }

        if(normalizeSpaces) {
            return textContent.replace( readability.regexps.normalize, " "); }
        else {
            return textContent; }
    },

    /**
     * Get the number of times a string s appears in the node e.
     *
     * @param Element
     * @param string - what to split on. Default is ","
     * @return number (integer)
    **/
    getCharCount: function (e,s) {
        s = s || ",";
        return readability.getInnerText(e).split(s).length-1;
    },

    /**
     * Remove the style attribute on every e and under.
     * TODO: Test if getElementsByTagName(*) is faster.
     *
     * @param Element
     * @return void
    **/
    cleanStyles: function (e) {
        e = e || document;
        var cur = e.firstChild;

        if(!e) {
            return; }

        // Remove any root styles, if we're able.
        if(typeof e.removeAttribute === 'function' && e.className !== 'readability-styled') {
            e.removeAttribute('style'); }

        // Go until there are no more child nodes
        while ( cur !== null ) {
            if ( cur.nodeType === 1 ) {
                // Remove style attribute(s) :
                if(cur.className !== "readability-styled") {
                    cur.removeAttribute("style");                   
                }
                readability.cleanStyles( cur );
            }
            cur = cur.nextSibling;
        }           
    },
    
    /**
     * Get the density of links as a percentage of the content
     * This is the amount of text that is inside a link divided by the total text in the node.
     * 
     * @param Element
     * @return number (float)
    **/
    getLinkDensity: function (e) {
        var links      = e.getElementsByTagName("a");
        var textLength = readability.getInnerText(e).length;
        var linkLength = 0;
        for(var i=0, il=links.length; i<il;i+=1)
        {
            linkLength += readability.getInnerText(links[i]).length;
        }       

        return linkLength / textLength;
    },
    
    /**
     * Find a cleaned up version of the current URL, to use for comparing links for possible next-pageyness.
     *
     * @author Dan Lacy
     * @return string the base url
    **/
    findBaseUrl: function () {
        var noUrlParams     = window.location.pathname.split("?")[0],
            urlSlashes      = noUrlParams.split("/").reverse(),
            cleanedSegments = [],
            possibleType    = "";

        for (var i = 0, slashLen = urlSlashes.length; i < slashLen; i+=1) {
            var segment = urlSlashes[i];

            // Split off and save anything that looks like a file type.
            if (segment.indexOf(".") !== -1) {
                possibleType = segment.split(".")[1];

                /* If the type isn't alpha-only, it's probably not actually a file extension. */
                if(!possibleType.match(/[^a-zA-Z]/)) {
                    segment = segment.split(".")[0];                    
                }
            }
            
            /**
             * EW-CMS specific segment replacement. Ugly.
             * Example: http://www.ew.com/ew/article/0,,20313460_20369436,00.html
            **/
            if(segment.indexOf(',00') !== -1) {
                segment = segment.replace(',00', '');
            }

            // If our first or second segment has anything looking like a page number, remove it.
            if (segment.match(/((_|-)?p[a-z]*|(_|-))[0-9]{1,2}$/i) && ((i === 1) || (i === 0))) {
                segment = segment.replace(/((_|-)?p[a-z]*|(_|-))[0-9]{1,2}$/i, "");
            }


            var del = false;

            /* If this is purely a number, and it's the first or second segment, it's probably a page number. Remove it. */
            if (i < 2 && segment.match(/^\d{1,2}$/)) {
                del = true;
            }
            
            /* If this is the first segment and it's just "index", remove it. */
            if(i === 0 && segment.toLowerCase() === "index") {
                del = true;
            }

            /* If our first or second segment is smaller than 3 characters, and the first segment was purely alphas, remove it. */
            if(i < 2 && segment.length < 3 && !urlSlashes[0].match(/[a-z]/i)) {
                del = true;
            }

            /* If it's not marked for deletion, push it to cleanedSegments. */
            if (!del) {
                cleanedSegments.push(segment);
            }
        }

        // This is our final, cleaned, base article URL.
        return window.location.protocol + "//" + window.location.host + cleanedSegments.reverse().join("/");
    },

    /**
     * Look for any paging links that may occur within the document.
     * 
     * @param body
     * @return object (array)
    **/
    findNextPageLink: function (elem) {
        var possiblePages = {},
            allLinks = elem.getElementsByTagName('a'),
            articleBaseUrl = readability.findBaseUrl();

        /**
         * Loop through all links, looking for hints that they may be next-page links.
         * Things like having "page" in their textContent, className or id, or being a child
         * of a node with a page-y className or id.
         *
         * Also possible: levenshtein distance? longest common subsequence?
         *
         * After we do that, assign each page a score, and 
        **/
        for(var i = 0, il = allLinks.length; i < il; i+=1) {
            var link     = allLinks[i],
                linkHref = allLinks[i].href.replace(/#.*$/, '').replace(/\/$/, '');

            /* If we've already seen this page, ignore it */
            if(linkHref === "" || linkHref === articleBaseUrl || linkHref === window.location.href || linkHref in readability.parsedPages) {
                continue;
            }
            
            /* If it's on a different domain, skip it. */
            if(window.location.host !== linkHref.split(/\/+/g)[1]) {
                continue;
            }
            
            var linkText = readability.getInnerText(link);

            /* If the linkText looks like it's not the next page, skip it. */
            if(linkText.match(readability.regexps.extraneous) || linkText.length > 25) {
                continue;
            }

            /* If the leftovers of the URL after removing the base URL don't contain any digits, it's certainly not a next page link. */
            var linkHrefLeftover = linkHref.replace(articleBaseUrl, '');
            if(!linkHrefLeftover.match(/\d/)) {
                continue;
            }
            
            if(!(linkHref in possiblePages)) {
                possiblePages[linkHref] = {"score": 0, "linkText": linkText, "href": linkHref};             
            } else {
                possiblePages[linkHref].linkText += ' | ' + linkText;
            }

            var linkObj = possiblePages[linkHref];

            /**
             * If the articleBaseUrl isn't part of this URL, penalize this link. It could still be the link, but the odds are lower.
             * Example: http://www.actionscript.org/resources/articles/745/1/JavaScript-and-VBScript-Injection-in-ActionScript-3/Page1.html
            **/
            if(linkHref.indexOf(articleBaseUrl) !== 0) {
                linkObj.score -= 25;
            }

            var linkData = linkText + ' ' + link.className + ' ' + link.id;
            if(linkData.match(readability.regexps.nextLink)) {
                linkObj.score += 50;
            }
            if(linkData.match(/pag(e|ing|inat)/i)) {
                linkObj.score += 25;
            }
            if(linkData.match(/(first|last)/i)) { // -65 is enough to negate any bonuses gotten from a > or » in the text, 
                /* If we already matched on "next", last is probably fine. If we didn't, then it's bad. Penalize. */
                if(!linkObj.linkText.match(readability.regexps.nextLink)) {
                    linkObj.score -= 65;
                }
            }
            if(linkData.match(readability.regexps.negative) || linkData.match(readability.regexps.extraneous)) {
                linkObj.score -= 50;
            }
            if(linkData.match(readability.regexps.prevLink)) {
                linkObj.score -= 200;
            }

            /* If a parentNode contains page or paging or paginat */
            var parentNode = link.parentNode,
                positiveNodeMatch = false,
                negativeNodeMatch = false;
            while(parentNode) {
                var parentNodeClassAndId = parentNode.className + ' ' + parentNode.id;
                if(!positiveNodeMatch && parentNodeClassAndId && parentNodeClassAndId.match(/pag(e|ing|inat)/i)) {
                    positiveNodeMatch = true;
                    linkObj.score += 25;
                }
                if(!negativeNodeMatch && parentNodeClassAndId && parentNodeClassAndId.match(readability.regexps.negative)) {
                    /* If this is just something like "footer", give it a negative. If it's something like "body-and-footer", leave it be. */
                    if(!parentNodeClassAndId.match(readability.regexps.positive)) {
                        linkObj.score -= 25;
                        negativeNodeMatch = true;                       
                    }
                }
                
                parentNode = parentNode.parentNode;
            }

            /**
             * If the URL looks like it has paging in it, add to the score.
             * Things like /page/2/, /pagenum/2, ?p=3, ?page=11, ?pagination=34
            **/
            if (linkHref.match(/p(a|g|ag)?(e|ing|ination)?(=|\/)[0-9]{1,2}/i) || linkHref.match(/(page|paging)/i)) {
                linkObj.score += 25;
            }

            /* If the URL contains negative values, give a slight decrease. */
            if (linkHref.match(readability.regexps.extraneous)) {
                linkObj.score -= 15;
            }

            /**
             * Minor punishment to anything that doesn't match our current URL.
             * NOTE: I'm finding this to cause more harm than good where something is exactly 50 points.
             *       Dan, can you show me a counterexample where this is necessary?
             * if (linkHref.indexOf(window.location.href) !== 0) {
             *    linkObj.score -= 1;
             * }
            **/

            /**
             * If the link text can be parsed as a number, give it a minor bonus, with a slight
             * bias towards lower numbered pages. This is so that pages that might not have 'next'
             * in their text can still get scored, and sorted properly by score.
            **/
            var linkTextAsNumber = parseInt(linkText, 10);
            if(linkTextAsNumber) {
                // Punish 1 since we're either already there, or it's probably before what we want anyways.
                if (linkTextAsNumber === 1) {
                    linkObj.score -= 10;
                }
                else {
                    // Todo: Describe this better
                    linkObj.score += Math.max(0, 10 - linkTextAsNumber);
                }
            }
        }

        /**
         * Loop thrugh all of our possible pages from above and find our top candidate for the next page URL.
         * Require at least a score of 50, which is a relatively high confidence that this page is the next link.
        **/
        var topPage = null;
        for(var page in possiblePages) {
            if(possiblePages.hasOwnProperty(page)) {
                if(possiblePages[page].score >= 50 && (!topPage || topPage.score < possiblePages[page].score)) {
                    topPage = possiblePages[page];
                }
            }
        }

        if(topPage) {
            var nextHref = topPage.href.replace(/\/$/,'');

            dbg('NEXT PAGE IS ' + nextHref);
            readability.parsedPages[nextHref] = true;
            return nextHref;            
        }
        else {
            return null;
        }
    },

    /**
     * Build a simple cross browser compatible XHR.
     *
     * TODO: This could likely be simplified beyond what we have here right now. There's still a bit of excess junk.
    **/
    xhr: function () {
        if (typeof XMLHttpRequest !== 'undefined' && (window.location.protocol !== 'file:' || !window.ActiveXObject)) {
            return new XMLHttpRequest();
        }
        else {
            try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(sixerr) { }
            try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(threrr) { }
            try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(err) { }
        }

        return false;
    },

    successfulRequest: function (request) {
        return (request.status >= 200 && request.status < 300) || request.status === 304 || (request.status === 0 && request.responseText);
    },

    ajax: function (url, options) {
        var request = readability.xhr();

        function respondToReadyState(readyState) {
            if (request.readyState === 4) {
                if (readability.successfulRequest(request)) {
                    if (options.success) { options.success(request); }
                }
                else {
                    if (options.error) { options.error(request); }
                }
            }
        }

        if (typeof options === 'undefined') { options = {}; }

        request.onreadystatechange = respondToReadyState;
        
        request.open('get', url, true);
        request.setRequestHeader('Accept', 'text/html');

        try {
            request.send(options.postBody);
        }
        catch (e) {
            if (options.error) { options.error(); }
        }

        return request;
    },

    /**
     * Make an AJAX request for each page and append it to the document.
    **/
    curPageNum: 1,

    appendNextPage: function (nextPageLink) {
        readability.curPageNum+=1;

        var articlePage       = document.createElement("DIV");
        articlePage.id        = 'readability-page-' + readability.curPageNum;
        articlePage.className = 'page';
        articlePage.innerHTML = '<p class="page-separator" title="Page ' + readability.curPageNum + '">&sect;</p>';

        document.getElementById("readability-content").appendChild(articlePage);

        if(readability.curPageNum > readability.maxPages) {
            var nextPageMarkup = "<div style='text-align: center'><a href='" + nextPageLink + "'>View Next Page</a></div>";

            articlePage.innerHTML = articlePage.innerHTML + nextPageMarkup;
            return;
        }
        
        /**
         * Now that we've built the article page DOM element, get the page content
         * asynchronously and load the cleaned content into the div we created for it.
        **/
        (function(pageUrl, thisPage) {
            readability.ajax(pageUrl, {
                success: function(r) {

                    /* First, check to see if we have a matching ETag in headers - if we do, this is a duplicate page. */
                    var eTag = r.getResponseHeader('ETag');
                    if(eTag) {
                        if(eTag in readability.pageETags) {
                            dbg("Exact duplicate page found via ETag. Aborting.");
                            articlePage.style.display = 'none';
                            return;
                        } else {
                            readability.pageETags[eTag] = 1;
                        }                       
                    }

                    // TODO: this ends up doubling up page numbers on NYTimes articles. Need to generically parse those away.
                    var page = document.createElement("DIV");

                    /**
                     * Do some preprocessing to our HTML to make it ready for appending.
                     * • Remove any script tags. Swap and reswap newlines with a unicode character because multiline regex doesn't work in javascript.
                     * • Turn any noscript tags into divs so that we can parse them. This allows us to find any next page links hidden via javascript.
                     * • Turn all double br's into p's - was handled by prepDocument in the original view.
                     *   Maybe in the future abstract out prepDocument to work for both the original document and AJAX-added pages.
                    **/
                    var responseHtml = r.responseText.replace(/\n/g,'\uffff').replace(/<script.*?>.*?<\/script>/gi, '');
                    responseHtml = responseHtml.replace(/\n/g,'\uffff').replace(/<script.*?>.*?<\/script>/gi, '');
                    responseHtml = responseHtml.replace(/\uffff/g,'\n').replace(/<(\/?)noscript/gi, '<$1div');
                    responseHtml = responseHtml.replace(readability.regexps.replaceBrs, '</p><p>');
                    responseHtml = responseHtml.replace(readability.regexps.replaceFonts, '<$1span>');
                    
                    page.innerHTML = responseHtml;

                    /**
                     * Reset all flags for the next page, as they will search through it and disable as necessary at the end of grabArticle.
                    **/
                    readability.flags = 0x1 | 0x2 | 0x4;

                    var nextPageLink = readability.findNextPageLink(page),
                        content      =  readability.grabArticle(page);

                    if(!content) {
                        dbg("No content found in page to append. Aborting.");
                        return;
                    }

                    /**
                     * Anti-duplicate mechanism. Essentially, get the first paragraph of our new page.
                     * Compare it against all of the the previous document's we've gotten. If the previous
                     * document contains exactly the innerHTML of this first paragraph, it's probably a duplicate.
                    **/
                    var firstP = content.getElementsByTagName("P").length ? content.getElementsByTagName("P")[0] : null;
                    if(firstP && firstP.innerHTML.length > 100) {
                        for(var i=1; i <= readability.curPageNum; i+=1) {
                            var rPage = document.getElementById('readability-page-' + i);
                            if(rPage && rPage.innerHTML.indexOf(firstP.innerHTML) !== -1) {
                                dbg('Duplicate of page ' + i + ' - skipping.');
                                articlePage.style.display = 'none';
                                readability.parsedPages[pageUrl] = true;
                                return;
                            }
                        }
                    }
                    
                    readability.removeScripts(content);

                    thisPage.innerHTML = thisPage.innerHTML + content.innerHTML;

                    /**
                     * After the page has rendered, post process the content. This delay is necessary because,
                     * in webkit at least, offsetWidth is not set in time to determine image width. We have to
                     * wait a little bit for reflow to finish before we can fix floating images.
                    **/
                    window.setTimeout(
                        function() { readability.postProcessContent(thisPage); },
                        500
                    );

                    if(nextPageLink) {
                        readability.appendNextPage(nextPageLink);
                    }
                }
            });
        }(nextPageLink, articlePage));
    },
    
    /**
     * Get an elements class/id weight. Uses regular expressions to tell if this 
     * element looks good or bad.
     *
     * @param Element
     * @return number (Integer)
    **/
    getClassWeight: function (e) {
        if(!readability.flagIsActive(readability.FLAG_WEIGHT_CLASSES)) {
            return 0;
        }

        var weight = 0;

        /* Look for a special classname */
        if (typeof(e.className) === 'string' && e.className !== '')
        {
            if(e.className.search(readability.regexps.negative) !== -1) {
                weight -= 25; }

            if(e.className.search(readability.regexps.positive) !== -1) {
                weight += 25; }
        }

        /* Look for a special ID */
        if (typeof(e.id) === 'string' && e.id !== '')
        {
            if(e.id.search(readability.regexps.negative) !== -1) {
                weight -= 25; }

            if(e.id.search(readability.regexps.positive) !== -1) {
                weight += 25; }
        }

        return weight;
    },

    nodeIsVisible: function (node) {
        return (node.offsetWidth !== 0 || node.offsetHeight !== 0) && node.style.display.toLowerCase() !== 'none';
    },

    /**
     * Remove extraneous break tags from a node.
     *
     * @param Element
     * @return void
     **/
    killBreaks: function (e) {
        try {
            e.innerHTML = e.innerHTML.replace(readability.regexps.killBreaks,'<br />');       
        }
        catch (eBreaks) {
            dbg("KillBreaks failed - this is an IE bug. Ignoring.: " + eBreaks);
        }
    },

    /**
     * Clean a node of all elements of type "tag".
     * (Unless it's a youtube/vimeo video. People love movies.)
     *
     * @param Element
     * @param string tag to clean
     * @return void
     **/
    clean: function (e, tag) {
        var targetList = e.getElementsByTagName( tag );
        var isEmbed    = (tag === 'object' || tag === 'embed');
        
        for (var y=targetList.length-1; y >= 0; y-=1) {
            /* Allow youtube and vimeo videos through as people usually want to see those. */
            if(isEmbed) {
                var attributeValues = "";
                for (var i=0, il=targetList[y].attributes.length; i < il; i+=1) {
                    attributeValues += targetList[y].attributes[i].value + '|';
                }
                
                /* First, check the elements attributes to see if any of them contain youtube or vimeo */
                if (attributeValues.search(readability.regexps.videos) !== -1) {
                    continue;
                }

                /* Then check the elements inside this element for the same. */
                if (targetList[y].innerHTML.search(readability.regexps.videos) !== -1) {
                    continue;
                }
                
            }

            targetList[y].parentNode.removeChild(targetList[y]);
        }
    },
    
    /**
     * Clean an element of all tags of type "tag" if they look fishy.
     * "Fishy" is an algorithm based on content length, classnames, link density, number of images & embeds, etc.
     *
     * @return void
     **/
    cleanConditionally: function (e, tag) {

        if(!readability.flagIsActive(readability.FLAG_CLEAN_CONDITIONALLY)) {
            return;
        }

        var tagsList      = e.getElementsByTagName(tag);
        var curTagsLength = tagsList.length;

        /**
         * Gather counts for other typical elements embedded within.
         * Traverse backwards so we can remove nodes at the same time without effecting the traversal.
         *
         * TODO: Consider taking into account original contentScore here.
        **/
        for (var i=curTagsLength-1; i >= 0; i-=1) {
            var weight = readability.getClassWeight(tagsList[i]);
            var contentScore = (typeof tagsList[i].readability !== 'undefined') ? tagsList[i].readability.contentScore : 0;
            
            dbg("Cleaning Conditionally " + tagsList[i] + " (" + tagsList[i].className + ":" + tagsList[i].id + ")" + ((typeof tagsList[i].readability !== 'undefined') ? (" with score " + tagsList[i].readability.contentScore) : ''));

            if(weight+contentScore < 0)
            {
                tagsList[i].parentNode.removeChild(tagsList[i]);
            }
            else if ( readability.getCharCount(tagsList[i],',') < 10) {
                /**
                 * If there are not very many commas, and the number of
                 * non-paragraph elements is more than paragraphs or other ominous signs, remove the element.
                **/
                var p      = tagsList[i].getElementsByTagName("p").length;
                var img    = tagsList[i].getElementsByTagName("img").length;
                var li     = tagsList[i].getElementsByTagName("li").length-100;
                var input  = tagsList[i].getElementsByTagName("input").length;

                var embedCount = 0;
                var embeds     = tagsList[i].getElementsByTagName("embed");
                for(var ei=0,il=embeds.length; ei < il; ei+=1) {
                    if (embeds[ei].src.search(readability.regexps.videos) === -1) {
                      embedCount+=1; 
                    }
                }

                var linkDensity   = readability.getLinkDensity(tagsList[i]);
                var contentLength = readability.getInnerText(tagsList[i]).length;
                var toRemove      = false;

                if ( img > p ) {
                    toRemove = true;
                } else if(li > p && tag !== "ul" && tag !== "ol") {
                    toRemove = true;
                } else if( input > Math.floor(p/3) ) {
                    toRemove = true; 
                } else if(contentLength < 25 && (img === 0 || img > 2) ) {
                    toRemove = true;
                } else if(weight < 25 && linkDensity > 0.2) {
                    toRemove = true;
                } else if(weight >= 25 && linkDensity > 0.5) {
                    toRemove = true;
                } else if((embedCount === 1 && contentLength < 75) || embedCount > 1) {
                    toRemove = true;
                }

                if(toRemove) {
                    tagsList[i].parentNode.removeChild(tagsList[i]);
                }
            }
        }
    },

    /**
     * Clean out spurious headers from an Element. Checks things like classnames and link density.
     *
     * @param Element
     * @return void
    **/
    cleanHeaders: function (e) {
        for (var headerIndex = 1; headerIndex < 3; headerIndex+=1) {
            var headers = e.getElementsByTagName('h' + headerIndex);
            for (var i=headers.length-1; i >=0; i-=1) {
                if (readability.getClassWeight(headers[i]) < 0 || readability.getLinkDensity(headers[i]) > 0.33) {
                    headers[i].parentNode.removeChild(headers[i]);
                }
            }
        }
    },

    /*** Smooth scrolling logic ***/
    
    /**
     * easeInOut animation algorithm - returns an integer that says how far to move at this point in the animation.
     * Borrowed from jQuery's easing library.
     * @return integer
    **/
    easeInOut: function(start,end,totalSteps,actualStep) { 
        var delta = end - start; 

        if ((actualStep/=totalSteps/2) < 1) { 
            return delta/2*actualStep*actualStep + start;
        }
        actualStep -=1;
        return -delta/2 * ((actualStep)*(actualStep-2) - 1) + start;
    },
    
    /**
     * Helper function to, in a cross compatible way, get or set the current scroll offset of the document.
     * @return mixed integer on get, the result of window.scrollTo on set
    **/
    scrollTop: function(scroll){
        var setScroll = typeof scroll !== 'undefined';

        if(setScroll) {
            return window.scrollTo(0, scroll);
        }
        if(typeof window.pageYOffset !== 'undefined') {
            return window.pageYOffset;
        }
        else if(document.documentElement.clientHeight) {
            return document.documentElement.scrollTop;
        }
        else {
            return document.body.scrollTop;
        }
    },
    
    /**
     * scrollTo - Smooth scroll to the point of scrollEnd in the document.
     * @return void
    **/
    curScrollStep: 0,
    scrollTo: function (scrollStart, scrollEnd, steps, interval) {
        if(
            (scrollStart < scrollEnd && readability.scrollTop() < scrollEnd) ||
            (scrollStart > scrollEnd && readability.scrollTop() > scrollEnd)
          ) {
            readability.curScrollStep+=1;
            if(readability.curScrollStep > steps) {
                return;
            }

            var oldScrollTop = readability.scrollTop();
            
            readability.scrollTop(readability.easeInOut(scrollStart, scrollEnd, steps, readability.curScrollStep));

            // We're at the end of the window.
            if(oldScrollTop === readability.scrollTop()) {
                return;
            }

            window.setTimeout(function() {
                readability.scrollTo(scrollStart, scrollEnd, steps, interval);
            }, interval);
        }
    },

    htmlspecialchars: function (s) {
        if (typeof(s) === "string") {
            s = s.replace(/&/g, "&amp;");
            s = s.replace(/"/g, "&quot;");
            s = s.replace(/'/g, "&#039;");
            s = s.replace(/</g, "&lt;");
            s = s.replace(/>/g, "&gt;");
        }
    
        return s;
    },

    flagIsActive: function(flag) {
        return (readability.flags & flag) > 0;
    },
    
    addFlag: function(flag) {
        readability.flags = readability.flags | flag;
    },
    
    removeFlag: function(flag) {
        readability.flags = readability.flags & ~flag;
    }
    
};

readability.init();
