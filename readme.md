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
const TryCatchPlugin = require('../index.js');

config = {

    ...
    plugins: [new TryCatchPlugin({
        wrapperPrd: true, // default false. define whether wrapper prd assets.
        wrapper: 'try{{{code}}}catch(err){alert(err.message)}' // default like this. define block format. {{code}} indicates the final asset string.
    })]
}
```
