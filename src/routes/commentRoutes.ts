import express,{Request,Response} from 'express'
import JSONbig from 'json-bigint'
import {prisma} from "../config/database.js"
import { Router } from 'express'
export const router=Router();
router.post('/',async(req:Request,res:Response):Promise<any>=>{
const{userId,postId,content}=req.body;

//a creative new approch in checking null value and send message as needed
if(!userId ||!postId ||!content){
const missingFields=(Object.keys(req.body)).filter(key=>!req.body[key])
if (missingFields.length) {
    return res.json({ error: `${missingFields.join(", ")} is missing` });
  }
}
try{
const comment=await prisma.comment.create({
    data:{
        userId,
        postId,
        content

    }
})
return res.status(200).json(comment)
}catch(error){
    res.status(500).json(error)

}
})
router.delete('/',async(req:Request,res:Response):Promise<any>=>{
    const{commentid}=req.body;

//a creative new approch in checking null value and send message as needed
if(!commentid){
    return res.status(404).json({error:"No comment found"})
}
try{
    const deletedcomment=await prisma.comment.delete({
      where:{ id:commentid}
    })
    res.status(200).json(deletedcomment);
}
catch(error){
    res.status(500).json(error)
}
})


