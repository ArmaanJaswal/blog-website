import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    articleId:{
        type:mongoose.Types.ObjectId,
        ref:"Article",
        required:true,
    },
},{timestamps:true})

bookmarkSchema.index(
    {userId:1,articleId:1},
    {unique:true}
)

export default mongoose.model("Bookmark",bookmarkSchema)    