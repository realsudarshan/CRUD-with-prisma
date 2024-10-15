import express, { Application,Request,Response } from 'express'
import {prisma} from './config/database.js'
import JSONbig from 'json-bigint'
const app:Application=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/",async (req:Request,res:Response):Promise<any>=>{
    return res.json({message:"Running sucessfully"})
})
app.get("/getdata",async(req:Request,res:Response):Promise<any>=>{
    const users=await prisma.user.findMany();

    return res.send(JSONbig.stringify(users))

})
app.get('getdata/id/:id',async(req:Request,res:Response):Promise<any>=>{
    const {id}=req.params;
    try {
       const user=await prisma.user.findUnique({
        where:{
            id
        }
       })
       res.send(JSONbig.stringify(user))
    } catch (error) {
        res.json({message:"no user found"})
        
    }

})
app.get('getdata/name/:name',async(req:Request,res:Response):Promise<any>=>{
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
app.get('getdata/email/:email',async(req:Request,res:Response):Promise<any>=>{
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
app.post("/postdata",async(req:Request,res:Response):Promise<any>=>{
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
app.put("/updatedata/:id",async(req:Request,res:Response):Promise<any>=>{
    const {id}=req.params
    const { name, email, password, contact, description, familymembers, DOB } = req.body;
     
    try {
        const updatedUser=await prisma.user.update({
            where:{id},
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

app.delete("/deletedata/:id",async(req:Request,res:Response):Promise<any>=>{
   try {
     const {id}=req.params
     const deletedUser=await prisma.user.delete({
         where:{id}
     })
     res.send(JSONbig.stringify(deletedUser))
   } catch (error) {
    res.json(error);
    
   }
})
app.listen(3000,()=>{
    console.log("Server running on port 3000")
})