import Express from 'express';
import qs from 'qs';
import User from '../Models/user';
const userEntity = new User();

export default function(req,res,next){
    let name = req.body.name,
        passwd = req.body.password,
        md5 = crypto.createHash('md5');
    passwd = md5.update(password).digest('hex');
    userEntity.getUser({
        name
    },(err,user)=>{
        if(err){
            res.status(500).end();
        }
        if(user){
            res.status(500).end('该账号已经有人注册!');
        }
        userEntity.saveUser({
            name,
            passwd
        },err=>{
            if(err){
                res.status(500).end()
            }
            var expires = moment().add(7,'days').valueOf();
            var token = jwt.encode({
                name: name,
                exp: expires
            }, req.app.get('jwtTokenSecret'));
            res.status(200).json(token);
        })
        
    })
}