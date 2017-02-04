const jwt = require("jwt-simple");
export default function(req,res,next){
    var token = req.body.access_token;
    if(token){
        try{
            var decoded = jwt.decode(token,req.app.get('jwtTokenSecret'));
            if(decoded.exp < Date.now()){
                res.end('token expired',401);
                return;
            }
        }catch(err){
            req.user = undefined;
            next();
        }
    } else{
        req.user == undefined;
        next();
    }
};