import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const registerUser= async(req,res)=>{
    try{
        const{name,email,username,password}= req.body;

        if(!name|| !email ||!username || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const existingUser = await User.findOne({
            $or:[{email},{username}]
        });

        if(existingUser){
            return res.status(400).json({message:"User Already Exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            username,
            password:hashedPassword
        });

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        res.status(201).json({
            message:"User Registered Successfully",
        token,
    user:{
        id:user._id,
        name:user.name,
        username:user.username,
        email:user.email
    }});
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
}
