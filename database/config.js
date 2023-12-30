// 
const mongoose = require('mongoose');

const dbConection= async ()=>{
    try {
        await mongoose.connect(process.env.DB_CNN,{
            // useNewUrlParser:true,
            // useUnifiedTopology:true,
            // useCreateIndex:true
        });
        console.log('bd Online');
    } catch (error) {
        console.log(error);
        throw new Error('error a la hora de conectar ala BD ver logs')
    }
}

module.exports={
    dbConection
}