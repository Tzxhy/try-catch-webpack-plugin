/*
* @Author: 谭智轩
* @Date:   2018-09-19 16:30:15
* @Last Modified by:   谭智轩
* @Last Modified time: 2018-11-02 11:03:39
* @email: zhixuan.tan@qunar.com
*/
const fs = require('fs');
const path = require('path');

class TryCatchPlugin {

    constructor({
        cacheName = 'wrapper-bundle',
        wrapperPrd = false,
        wrapper = `try{{{code}}}catch(err){alert('err.message', err.message); err.stack && console.log('err.stack: ', err.stack);}`
    }) {
        this.cacheName = cacheName;
        this.wrapperPrd = wrapperPrd;
        this.wrapperFormat = wrapper.split('{{code}}');
    }
    apply(compiler) {
        compiler.hooks.emit.tapAsync(
            'wrapper-bundle',
            (compilation, callback) => {
                debugger;
                const assets = compilation.assets;
                for (const asset in assets) {
                    // self property and end-with-js asset
                    if (assets.hasOwnProperty(asset) && /\.js$/.test(asset)) {
                        const realAsset = assets[asset];
                        if (realAsset._source) { // not prd
                            realAsset._source.children.unshift(this.wrapperFormat[0]);
                            realAsset._source.children.push(this.wrapperFormat[1]);
                        } else if (this.wrapperPrd && realAsset._value) { // prd
                            realAsset._value = this.wrapperFormat[0] + realAsset._value + this.wrapperFormat[1];
                        }
                    }
                }
                callback();
            }
        );
    }



}

module.exports = TryCatchPlugin;
