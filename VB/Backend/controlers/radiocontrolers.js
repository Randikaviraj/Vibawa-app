const express=require('express')
const _ = require('lodash');
const mongoose=require("mongoose");

const router=express.Router();
const {Radio}=require('../models/radio')

router.get('/takeurl',(req,res)=>{
    Radio.find({}).then(doc=>{
        if(!_.isEmpty(doc[0])){
            console.log('get file name'+doc[0])
            res.send(JSON.stringify({url : doc[0].url,msg : doc[0].msg,started : doc[0].started,status:true}))

        }else{  
            
            res.status(400).send(JSON.stringify({status:false}))
        }
                
    }).catch(err=>{
        res.status(400).send(JSON.stringify({status:false}))
        console.log('Eror is in here radio upgrade '+err)
    });
})

router.post('/upgrade',(req,res)=>{
    const data={
        url:req.body.url,
        msg:req.body.msg,
        started:req.body.started
    }  

    Radio.find({}).then(doc=>{
        if(!_.isEmpty(doc[0])){
            
            console.log('get radi[0] name'+doc[0])
            Radio.updateMany({}, data, function(err,  docs) {
            if (err) {
                console.log('Eror is in here radio upgrade updateb lock '+err)
                res.status(400).send('cant upgrade url')
            };
            console.log(docs+ " document(s) updated");
            res.status(200).send('creat new radio and upgrade url')
  });

        }else{
            
            const radio=new Radio(data)
            radio.save().then((radio)=>{
                if(radio){
                    res.status(200).send('creat new radio and upgrade url') 
                }else{
                    res.status(400).send('cant upgrade url')
                }
            }).catch((err)=>{
                console.log('Eror is in here radio upgrade '+err)
                res.status(400).send('cant upgrade url')
            })
        }
                
    }).catch(err=>{
        res.status(400).send('cant upgrade url')
        console.log('Eror is in here radio upgrade '+err)
    });
})

module.exports=router;