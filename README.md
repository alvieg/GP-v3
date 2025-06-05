# yo
## How to make about:blank cloaking
```js
function openInNewTab(URL) {
    var win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    var iframe = win.document.createElement('embed');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    var url = URL;
    iframe.src = url;
    win.document.body.appendChild(iframe);
    var script = win.document.createElement('script');
    script.innerHTML = "setTimeout(() => { location.reload(true); }, 10800 * 1000);";
    win.document.body.appendChild(script);
    window.close();
    console.log(url);
};
```
it uses
```html
<embed>
```
instead of
```html
<iframe>
```
because securly isn't able to block site if you embed them.
