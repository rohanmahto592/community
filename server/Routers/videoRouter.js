const express=require('express')
const router=express.Router();
const videomodel=require('../models/videoModel')
router.post('/',async (req,res)=>{
    const body=req.body;
    try{
        const article= await new videomodel(body);
     article.save()
     res.send('videos added')

    }
    catch(err)
    {
        res.send('err');
    }
    
})
router.get('/savepin/:item',async(req,res)=>{
    const id=req.params.item;
    
    try{
        const pin=await videomodel.findById(id).populate('created_by','userName imageUrl about rating').exec();
        res.send(pin);

    }
    catch(err)
    {
        res.send({})
    }
    
})
router.get('/',async(req,res)=>{
    const videos=await videomodel.find().sort('-created_At').populate('created_by','userName imageUrl about rating').exec();
    res.send(videos)
})
router.get('/category/:category',async(req,res)=>{
    const vote=req.params.category;
    if(vote==='Date')
    {
        try{
           
            const data=await videomodel.find().sort('-created_At').populate('created_by','userName imageUrl about rating').exec();
            res.send(data);
        }
        catch(err)
        {
            res.send(err);
        }

    }
    else
    {
    const filterdata=await videomodel.find().populate('created_by','userName imageUrl about rating').sort(`-${vote.length}`).exec();
        
        res.send(filterdata)
    }
   
})
router.put('/update/vote/:id/:likeid',async(req,res)=>{
    const id=req.params.id;
    const likeid=req.params.likeid
    await videomodel.updateOne({ "_id":id},{ "$push": { "upvote": likeid } }, { "new": true, "upsert": true }).exec()
})
router.put('/update/like/:id/:likeid',async(req,res)=>{
    const id=req.params.id;
    const likeid=req.params.likeid
    await videomodel.updateOne({ "_id":id},{ "$push": { "likes": likeid } }, { "new": true, "upsert": true }).exec()
})
router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await videomodel.findByIdAndDelete({ _id: id }).exec();
    }
    catch(err)
    {
        res.send(err);
    }
})
module.exports=router