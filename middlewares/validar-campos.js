const { response } = require ('express');
const { validationResult } = require ('express-validator')

const validarCampos = (req,res=response,next)=>{
    // * AL PASAR EL MIDDLEWARE VALIDA LOS RESULTADOS
    const errores= validationResult (req);
    if (!errores.isEmpty()){ // SI HAY ERRORES MOSTRARLOS
        return res.status(400).json({
            ok:false,
            errors:errores.mapped()
        });
    }
    next();
}
module.exports={
    validarCampos
}