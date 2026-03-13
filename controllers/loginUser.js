import User from "../models/user.model"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

export const loginUser =async (req,res)=>{
    try{
        const {email,password}= req.body;

        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        const user = await User.findOne({
            email
        })
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(400).json({messsage:"Invalid Credentials"})
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).json({token});
    }catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
}

