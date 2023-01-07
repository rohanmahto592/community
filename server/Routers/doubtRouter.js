const express=require('express')
const router=express.Router();
const doubtmodel=require('../models/doubtModel')
router.post('/', (req,res)=>{
    const body=req.body;
    try{
        const article= new doubtmodel(body);
     article.save()
     res.send('doubt added')

    }
    catch(err)
    {
        res.send('err');
    }
    
})
router.put('/:id',async(req,res)=>{
    const data=req.body;
    console.log(data)
    const id=req.params.id
    const value=await doubtmodel.updateOne({ "_id":id},{ "$push": { "comment_info": data } }, { "new": true, "upsert": true }).exec()
    res.send('updated comment')

})
router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        const data=await doubtmodel.findByIdAndDelete({ _id: id }).exec();
    }
    catch(err)
    {
        res.send(err);
    }
})
router.get('/',async(req,res)=>{
    try{
        const doubts=await doubtmodel.find().sort('-Date').populate('created_by','about imageUrl userName _id rating').exec()
        res.send(doubts);
    }
    catch(err)
    {
        res.send(err)
    }
})
router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    const data=await doubtmodel.findById(id).exec();
    res.send(data)
})
router.put('/update/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const filter = { _id: id };
        const update = { doubt:'resolved' };
       const data= await doubtmodel.findOneAndUpdate(filter, update, {
            new: true
          })
          res.send('updated doubt')
    }
    catch(err)
    {
        res.send(err);
    }
})
router.put('/update/vote/:id/:likeid',async(req,res)=>{
    const id=req.params.id;
    const likeid=req.params.likeid
    const data=await doubtmodel.updateOne({ "_id":id},{ "$push": { "upvote": likeid } }, { "new": true, "upsert": true }).exec()
})
router.put('/update/like/:id/:likeid',async(req,res)=>{
    const id=req.params.id;
    const likeid=req.params.likeid
    const data=await doubtmodel.updateOne({ "_id":id},{ "$push": { "likes": likeid } }, { "new": true, "upsert": true }).exec()
})
router.get('/categories/:category',async(req,res)=>{
    const category=req.params.category;
    console.log(" category",category)
    if(category==='Date')
    {
        try{
           
            const data=await doubtmodel.find().sort('-Date').populate('created_by','about imageUrl userName _id rating').exec();
            res.send(data);
        }
        catch(err)
        {
            res.send(err);
        }
    }
    else if(category==='upvote')
    {
       
            const data=await doubtmodel.find().populate('created_by','about imageUrl userName _id rating').sort(`-${category.length}`).exec()
            res.send(data)
        
    }
    else
    {
        try{
           
            const data=await doubtmodel.find({ doubt: category }).populate('created_by','about imageUrl userName _id rating').exec();
            console.log(data)
            res.send(data);
        }
        catch(err)
        {
            res.send(err);
        }
    }
    
})
module.exports=router