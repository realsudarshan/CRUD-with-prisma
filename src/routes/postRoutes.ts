import express from 'express'
import { Router,Request,Response } from 'express'
import { prisma } from '../config/database.js';
import JSONbig from 'json-bigint'
export const router=Router();

router.post("/",async(req:Request,res:Response):Promise<any>=>{
    
try {
        const{authorid,content}=req.body;
        const newpost=await prisma.post.create({
            data:{content,authorid}
        })
      return  res.send(JSONbig.stringify(newpost));
    
} catch (error) {
return    res.send(error);
    
}
})
router.get("/",async(req:Request,res:Response):Promise<any>=>{
    try {
        const posts=await prisma.post.findMany({
            include:{author:true}
        });
        
        res.send(`<pre style="font-size:25px;color:red;">${JSONbig.stringify(posts,null,1)}</pre>`)
    } catch (error) {
        res.json(error)
    }

}
)

router.get("/id/:id",async (req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const post=await prisma.post.findUnique({
            where:{id},
            include:{
                author:true
            }
        })

        post?res.status(200).send(JSONbig.stringify(post)):res.status(404).json({error:"post not found"})
    } catch (error) {
        res.status(500).json(error)
        
    }
    

})

router.put('/id/:id',async(req:Request,res:Response):Promise<any>=>{
   try {
    const {id}=req.params;
     const {content}=req.body;
     if(!content){
        return res.json({error:"Please enter content"})
     }
     const updatedpost=await prisma.post.update({
         where:{id},
         data:{
             content
         },
         include:{author:true}
     })
     return res.status(200).send(JSONbig.stringify(updatedpost))
   } catch (error) {
    return res.json(error)
    
   }
})

 router.delete('/id/:id',async(req:Request,res:Response):Promise<any>=>{
    const {id}=req.params;
    try {
        const deleteduser=await prisma.post.delete({
            where:{id},
            include:{author:true}
        })
        return res.status(200).send(JSONbig.stringify(deleteduser))
    } catch (error) {
        res.status(500).json(error);
        
    }
 })
 router.get('/id/:id/author',async(req:Request,res:Response):Promise<any>=>{
    const {id}=req.params;
    try{
        const post=await prisma.post.findUnique({
            where:{id},
            include:{author:true}
        })
        post?res.status(200).json({name:post.author.name}):res.status(404).json({error:"post not found"})
    }
    catch(error){
res.json(error)
    }
})

// Search post
    
router.post('/search',async(req:Request,res:Response):Promise<any>=>{
    const {searchterm}=req.body;
    try{
        const post=await prisma.post.findMany({
            where:{content:{
                contains:searchterm,
                mode:"insensitive"
            }},
            include:{author:true}
        })
        return res.send(JSONbig.stringify(post));
    }
    catch(error){
        return res.json(error)
    }
})
router.get('/like/:postid',async(req:Request,res:Response):Promise<any>=>{
    const{postid}=req.params;
    console.log(postid)
    try {
        const post=await prisma.post.findUnique({
            where:{
                id:postid
            },
            include:{
                like:true
            }

        })

        if(!post){
            res.json({error:"post not found"})
        }
        if(post && post.like){
            const usersids=post.like.map((like)=>like.userId)
            return res.json({Userids:usersids})
        }
    } catch (err) {
        res.json(err)
        
    }
})


 
