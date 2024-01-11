const { response} = require ('express');
const Usuario  = require('../models/usuario')
const bcrypt = require ('bcryptjs');
const { generarJWWT } = require('../helpers/jwt');


const login = async(req,res=response)=>{
    const { email,password } = req.body;
    try {
        // * VERIFICAR EMAIL
        const usuarioDB= await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Email invalido'
            });
        }
        // * VERIFICAR CONTRASEÑA 
        const validPassword = bcrypt.compareSync(password,usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Password invalido'
            });
        }
        // * GENERAR JWT
        const token = await generarJWWT(usuarioDB.id);

        
        res.json({
            ok:true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'comuniquese con el administrador'
        })
    }
}

module.exports= {
    login,
}