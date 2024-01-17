/*
    ruta: api/uploads/
*/
const { Router } = require ('express');
const fileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { cargarArchivo, cargarImagen } = require('../controllers/uploads');
const router = Router();
router.use(fileUpload());


router.put('/:tipo/:id',validarJWT,cargarArchivo);
router.get('/:tipo/:foto',cargarImagen);


module.exports=router; 
