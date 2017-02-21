import User from '../Models/user';
const userEntity = new User();
export default function(req,res,next){
    console.log(req.body.author)
    userEntity.getUser({name:req.body.author},(err,user)=>{
        if(err){
            return res.status(500).end('服务器错误');
        }
        console.log(user)
        res.status(200).json(user)
    })
}