const express = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const {registerValidation,loginValidation} = require('../validation');

const router = express.Router();

router.post("/register", async (req, res) => {
let {name, email, password,role} = req.body;
    // validation 
const {error} = registerValidation(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});
const hashedPassword = bcrypt.hashSync (password, 10);
 // Check if user already exists
const existingUser = await User.findOne({email: email});
if (existingUser) 
    return res.status(400).json({error: "User already exists with that email"});

 // Save user to database

const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
    role: role  //default is user  
});
try {
    const savedUser = await user.save();
    console.log("done");
    res.status(201).json({status:"success",user:savedUser});
    // return;
    }
catch (err){
    // console.log(err);
    res.status(400).json({status:"failed",msg:"Failed to register user"});
    }
});

//login
router.post('/login',async (req,res)=>{
    const {email, password} = req.body;
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    const user = await User.findOne({email: email});
    if (!user) return res.status(400).json({error: "Invalid Email"});
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass){
        return res.status(400).json({error: "Invalid password"});}
    // generate token
    const token = jwt.sign({email: user}, process.env.TOKEN_SECRET,{expiresIn: '1h'});
    res.json({token});
    // res.header('auth-token',token).send(token);
})
module.exports = router;

