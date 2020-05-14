const express=require('express');
const bodyParser=require("body-parser");
const path = require('path');

const app=express();


const {mongoose}=require('./models/index')
const usercontroler=require("./controlers/usercontrol");
const tokencontroler=require("./controlers/tokencontrolers");
const radiocontrolers=require('./controlers/radiocontrolers')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/profilepic', express.static(__dirname + '/uploads'));

app.use('/radio',radiocontrolers)
app.use('/user',usercontroler)
app.use('/token',tokencontroler)



app.listen(3330,()=>{
    console.log('Serever is listening');
})

