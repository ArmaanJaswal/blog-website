import express from 'express'
import { tokenVerify } from '../middlewares/jwtverify';
import { getArticles } from '../controllers/article.controller.js';
import { getArticlesByID } from '../controllers/article.controller.js';

const router = express.Router();

router.post("/articles",tokenVerify,createArticle);

router.get("/articles",getArticles);

router.get("/article/:id",tokenVerify,getArticlesByID);