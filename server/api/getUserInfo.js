import User from '../Models/user';
const userEntity = new User();
export default function(req,res,next){
    userEntity.getUser({name:req.body.author},(err,user)=>{
        if(err){
            return res.status(500).end('服务器错误');
        }
        if(user){
           return res.status(200).json({name:user.name,score:user.score})
        }
        return res.status(404).end();
    })
}