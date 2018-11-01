/*
* @Author: 谭智轩
* @Date:   2018-09-19 16:30:15
* @Last Modified by:   谭智轩
* @Last Modified time: 2018-09-19 17:39:00
* @email: zhixuan.tan@qunar.com
*/
var fs = require('fs');
var path = require('path');



class OfflinePlugin {

    constructor(config = {
        cacheName: 'default'
    }) {
        this.cacheName = config.cacheName;
    }
    apply(compiler) {
        compiler.hooks.done.tapAsync(
            'create-service-worker',
            (stats, callback) => {
                var filePrefix = stats.compilation.outputOptions.path;
                var fileList = [];
                var assets = stats.compilation.assets;
                for (var file in assets) {
                    fileList.push({
                        name: file,
                        path: assets[file].existsAt.replace(filePrefix, '')
                    });
                }

                
                var listStr = `"${fileList.map(file => file.path).join('","')}"`;
                var service = fs.readFileSync(path.resolve(__dirname, 'template/service-worker.js')).toString()
                    .replace('{{CACHE_NAME}}', this.cacheName)
                    .replace('{{urlsToCache}}', listStr);
                fs.writeFileSync(path.join(filePrefix, 'sw.js'), service);
                callback();
            }
        );
    }



}

module.exports = OfflinePlugin;
