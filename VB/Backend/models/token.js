const mongoose=require('mongoose')

const TokenSchema=new mongoose.Schema({
    token:{
        type:String,
        unique:true
        
    },

})

const Token=mongoose.model('Token',TokenSchema);
module.exports={Token}