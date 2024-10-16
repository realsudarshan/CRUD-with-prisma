import express,{Request,Response} from 'express'
import { Router } from 'express'
import {prisma} from "../config/database.js"
import JSONbig from 'json-bigint'
export const router=Router();

router.get('/',async(req:Request,res:Response):Promise<any>=>{
    const users=await prisma.user.findMany();

    return res.send(JSONbig.stringify(users))

})
router.get('/id/:userid',async(req:Request,res:Response):Promise<any>=>{
    const {userid}=req.params;
    console.log(userid)

    try {
       const user=await prisma.user.findUnique({
        where:{
            id:userid
        }
       })
       res.send(JSONbig.stringify(user))
    } catch (error) {
        res.json({message:"no user found"})
        
    }

})
router.get('/name/:name',async(req:Request,res:Response):Promise<any>=>{
   try {
     const {name}=req.params;
     const users=await prisma.user.findMany({
         where:{
             name
         }
     })
     res.send(JSONbig.stringify(users))
   } catch (error) {
    res.json({message:"user not found"})
   }

})
router.get('/email/:email',async(req:Request,res:Response):Promise<any>=>{
    const {email}=req.params;
    try {
       const user=await prisma.user.findUnique({
        where:{
            email
        }
       })
       res.send(JSONbig.stringify(user))
    } catch (error) {
        res.json({message:"no user found"})
        
    }

})
router.post('/',async(req:Request,res:Response):Promise<any>=>{
try {
        const {name,email,password,contact,description,familymembers,DOB}=req.body;
        if(!name || !email || !password ||!DOB){
            return res.json({error:"Please enter necessary detail"})
        }
        
        const newUser=await prisma.user.create(
            {
                data:{
                    name,email,password,contact,description,familymembers,DOB
                }
            }
        )
        return res.status(200).send({message:"User created sucessfully"})
    
} catch (error) {
    return res.status(400).json({error:error})
    
}

})
router.put('/id/:userid',async(req:Request,res:Response):Promise<any>=>{
    const {userid}=req.params
    const { name, email, password, contact, description, familymembers, DOB } = req.body;
     
    try {
        const updatedUser=await prisma.user.update({
            where:{id:userid},
            data:{
                name,
                email,
                password,
                contact,
                description,
                familymembers,
                DOB

            }
        })
        res.send(JSONbig.stringify(updatedUser));
    } catch (error) {
        
        res.json({error:"something went wrong"})
        
    }

});

router.delete('id/:userid',async(req:Request,res:Response):Promise<any>=>{
   try {
     const {userid}=req.params
     const deletedUser=await prisma.user.delete({
         where:{id:userid}
     })
     res.send(JSONbig.stringify(deletedUser))
   } catch (error) {
    res.json(error);
    
   }
})
router.get('/like/:userid',async(req:Request,res:Response):Promise<any>=>{
    const {userid} =req.body;
    console.log(userid)
    try {
        const user=await prisma.user.findUnique({
            where:{
                id:userid
            },
            include:{
                like:true
            }
        })
        if(!user){
            return res.json({error:"User not found"});
            }
if(user.like){
    const postids=user.like.map((like)=>(like.postId))
    return res.json({postids:postids})
}
return res.json({message:"User dont liked any post"})

       

    } catch (err) {
        res.status(500).json(err)
        
    }
})

router.get('/comment/:userid',async(req,res):Promise<any>=>{
const{userid}=req.params;
if(!userid){return res.json({error:"Invalid userid"})}
try {
    const post=await prisma.user.findUnique({
        where:{
            id:userid
        },
        select:{
            comment:{
                select:{
                    id:true,
                    content:true,
                    post:{
                        select:{
                            id:true,
                            content:true
                        }
                    }
                }
            }
        }

    })
    return res.json(post)
} catch (error) {
    return res.json(error);
    
}
})
router.get('/follower/:id',async(req:Request,res:Response)=>{
    const {id}=req.body;
    try {
     const followers=await prisma.user.findMany({
        where:{
            following:{
               some:{followingid:id} 
            }
        },
        select:{
            id:true,
            name:true,
            email:true
        }
     })
     res.send(200).json(followers)   
    } catch (error) {
        res.send(500).json(error)
        
    }
})
router.get('/following/:id',async(req:Request,res:Response)=>{
    const {id}=req.body;
    try {
     const followings=await prisma.user.findMany({
        where:{
            follower:{
               some:{followerid:id} 
            }
        },
        select:{
            id:true,
            name:true,
            email:true
        }
     })
     res.send(200).json(followings)   
    } catch (error) {
        res.send(500).json(error)
        
    }
})