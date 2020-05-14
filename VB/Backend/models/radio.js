const mongoose=require('mongoose')

const RadioSchema=new mongoose.Schema({
    url:{
        type:String
    },
    msg:{
        type:String,
    },
    started:{
        type:Boolean
    }

})

const Radio=mongoose.model('Radio',RadioSchema);
module.exports={Radio}