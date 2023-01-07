const mongoose=require('mongoose')
const articleSchema= new mongoose.Schema({
    title:{
        type:String
    },
    text:{
        type:String
    },
    category:{
        type:String
    },
    Address:{
        type:String
    },
    pdf:{
        type:String
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
        
    },
    upvote:{
        type:Array
    },
    likes:{
        type:Array
    },
    created_by_image:{
        type:String
    },
    Date:{
        type:Date
    },
    comment_info:{
        type:Array
    }
})
const articlemodel=mongoose.model('articles',articleSchema)
module.exports=articlemodel