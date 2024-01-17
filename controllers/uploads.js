const path = require ('path');
const fs = require ('fs')
const {response} = require ('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const cargarArchivo = (req,res=response)=>{
    const tipo= req.params.tipo;
    const id= req.params.id;

    //validar Tipo
    const tiposValidos=['medicos','hospitales','usuarios'];
    if (!tiposValidos.includes(tipo)){

        return res.status(400).json({
            ok:false,
            msg:' el tipo debe ser medicos, usuarios, hospitales'
        })
    }
    // * VALIDAR SI EXISTE UN ARCHIVO
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'no hay ningun archivo'
        });
    }
    // * PROCESAR IMAGEN
    const file = req.files.imagen;
    
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length-1];

    const extensionesValidas = ['png','jpg','jpeg','gif'];
    // VALIDAR EXTENSION
    if(!extensionArchivo.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'no es una extension permitida'
        })
    }
    
    //* GENERAR EL NOMBRE DEL ARCHIVO
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    
    // * PATH para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    
    // *  MOVER la Imagen 
    file.mv(path, (err)=> {
    if (err){
        console.log(err);
        return res.status(500).json({
            ok:false,
            msg:'error al mover la imagen'
        })
    }

    // * ACTUALIZAR BASE DE DATOS
    actualizarImagen(tipo,id,nombreArchivo);


    res.json({
        ok:true,
        nombreArchivo
    })
  });


}

const cargarImagen = (req,res=response)=>{
    const tipo= req.params.tipo;
    const foto= req.params.foto;

    const pathImg= path.join(__dirname,`../uploads/${tipo}/${foto}`);
    if (fs.existsSync(pathImg)){
        res.sendFile(pathImg)
    }else{
        const pathImg= path.join(__dirname,`../uploads/no-img.jpg`);
        res.sendFile(pathImg)
    }


}

module.exports={
    cargarArchivo,
    cargarImagen
}