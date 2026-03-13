import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    authorId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    tags:{
        type:[],
        enum:["draft","published"],
        default:"draft"
    },
    status:{
        type:["draft","published"],
        required:true,
        default:"draft",
    },
    publishedAt:{
        type:Date
    }
},
{timestamps:true})

export default mongoose.model("Article",articleSchema)