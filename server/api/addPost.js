const jwt = require("jwt-simple");
import Post from '../Models/post';
const postEntity = new Post();
export default function(req,res,next){
    const token = req.body.access_token;
    let name;
    if(token){
        try{
            var decoded = jwt.decode(token,req.app.get('jwtTokenSecret'));
            if(decoded.exp < Date.now()){
                return res.end('token expired',401);
            }
            name = decoded.name;
        } catch(err){
            res.status(401);
            res.send('no token');
        }
    }
    const post = {
        title: req.body.title,
        content: req.body.content,
        author: name,
        discuss: []
    }
    postEntity.savePost(post,err=>{
        if(err){
            res.status(500).end('服务器错误')
        } else {
            res.status(200).end('发表文章成功')
        }
    })
}