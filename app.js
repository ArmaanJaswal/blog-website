import express from 'express'
import authRoutes from "./routes/authRoutes.js"
import connectDB from './config/db.js';
import dotenv from "dotenv"
dotenv.config()
const app = express();

const port = 3000;

connectDB();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/auth",authRoutes)


app.listen(port,()=>{
    console.log(`App is listening on port: ${port}`);
})
