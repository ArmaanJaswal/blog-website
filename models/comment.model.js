import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    articleId:{
        type:mongoose.Types.ObjectId,
        ref:"Article",
        required:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})

export default mongoose.model("Comment",commentSchema)  