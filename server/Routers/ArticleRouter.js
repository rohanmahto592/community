const express=require('express');
const { default: mongoose } = require('mongoose');
const router=express.Router();
const articlemodel=require('../models/ArticleModel')
router.post('/',(req,res)=>{
    const body=req.body;
    try{
        const article=  new articlemodel(body);
     article.save()
     res.send('article added')

    }
    catch(err)
    {
        res.send('err');
    }
    
})
router.get('/',async(req,res)=>{
    try{
        const article=await articlemodel.find().sort('-Date').populate('created_by','userName imageUrl _id about rating').exec();
        res.send(article);
    }
    catch(err)
    {
        res.send(err);
    }
})
router.get('/single/:id',async(req,res)=>{
    const id=req.params.id;
    const data=await articlemodel.findById(id).exec();
    res.send(data)
})
router.get('/:pinId',async(req,res)=>{
    const category=req.params.pinId
    try{
        const article=await articlemodel.find({'category':category}).sort('-Date').populate('created_by','userName imageUrl _id about rating').exec();
        res.send(article)
    }
    catch(err)
    {
        res.send(err)
    }
})
router.get('/savepin/:item',async(req,res)=>{
    const id=req.params.item;
    userId = mongoose.Types.ObjectId(id)
    try{
        const pin=await articlemodel.findById(userId).populate('created_by','userName imageUrl about rating').exec();
    res.send(pin);

    }
    catch(err)
    {
        res.send({})
    }
    
})
router.put('/:id',async(req,res)=>{
    const data=req.body;
    console.log(data)
    const id=req.params.id
    const value=await articlemodel.updateOne({ "_id":id},{ "$push": { "comment_info": data } }, { "new": true, "upsert": true }).exec()
    res.send('updated comment')

})

router.put('/update/vote/:id/:likeid',async(req,res)=>{
    const id=req.params.id;
    const likeid=req.params.likeid
    await articlemodel.updateOne({ "_id":id},{ "$push": { "upvote": likeid } }, { "new": true, "upsert": true }).exec()
})
router.put('/update/like/:id/:likeid',async(req,res)=>{
    const id=req.params.id;
    const likeid=req.params.likeid
    await articlemodel.updateOne({ "_id":id},{ "$push": { "likes": likeid } }, { "new": true, "upsert": true }).exec()
})
router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await articlemodel.findByIdAndDelete({ _id: id }).exec();
    }
    catch(err)
    {
        res.send(err);
    }
})
router.get('/searchitem/:search',async(req,res)=>{
    const search=req.params.search;
    try{
        const data=await articlemodel.find({category:{ $regex: '.*' + search + '.*', $options: 'i' }}).populate('created_by','userName imageUrl about rating').exec();
        res.send(data)
            
        
    }
    catch(err)
    {
        res.send("false")
    }
})
router.get('/searchname/:search',async(req,res)=>{
    var arr=[]
    const search=req.params.search;
    const finalSentence = search.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    try{
        const data=await articlemodel.find({}).populate('created_by','userName imageUrl about rating').exec();
       
        data.map((docs)=>{
            let value=docs.created_by?.userName;
          

            if(value.includes(finalSentence))
            {
                
                arr.push(docs)
                
                

            }
        })
       
        res.send(arr)
            
        
    }
    catch(err)
    {
        res.send("false")
    }
})
module.exports=router