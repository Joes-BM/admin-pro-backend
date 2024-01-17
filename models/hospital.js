const { Schema, model } = require('mongoose');

const HospitalSchema=Schema({
    nombre:{
        type:String,
        required:true
    },
    img:{
        type:String,
    },
    usuario:{
        required:true,
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    }
},{
    collection:'hospitales'
});
HospitalSchema.method('toJSON', function(){
    // * QUITA DEL RETORNO ID Y PASSWORD Y NO LOS MUESTRA
    const { __V, ...object } = this.toObject();
    return object;
})
module.exports = model('Hospital',HospitalSchema);