import Post from '../Models/post';
import User from '../Models/user';
const userEntity = new User();
const postEntity = new Post();

export default function(req,res,next){
    postEntity.get({
        'flag':req.body.flag
    },(err,result)=>{
        
        if(err){
            return res.status(500).end('服务器错误')
        }
        let post = JSON.parse(JSON.stringify(result[0]))
        Post.update({
            _id: post._id
        },{
            $push: {
                votes: req.userName
            }
        },err=>{
            if(err){
                console.log('服务器错误')
                return res.status(500).end('服务器错误')
            }
            userEntity.getUser({
                name: post.author
            },(err,userresult)=>{
                if(err){
                    res.status(500).end('服务器错误');
                }
                User.update({
                    _id: userresult._id
                },{
                    $inc: {
                        score: 10
                    }
                },err=>{
                    if(err){
                        console.log('服务器错误')
                        return res.status(500).end('服务器错误')
                    }
                })
            })
            return res.status(200).end('点赞成功')
        })
    })
}