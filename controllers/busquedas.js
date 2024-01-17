const {response} = require('express');
const Usuario = require ('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getTodo= async(req,res=response)=>{
    const busqueda=req.params.busqueda;
    const regex=new RegExp(busqueda,'i');
    // * 1 FORMA DE HACER BUSQUEDA solo que demora 2 veces mas
    // const usuarios = await Usuario.find({ nombre:regex })
    // const medicos = await Medico.find({ nombre:regex })
    // const hospitales = await Hospital.find({ nombre:regex })

    //* 2 FORMA  pero mas eficiente
    const [usuarios,medicos,hospitales] = await Promise.all([
        Usuario.find({ nombre:regex }),
        Medico.find({ nombre:regex }),
        Hospital.find({ nombre:regex })
    ])
    
    res.json({
        ok:true,
        usuarios,
        medicos,
        hospitales
    })
    // try {
        
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok:false,
    //         msg:'comuniquese con el administrador'

    //     })   
    // }
}
const getDocumentosColeccion= async(req,res=response)=>{
    const tabla=req.params.tabla;
    const busqueda=req.params.busqueda;
    const regex=new RegExp(busqueda,'i');
    let data=[];
    switch (tabla) {
        case 'usuarios':
            data=await Usuario.find({ nombre:regex })
            break;
        case 'medicos':
            data=await Medico.find({ nombre:regex })
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img')
        
        break;
        case 'hospitales':
            data=await Hospital.find({ nombre:regex })
                                .populate('usuario','nombre img')
        break;
    
        default:
            return res.status(400).json({
                ok:false,
                msg:'la tabla debe ser usuarios, medicos u hospitales'
            });
    }
    res.json({
        ok:true,
        resultados:data
    })
    
}
module.exports={
    getTodo,
    getDocumentosColeccion
}