
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');
const path = require('path');

const webpack_isomorphic_tools_plugin = 
  new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration'))
  .development()

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/../client/index.html`,
    filename: 'index.html',
    inject: true
});

module.exports = {
    context: path.join(__dirname,'..'),
    entry: ['./client/index.js'],
    output:{
        path: `${__dirname}/../assets/dist`,
        publicPath: '/dist/',
        filename: '[name].[hash].js'
    },
    module: {
        loaders: [
            {
                test:/\.jsx?$/,
                loaders: ["react-hot-loader","babel-loader"],
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                loaders: ['style-loader','css-loader']
            },
            {
                test:/\.scss$/,
                loaders: ['style-loader','css-loader','sass-loader']
            },
            {
                test: webpack_isomorphic_tools_plugin.regular_expression('images'),
                loader: 'url-loader?limit=10240', // any image below or equal to 10K will be converted to inline base64 instead
            }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        webpack_isomorphic_tools_plugin,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.BannerPlugin("This file is created by Luo Xia")
    ]
}