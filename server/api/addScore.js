import User from '../Models/user';
const userEntity = new User();
export default function(author,addscore,cb){
    userEntity.getUser({
                name: author
            },(err,userresult)=>{
                if(err){
                    res.status(500).end('服务器错误');
                }
                User.update({
                    _id: userresult._id
                },{
                    $inc: {
                        score: addscore
                    }
                },err=>{
                    cb(err)
                })
            })
}