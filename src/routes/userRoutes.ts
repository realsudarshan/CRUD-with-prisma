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
router.post("/",async(req:Request,res:Response):Promise<any>=>{
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
router.put("/id/:userid",async(req:Request,res:Response):Promise<any>=>{
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

router.delete("id/:userid",async(req:Request,res:Response):Promise<any>=>{
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


