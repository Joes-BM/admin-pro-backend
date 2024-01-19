const { response} = require ('express');
const Usuario  = require('../models/usuario')
const bcrypt = require ('bcryptjs');
const { generarJWWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


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
const googleSingIn = async(req,res=response)=>{
    try {
        // * sin destructurar        
        // const googleUser = await googleVerify(req.body.token)
        
        // * DESESTRUCTURANDO
        const { email, name, picture } = await googleVerify(req.body.token)
        let usuario;
        const usuarioDB= await Usuario.findOne({email});
        if(!usuarioDB){
            usuario = new Usuario({
                nombre:name,
                email,
                password:'@@@',
                img:picture,
                google:true
            })
        }else{
            usuario=usuarioDB,
            usuario.google=true
        }
        //guardar usuario
        await usuario.save();

        // * GENERAR JWT
        const token = await generarJWWT(usuario.id);


        res.json({
            ok:true,
            // googleUser,
            token,
            email, 
            name, 
            picture
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:true,
            msg: 'Token de Google no es correcto'
        })
    }

}
module.exports= {
    login,
    googleSingIn
}