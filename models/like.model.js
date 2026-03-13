import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    articleId: {
      type: mongoose.Types.ObjectId,
      ref: "Article",
      required: true
    }
  },
  { timestamps: true }
);


likeSchema.index(
  { userId: 1, articleId: 1 },
  { unique: true }
);

export default mongoose.model("Like", likeSchema);
