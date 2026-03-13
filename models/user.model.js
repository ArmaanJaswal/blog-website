import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        default:"",
    },
    avatar:{
        type:String,
        deafult:""
    }
},{timestamps:true});

export default mongoose.model("User",userSchema)
