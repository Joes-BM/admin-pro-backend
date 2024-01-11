const { response} = require ('express');
// const { validationResult } = require ('express-validator')
const bcrypt = require ('bcryptjs');
const Usuario = require ('../models/usuario');
const { generarJWWT } = require('../helpers/jwt');

const getUsuarios = async (req,res)=>{
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok:true,
        usuarios,
    })
};
const crearUsuario = async(req,res=response)=>{
    // * LOS CAMPOS A ENVIAR DESDE EL REQ
    const {nombre, password, email} = req.body;
    
    
    // * VALIDA SI EL CAMPO EMAIL ESTA DUPLICADO 
    try {
        const existeEmail=await Usuario.findOne({email});
        if (existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado'
            })
        }
        const usuario = new Usuario(req.body);

        // *ENCRIPTAR CONTRASEÑA
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        
        await usuario.save();

        // * GENERAR JWT
        const token = await generarJWWT(usuario.id);

    
        res.json({
            ok:true,
            msg:"creando Usuario",
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado ... ver log'
        })
    }
};
const actualizarUsuario =async(req, res=response)=>{

    const uid= req.params.id;
    try {
        const usuarioDB= await Usuario.findById(uid);
        if (!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'no existe un usuario con ese ID'
            })
        }
        // * ACTUALIZACIONES

        const {password, google, email, ...campos} = req.body;
        
        if(usuarioDB.email!==email){
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'ya existe otro usuario con ese email'
                })
            }
        }
       
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true});

        res.json({
            ok:true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error inesperado'
        })
    }
};
const eliminarUsuario = async (req,res=response)=>{
    const uid = req.params.id;
    try {
        const usuarioDB= await Usuario.findById(uid);
        if (!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'no existe un usuario con ese ID'
            })
        }
        await Usuario.findByIdAndDelete(uid)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }
    res.json({
        ok:true,
        msg:'Usuario Eliminado'
    })
}
module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}