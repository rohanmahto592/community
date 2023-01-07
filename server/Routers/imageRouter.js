const express=require('express')
const router=express.Router();
const imagemodel=require('../models/imageModel')
router.post('/',async (req,res)=>{
    const body=req.body;
    try{
        const article= await new imagemodel(body);
     article.save()
     res.send('images added')

    }
    catch(err)
    {
        res.send('err');
    }
    
})
router.get('/',async(req,res)=>{
    try{
        const data=await imagemodel.find().populate('created_by',"userName imageUrl about rating").exec();
        res.send(data)
    }
    catch(err)
    {
        res.send('not found pin')
    }
})
router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    const data=await imagemodel.findById(id).exec();
    res.send(data)
})
router.put('/:id',async(req,res)=>{
    const data=req.body;
    
    const id=req.params.id
    const value=await imagemodel.updateOne({ "_id":id},{ "$push": { "comment_info": data } }, { "new": true, "upsert": true }).exec()
    res.send('updated comment')

})
router.put('/update/vote/:id/:likeid',async(req,res)=>{
    const id=req.params.id;
    const likeid=req.params.likeid
    const data=await imagemodel.updateOne({ "_id":id},{ "$push": { "upvote": likeid } }, { "new": true, "upsert": true }).exec()
})
router.delete('/:id',(req,res)=>{
    const id=req.params.id
    imagemodel.findByIdAndDelete({_id:id}).exec()
})
module.exports=router