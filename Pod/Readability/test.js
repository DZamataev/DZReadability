function NSLog(text) {
    var iframe = document.createElement('iframe');
    var url = "debugger://" + text;
    iframe.setAttribute('src', url);
    iframe.setAttribute('height', '1px');
    iframe.setAttribute('width', '1px');
    document.documentElement.appendChild(iframe);
    iframe.parentNode.removeChild(iframe);
    iframe = null;
}

function test() {
    NSLog("Button was clicked");
    NSLog("We are done");
}

test();
alert('wtf');