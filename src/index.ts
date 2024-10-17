import express, { Application,Request,Response } from 'express'
import {router as userRoutes} from './routes/userRoutes.js'
import {router as postRoutes} from './routes/postRoutes.js'
import {router as likeRoutes} from './routes/likeRoutes.js'
import {router as CommentRoutes} from './routes/commentRoutes.js'
import {router as followRoutes} from './routes/folllowRoutes.js'
const app:Application=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api/user',userRoutes)
app.use('/api/post',postRoutes)
app.use('/api/like',likeRoutes)
app.use('/api/comment',CommentRoutes)
app.use('/api/follow',followRoutes)
app.get("/",async (req:Request,res:Response):Promise<any>=>{
    return res.json({message:"Running sucessfully"})
})

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})