var offlinePlugin = require('../src/index.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');


module.exports = {
    mode: 'development',
    target: 'web',
    context: path.resolve(__dirname),
    entry: {
        main: path.resolve(__dirname, 'index.jsx'),
        react: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: 'js/bundle.[name].js'
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /jsx/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            
            cacheGroups: {
                react: {
                    chunks: 'all',
                    test: /react\//,
                    name: 'react_node'
                },
                dom: {
                    chunks: 'all',
                    test: /react-dom/,
                    name: 'react-dom'
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
        new offlinePlugin({
            cacheName: 'test'
        })
    ]
};

