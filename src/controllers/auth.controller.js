const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user)=>{
    return jwt.sign({user},process.env.SECRET);
}


const register = async (req,res)=>{
    try {
        let user = await User.findOne({email: req.body.email});
        // check if user already exist..
        if(user){
            return res.status(400).send({message: "Email Already exist"});
        }
        // if user not exist, we will create user
        user = await User.create(req.body);

        const token = generateToken(user);
        return res.status(200).send({user, token});

    } catch (error) {
        return res.status(400).send({message: error.message});
    }
}

const login = async (req,res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        // check if user not exist..
        if(!user){
            return res.status(400).send({message: "Wrong Email or Password"});
        }
        // if user exist then check passwords
        let match; 
        if(req.body.password == user.password){
            match = true;
        }
        else{
            match = false;
        }
        if(!match){
            return res.status(400).send({message: "Authorization Token not found or incorect"})
        }
        const token = generateToken(user);
        return res.status(200).send({user,token});
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
}

module.exports = {register,login};