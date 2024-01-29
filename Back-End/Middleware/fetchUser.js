const jwt = require('jsonwebtoken');
const USER_ACCESS_TOKEN = '5891247$%^$%CVDFVDFergergesry%^@4536'

const fetchUser = (req,res,next)=>{
    let token = req.headers["auth-token"];
    if(!token){
        res.status(403).json({success:false,message:"User Token missing"})
    }
    try {
       let data = jwt.verify(token,USER_ACCESS_TOKEN)
    //    console.log(data);
        req.user = data.id
        next();
    } catch (error) {
        res.status(401).send({error : 'Use Valid Token'})
    }
}

module.exports = fetchUser;