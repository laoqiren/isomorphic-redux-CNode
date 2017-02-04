import express from 'express';
import path from 'path';
import qs from 'qs';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import apiRouter from './router/route'

import handleRender from './render';


const app = new express();
const port = 3000;

app.set('jwtTokenSecret',"LuoXia");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api',apiRouter);
app.use(handleRender);

app.listen(port,err=>{
    if(err){
        console.error(err);
    } else {
        console.info(`the express server has been listened at port: ${port},haha`)
    }
})