import express from 'express';
import path from 'path';
import qs from 'qs';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';


const app = new express();
const port = 3001;
const compiler = webpack(webpackConfig);

compiler.plugin('compilation',compilation=>{
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb)=> {
        webpackHotMiddleware(compiler).publish({ action: 'reload' });
        cb();
    });
});
app.use(webpackDevMiddleware(compiler,{
    noInfo:true,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: {
            colors: true,
            chunks: false
        },
     headers: {
         'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"
    },
    historyApiFallback: true
}));
app.use(express.static(path.join(__dirname,'../dist')))

app.use(webpackHotMiddleware(compiler,{
    path: '/__webpack_hmr'
}));

app.use('*',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next()
})

app.listen(port,err=>{
    if(err){
        console.error(err);
    } else {
        console.info(`the webpack server has been listened at port: ${port},haha`)
    }
})