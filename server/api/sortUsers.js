import User from '../Models/user';
const userEntity = new User();
export default function(req,res,next){
    userEntity.getUser(null,(err,users)=>{
        if(err){
            return res.status(500).end('服务器错误');
        }
        let result = users.sort((a,b)=>{
            return a.score < b.score
        })
        return res.status(200).json(result.slice(0,10))
    })
}