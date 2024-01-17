const { Schema, model } = require('mongoose');

const MedicoSchema=Schema({
    nombre:{
        type:String,
        required:true
    },
    img:{
        type:String,
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref:'Hospital',
        required:true
    }
});
MedicoSchema.method('toJSON', function(){
    // * QUITA DEL RETORNO ID Y PASSWORD Y NO LOS MUESTRA
    const { __V, ...object } = this.toObject();
    return object;
})
module.exports = model('Medico',MedicoSchema);