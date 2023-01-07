const mongoose=require('mongoose')
const videoSchema= new mongoose.Schema({
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
    created_by_image:{
        type:String
    },
    created_At:{
        type:Date
    },
    video:{
        type:String
    },
    upvote:{
        type:Array
    },
    likes:{
        type:Array
    }

})
const videomodel=mongoose.model('videos',videoSchema)
module.exports=videomodel