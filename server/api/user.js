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
            return res.status(401);
            return res.send('no token');
        }
    }
    const userEntity = new User();
    userEntity.getUser({
        name
    },(err,user)=>{
        if(user){
            return res.status(200).json(user)
        } else {
            return res.status(404).end()
        }
    })
}