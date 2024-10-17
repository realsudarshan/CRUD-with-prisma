import express,{Request,Response,Router} from 'express'
import JSONbig from 'json-bigint'
import {prisma} from '../config/database.js'
export const router=Router();
router.post('/:followingid',async(req:Request,res:Response):Promise<any>=>{
const {followerid}=req.body;
const {followingid}=req.params;
try{
    const follow=await prisma.follow.create({
        data:{
            followerid,followingid
        }
    })
    return res.status(200).json(follow)
}catch(error){
    return res.status(500).json(error);
}
})

router.delete('/:followingid',async(req:Request,res:Response):Promise<any>=>{
    const {followerid}=req.body;
    const {followingid}=req.params;
    try {
        const deletefollow=await prisma.follow.deleteMany({
            where:{followerid,followingid}
        })
        return res.status(200).json(deletefollow);
        }
     catch (error) {
        return res.status(500).json(error)

        
    }
})
