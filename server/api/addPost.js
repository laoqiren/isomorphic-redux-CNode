const jwt = require("jwt-simple");
import addScore from './addScore';
import Post from '../Models/post';

export default function(req,res,next){
    let postEntity = new Post();
    let name = req.userName;
    const post = {
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        author: name
    }
    postEntity.savePost(post,err=>{
        if(err){
            return res.status(500).end('服务器错误')
        } else {
            addScore(name,30,err=>{
                if(err){
                    res.status(500).end('加分失败')
                }
                return res.status(200).end('发表文章成功')
            })   
        }
    })
}