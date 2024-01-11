require('dotenv').config();

const express = require('express');
const cors = require('cors')
const { dbConection }= require('./database/config');


//CREA SERVIDOR EXPRESS
const app=express();

//CONFIGURAR CORS
app.use(cors());

// ! lectura  y parseo del body [antes de las rutas]
app.use(express.json());

//BASE DE DATOS
dbConection();

// console.log(process.env);

//RUTAS
app.use('/api/usuarios', require ('./routes/usuarios'));
app.use('/api/login', require ('./routes/auth'));


app.listen(process.env.PORT,()=>{
    console.log("Servidor corriendo en el puerto",process.env.PORT);
})