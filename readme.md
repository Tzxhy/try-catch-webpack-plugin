### Why try-catch?
Usually we can debug our code with the help of chrome devtools (for PC site or mobile site simulate), and we can also debug *some* mobile browsers with Chrome devtools(I mean which using WebKit and open developer debug options). But there are always some werid browsers keeping away us to debug, e.g. huawei Browser. Not just that, *some* browsers even *can not* capture errors using window.onerror = function(){}, e.g. huawei browser( I really don't mean to it). So, how can we locate error? Yeah, use try-catch block!

### Usage
```bash
npm i try-catch-webpack-plugin -D
# or
yarn add try-catch-webpack-plugin -D
```
In your webpack.config.js:
```js
const TryCatchPlugin = require('try-catch-webpack-plugin');

config = {

    ...
    plugins: [new TryCatchPlugin({
        // default false. define whether wraps prd assets.(prd usually is minified)
        wrapperPrd: true, 

        // default like this. Define wrapper format. 
        // {{code}} indicates the final asset string. Always keep this pattern.
        wrapper: `try{{{code}}}catch(err){alert('err.message', err.message); err.stack && console.log('err.stack: ', err.stack);}`
    })],
    ...
}
```

Then in your bundle.js or chunk, you will see:
```js
try{(window.webpackJsonp=window.webpackJsonp||[]).push([[1],[,function(n,w,e){"use strict";e.r(w),w.default={name:1}}]]);}catch(err){alert('err.message', err.message); err.stack && console.log('err.stack: ', err.stack);}
```
all your code is wrappered by try-catch(or any formats you want).