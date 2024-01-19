/*
    MEDICOS
    Ruta: /api/medicos
*/

const { Router } = require ('express');
const { check } =require ('express-validator')
const { validarCampos } = require ('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos');
const router = Router();

router.get('/', getMedicos);
router.post(
    '/',
    [
        validarJWT,
        check('nombre','nombre es requerido').not().isEmpty(),
        check('hospital','el id del hospital debe ser valido ').isMongoId(),
        validarCampos
        
    ],
    crearMedico
);
router.put(
    '/:id',
    [
        validarJWT,
        check('nombre','nombre es requerido').not().isEmpty(),
        check('hospital','el id del hospital debe ser valido ').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);
router.delete('/:id',validarJWT,eliminarMedico);

module.exports=router; 