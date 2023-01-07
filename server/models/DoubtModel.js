const mongoose=require('mongoose')
const doubtSchema= new mongoose.Schema({
    title:{
        type:String
    },
    text:{
        type:String
    },

   
    Address:{
        type:String
    },
    
    created_by:{
        type:mongoose.Schema.Types.ObjectId,ref:'users'
       
    },
    created_by_image:{
        type:String
    },
    doubt:{
        type:String
    },
    Date:{
        type:Date
    },
    images:{
        type:Array
    },
    upvote:{
        type:Array
    },
    likes:{
        type:Array
    },
    comment_info:{
        type:Array
    }
})
const doubtmodel=mongoose.model('doubts',doubtSchema)
module.exports=doubtmodel