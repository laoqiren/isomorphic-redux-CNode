const jwt = require("jwt-simple");
import Post from '../Models/post';
const postEntity = new Post();
export default function(req,res,next){
    const comment = {
        content: req.body.content,
        author: req.body.author
    }
    postEntity.get({
        'flag':req.body.flag
    },(err,result)=>{
        let post = JSON.parse(JSON.stringify(result[0]))
        if(err){
            return res.status(500).end('服务器错误')
        }
        Post.update({
            _id: post._id
        },{
            $push: {
                discussion: comment
            }
        },err=>{
            if(err){
                console.log('服务器错误')
                return res.status(500).end('服务器错误')
            }
            return res.status(200).end('评论成功')
        })
    })
}