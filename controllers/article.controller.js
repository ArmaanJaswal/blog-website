
import Article from '../models/article.model.js'

export const createArticle =async (req,res)=>{
    try{
        const {title,content,tags}= req.body;
        if(!title || !content){
            return res.status(400).json({message:"Title and Content are Required"});
        }

        const authorId = req.user;

        

        const article = await Article.create({
            title,
            content,
            tags:tags||[],
            authorId,
        })
        res.status(201).json({
            message:"Article Created Successfully",
            article
        });
        
    }catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const getArticles =async (req,res)=>{
    try{
        const articles =await Article.find().sort({createdAt:-1});
        if(articles.length===0){
            return res.status(404).json({message:"No article found"});
        }

        return res.status(200).json({message:"Articles fetched Successfully",articles});
    }catch(error){
        res.status(500).json({message:"InternaL Server Error"});
    }
}

export const getArticlesByID = async (req,res)=>{
    try{
        const userId = req.params.id;
    const articles = await Article.find({authorId:userId}).sort({createdAt: -1});

    if(articles.length===0){
        return res.status(404).json({message:"No Article Found"});
    }

    return res.status(200).json({message:"Articles fetched successfully",articles});
    }catch(error){
        return res.status(500).json({message:"Internal Server Error"});
    }
    
}


export const getSingleArticle = async(req,res)=>{
    try{
        const articleId = req.params.id;
        const article = await Article.findOne({_id:articleId});
        if(!article){
            return res.status(404).json({message:"No article Found"});
        }

        return res.status(200).json({message:"Article Fetched Successfully",article})
    }catch(error){
        return res.status(500).json({message:"Internal Server Error"});
    }


}


export const editArticle = async(req,res)=>{
    try{
        const articleId = req.params.id;
        const {title,content,tags}= req.body;

        const article =await Article.findById(articleId);

        if(!article){
            return res.status(404).json({message:"No Article Found"});
        }
        
        if(article.authorId.toString()!==req.user){
            return res.status(403).json({message:"You are not Authorized to Edit this Article"})
        }
        
        article.title = title || article.title;
    article.content = content || article.content;
    article.tags = tags || article.tags;

    await article.save();

        return res.status(200).json({message:"Article Updated Successfully"})
    }catch(error){
        return res.status(500).json({message:"Internal Server Error"})
    }
}


export const deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({
        message: "Article not found"
      });
    }

    
    if (article.authorId.toString() !== req.user) {
      return res.status(403).json({
        message: "You are not authorized to delete this article"
      });
    }

    
    await Article.findByIdAndDelete(articleId);

    return res.status(200).json({
      message: "Article deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};