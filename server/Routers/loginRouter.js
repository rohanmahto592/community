const express=require('express');
const { Mongoose, default: mongoose } = require('mongoose');
const router=express.Router();
const usermodel=require('../models/userModel')
router.post('/',(req,res)=>{
    const body=req.body;
    
    const users= new usermodel(body)
    users.save(()=>{
        res.send('true')
    })
})
router.put('/savepin/:id/:pinId',async(req,res)=>{
    const id=req.params.id;
    const pinId=req.params.pinId;
    
    await usermodel.updateOne({ "_id":id},{ "$push": { "savepin": pinId } }, { "new": true, "upsert": true }).exec()


})
router.put('/removemany/:id',async(req,res)=>{
    const id=req.params.id;
   
    await usermodel.updateMany({},{"$pull": { "savepin": id }},{ "new": true, "upsert": true }).exec()
    
})
router.put('/removepin/:id/:userid',async(req,res)=>{
    const id=req.params.id;
    const userid=req.params.userid;
    await usermodel.updateOne({'_id':userid},{"$pull": { "savepin": id }},{ "new": true, "upsert": true }).exec()
    
})
router.put('/rating/:id/:value',async(req,res)=>{
    const id=req.params.id;
    const value=req.params.value;
    
    await usermodel.updateOne({'_id':id},{ "$push": { "rating": value } }, { "new": true, "upsert": true }).exec()

})
router.put('/about/:id',async(req,res)=>{
    const body=req.body;
    
    const id=req.params.id;
    
    const update = { about: body.data };

    const users= await usermodel.findByIdAndUpdate(id,update,{
        new: true
      }).exec();
})
router.put('/github/:id',async(req,res)=>{
    const body=req.body;
    const id=req.params.id;
    
    const update = { github: body.data };

    const users= await usermodel.findByIdAndUpdate(id,update,{
        new: true
      }).exec();
})
router.put('/linkd/:id',async(req,res)=>{
    const body=req.body;
    const id=req.params.id;
   
    const update = { linkedln: body.data };

     await usermodel.findByIdAndUpdate(id,update,{
        new: true
      }).exec();
})
router.put('/twitter/:id',async(req,res)=>{
    const body=req.body;
    const id=req.params.id;
    
    const update = { twitter: body.data };

     await usermodel.findByIdAndUpdate(id,update,{
        new: true
      }).exec();
})

router.put('/leetcode/:id',async(req,res)=>{
    const body=req.body;
    const id=req.params.id;
    
    const update = { leetcode: body.data };

     await usermodel.findByIdAndUpdate(id,update,{
        new: true
      }).exec();
})
router.put('/gfg/:id',async(req,res)=>{
    const body=req.body;
    const id=req.params.id;
    
    const update = { gfg: body.data };

     await usermodel.findByIdAndUpdate(id,update,{
        new: true
      }).exec();
})
router.put('/codeforces/:id',async(req,res)=>{
    const body=req.body;
    const id=req.params.id;
    
    const update = { codeforces: body.data };

     await usermodel.findByIdAndUpdate(id,update,{
        new: true
      }).exec();
})
router.put('/codechef/:id',async(req,res)=>{
    const body=req.body;
    const id=req.params.id;
    
    const update = { codechef: body.data };

     await usermodel.findByIdAndUpdate(id,update,{
        new: true
      }).exec();
})
router.get('/:id',async(req,res)=>{
    const id=req.params.id;

    const data= await usermodel.findOne({'_id':id}).exec();
   res.send(data)
})
router.get('/current/:id',async(req,res)=>{
    const id=req.params.id;

    const data= await usermodel.findOne({'googleId':id}).exec();
   res.send(data)
})
router.put('/update/:id',async(req,res)=>{
    const id=req.params.id;
    const image=req.body;
   
    await  usermodel.findByIdAndUpdate(id,{imageUrl:image.data},{
        new: true
      }).exec()
})
router.put('/background/:id',async(req,res)=>{
    const id=req.params.id;
    const body=req.body;

    const update = { backgroundImage:body.data };
    await usermodel.findByIdAndUpdate(id,update,{
        new: true
      }).exec()
})
router.delete('/delbackground/:id',async(req,res)=>{
    const id=mongoose.Types.ObjectId(req.params.id);
    await usermodel.updateOne({_id:id},{ $unset: { backgroundImage: 1 } })
})
module.exports=router