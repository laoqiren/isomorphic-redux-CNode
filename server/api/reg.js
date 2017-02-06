const crypto = require('crypto');
const jwt = require("jwt-simple");
const moment = require('moment');
import User from '../Models/user';
const userEntity = new User();

export default function(req,res,next){
    let name = req.body.name,
        passwd = req.body.passwd,
        md5 = crypto.createHash('md5');
    passwd = md5.update(passwd).digest('hex');
    userEntity.getUser({
        name
    },(err,user)=>{
        if(err){
            return res.status(500).end('服务器错误');
        }
        if(user){
            return res.status(500).end('该账号已经有人注册!');
        }
        userEntity.saveUser({
            name,
            passwd
        },err=>{
            if(err){
                return res.status(500).end()
            }
            var expires = moment().add(7,'days').valueOf();
            var token = jwt.encode({
                name,
                exp: expires
            }, req.app.get('jwtTokenSecret'));
            return res.status(200).json(token);
        })
        
    })
}