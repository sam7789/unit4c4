
const jwt = require('jsonwebtoken');


require('dotenv').config();

const verifyToken = (token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token, process.env.SECRET, (err, decoded)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(decoded);
            }
        })
    })
}

const authenticate = async(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(400).send({message: "Authorization Token not found or incorect"})
    }
    if(!req.headers.authorization.startsWith("Bearer ")){
        return res.status(400).send({message: "Authorization Token not found or incorect"})
    }
    const token = req.headers.authorization.trim().split(" ")[1];

    var decoded;
    try {
        decoded = await verifyToken(token);
    } catch (error) {
        console.log(error);
        return res.status(400).send({message: "Authorization Token not found or incorect"});
    }
    console.log(decoded);
    req.userID = decoded.user._id;
    return next();
}

module.exports = authenticate;