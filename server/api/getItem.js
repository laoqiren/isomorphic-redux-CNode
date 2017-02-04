import Express from 'express';
import qs from 'qs';
import Post from '../Models/post';
const postEntity = new Post();
export default function(req,res,next){
    const id = qs.parse(req.query).id;
    console.log(`请求id为${id}的详情页`)
    postEntity.get({
        id
    },(err,post)=>{
        if(err){
            res.status(500).end()
        }
        res.status(200).json(post)
    })
}