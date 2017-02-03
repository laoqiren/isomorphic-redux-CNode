import express from 'express';
import path from 'path';
import qs from 'qs';
import apiRouter from './router/route'

import handleRender from './render';


const app = new express();
const port = 3000;

app.use('/api',apiRouter);
app.use(handleRender);

app.listen(port,err=>{
    if(err){
        console.error(err);
    } else {
        console.info(`the express server has been listened at port: ${port},haha`)
    }
})