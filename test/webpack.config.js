var TryCatchPlugin = require('../index.js');
var path = require('path');


module.exports = {
    mode: 'production',
    target: 'web',
    context: path.resolve(__dirname),
    entry: {
        main: path.resolve(__dirname, 'index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: 'bundle.[name].js',
        chunkFilename: 'chunk.[name].js'
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-syntax-dynamic-import']
                }
            }
        ]
    },
    plugins: [
        new TryCatchPlugin({
            cacheName: 'test',
            wrapperPrd: true
        })
    ]
};

