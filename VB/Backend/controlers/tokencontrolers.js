const express=require('express')
const mongoose=require("mongoose");
const {Token}=require('../models/token')
const { Expo } = require('expo-server-sdk')

const router=express.Router();


router.post('/savetoken',(req,res)=>{
   
    const data={
        token:req.body.token,
    }
    
     const toke=new Token(data)
     
     toke.save().then((toke)=>{
         if(toke){
             res.send({token:true})
         }else{
             res.status(400).send({token:false})
         }
     }).catch((err)=>{
         res.status(400).send({token:false})
         console.log(err)})
     
     
 })


 router.post('/sendnotification',(req,res)=>{
    
    Token.find({},function(err,result){
        if(err){
            console.log(err)
            res.status(400)
        }
        else{
            
            try{
                sendNotification(result,req.body.message,req.body.data)
                res.send('ok')
            }catch(e){
                console.log(e)
                res.status(400)
            }
        }
    })
    



    

function sendNotification(somePushTokens,message,data){
    let expo = new Expo();
        
    let messages = [];
    for (let item of somePushTokens) {
        let pushToken=item.token
        //console.log(pushToken);
    
    if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
    }

    
    messages.push({
        to: pushToken,
        sound: 'default',
        body: message,
        data: { withSome: data },
    })
    }

  
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
  
    for (let chunk of chunks) {
        try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        //console.log(ticketChunk);
        tickets.push(...ticketChunk);
       
        } catch (error) {
        console.error(error);
        }
    }
    })();
}


     
 })


 module.exports=router;