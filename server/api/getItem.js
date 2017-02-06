import qs from 'qs';
import Post from '../Models/post';
const postEntity = new Post();
export default function(req,res,next){
    const id = qs.parse(req.query).id;
    postEntity.get({
        id
    },(err,post)=>{
        if(err){
            return res.status(500).end('服务器错误')
        }
        return res.status(200).json(post)
    })
}