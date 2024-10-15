import express, { Application,Request,Response } from 'express'
import {router as userRoutes} from './routes/userRoutes.js'

const app:Application=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api/user',userRoutes)
app.get("/",async (req:Request,res:Response):Promise<any>=>{
    return res.json({message:"Running sucessfully"})
})

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})