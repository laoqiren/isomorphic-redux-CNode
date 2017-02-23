
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');
const path = require('path');
const publicPath = process.env.NODE_ENV === 'production'?'/dist/':'http://localhost:3001/public/';
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
    entry:[
        'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr',
        './client/index.js'
    ],
    output:{
        path: `${__dirname}/../assets/dist`,
        publicPath: publicPath,
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
            /*
            {
                test:/\.less$/,
                loaders: ['style-loader','css-loader','less-loader']
            }*/
            
            {
                test: webpack_isomorphic_tools_plugin.regular_expression('images'),
                loader: 'url-loader?limit=10240', // any image below or equal to 10K will be converted to inline base64 instead
            }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        webpack_isomorphic_tools_plugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.BannerPlugin("This file is created by Luo Xia")
    ]
}