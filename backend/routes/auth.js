const express = require("express");
const router = express.Router();
const User = require("../model/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserInfo = require("../model/Info.js")


// SUBMIT USER INFORMATION

router.post("/submit-info", async(req,res)=>{

try{

const {Fullname,mobile,email,address} = req.body;

const newUserInfo = new UserInfo({

Fullname,
mobile,
email,
address

});

await newUserInfo.save();

res.json({
msg:"User information saved successfully"
});

}catch(error){

res.status(500).json({
error:error.message
});

}

});


// CREATE ADMIN (Only One)

router.post("/create-admin", async (req,res) => {

try{

const adminExists = await User.findOne({ role: "admin" });

if(adminExists){
return res.status(400).json({ msg: "Admin already exists" });
}

const { name, email, password } = req.body;

const hashedPassword = await bcrypt.hash(password,10);

const admin = new User({
name,
email,
password: hashedPassword,
role: "admin"
});

await admin.save();

res.status(201).json({ msg: "Admin created successfully" });

}catch(err){

res.status(500).json({ error: err.message });

}

});


// SIGNUP

router.post("/signup", async (req,res) => {

try{

const { name, email, mobile, password } = req.body;

const userExists = await User.findOne({ email });

if(userExists){
return res.status(400).json({ msg: "User already exists" });
}

const hashedPassword = await bcrypt.hash(password,10);

const user = new User({
name,
email,
mobile,
password: hashedPassword
});

await user.save();

res.status(201).json({ msg: "User created successfully" });

}catch(err){

res.status(500).json({ error: err.message });

}

});


// LOGIN

router.post("/login", async (req,res) => {

try{

const { email, password } = req.body;

const user = await User.findOne({ email });

if(!user){
return res.status(404).json({ msg: "User not found" });
}

const match = await bcrypt.compare(password, user.password);

if(!match){
return res.status(400).json({ msg: "Invalid password" });
}

const token = jwt.sign(

{ id: user._id, role: user.role },

process.env.JWT_SECRET,

{ expiresIn: "1d" }

);

res.json({
token,
role: user.role
});

}catch(err){

res.status(500).json({ error: err.message });

}

});
// ===============================
// GET ALL USER INFO (Admin)
// ===============================

router.get("/all-users", async (req, res) => {

try{

const users = await UserInfo.find();

res.json(users);

}catch(error){

res.status(500).json({
error:error.message
});

}

});


module.exports = router;