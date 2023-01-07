const mongoose=require('mongoose')
const imageSchema= new mongoose.Schema({
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
        type:mongoose.Schema.Types.ObjectId,ref:'users'
    },
    created_by_image:{
        type:String
    },
    created_At:{
        type:Date
    },
    images:{
        type:Array
    },
    comment_info:{
        type:Array
    },
    upvote:{
        type:Array
    },
    likes:{
        type:Array
    },

})
const imagemodel=mongoose.model('imagepost',imageSchema)
module.exports=imagemodel