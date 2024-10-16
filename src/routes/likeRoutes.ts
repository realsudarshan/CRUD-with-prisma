import express,{Request,Response} from 'express'
import JSONbig from 'json-bigint'
import {prisma} from "../config/database.js"
import { Router } from 'express'
export const router=Router();
router.get('/post/:postid',async(req:Request,res:Response):Promise<any>=>{
    const {postid}=req.params;
    const {userid}=req.body;
    try {
        const post=await prisma.post.findUnique({
            where:{id:postid}
        })
        if(!post){
            return res.json({error:"post not found"})
        }
        const existinglike=await prisma.like.findUnique({
            where:{
              userId_postId:{
                userId:userid,
                postId:postid
              }
            }
        })
        if(existinglike){
            return res.json({error:"Already liked this post by this user"})
        }
        const like = await prisma.like.create({
            data: {
              userId:userid,
              postId:postid
            },
          });
res.json(like);


    } catch (error) {
        return res.json(error)
    }
})
router.delete('post/:postid'),async(req:Request,res:Response):Promise<any>=>{
    const{postid}=req.params;
    const {userid}=req.body;
    try{
        const post=await prisma.post.findUnique({
            where:{id:postid}
        })
        if(!post){
           return res.status(404).json({error:"Post not found"})
        }
        const existinglike=await prisma.like.findUnique({
            where:{
                userId_postId:{
                    userId:userid,
                    postId:postid
                }
            }
        })
        if(!existinglike){
            return res.status(404).json({error:"like not founnd"})
        }
        const deletelike=await prisma.like.delete({
            where:{
                id:existinglike.id
            }

        })
        return res.json(deletelike)
    }
    catch(error){
        return res.json(error);

    }

}