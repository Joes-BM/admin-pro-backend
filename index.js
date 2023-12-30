require('dotenv').config();

const express = require('express');
const cors = require('cors')
const { dbConection }= require('./database/config');


//CREA SERVIDOR EXPRESS
const app=express();

//CONFIGURAR CORS
app.use(cors());

//BASE DE DATOS
dbConection();

console.log(process.env);

//RUTAS
app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msg:"hola mundo"
    })
})

app.listen(process.env.PORT,()=>{
    console.log("Servidor corriendo en el puerto",process.env.PORT);
})