<<<<<<< HEAD
=======
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf.js');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = merge(webpackBaseConfig, {
//  entry: {
//      main: './src/index.js'
//  },
	entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../lib'),
        publicPath: '/lib/',
        filename: 'tap-ui.js',
        library: 'tap-ui',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        chunkFilename: '[id].[chunkhash].js'  
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    plugins: [
        // @todo
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
//      new CompressionPlugin({
//          asset: '[path].gz[query]',
//          algorithm: 'gzip',
//          test: /\.(js|css)$/,
//          threshold: 10240,
//          minRatio: 0.8
//      }),
        new ExtractTextPlugin('style.css'),
        new CleanWebpackPlugin('[lib]')
    ]
});
>>>>>>> 872cf5ce31f75fc02ef790c3351bc7dd6b02088f
