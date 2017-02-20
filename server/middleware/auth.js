const jwt = require("jwt-simple");

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
            return res.send('token err');
        }
    } else {
        return res.status(401).end('no token')
    }
    req.userName = name;
    next();
}