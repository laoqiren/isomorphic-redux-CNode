import Express from 'express';
import qs from 'qs';
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
        author: req.body.author,
        discuss: []
    }
    postEntity.savePost(post,err=>{
        if(err){
            res.status(500).end()
        } else {
            res.status(200).end()
        }
    })
}