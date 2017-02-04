import qs from 'qs';
import Post from '../Models/post';
const postEntity = new Post();

export default function(req,res,next){
    const author = qs.parse(req.query).author;
    console.log(`请求作者:${author}的文章`)
    postEntity.get({
        author
    },(err,posts)=>{
        if(err){
            res.status(500).end('服务器错误');
        } 
        res.status(200).json(posts);
    })
}