const jwt = require("jwt-simple");
import User from '../Models/user'

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
    const userEntity = new User();
    userEntity.getUser({
        name
    },(err,user)=>{
        if(user){
            res.status(200).json(user)
        } else {
            res.status(404).end()
        }
    })
}