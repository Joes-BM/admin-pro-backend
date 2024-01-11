/*
    Ruta: /api/auth
*/
const { Router } = require ('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post(
    '/',
    [
        check('email','El Email es Obligatorio').isEmail(),
        check('password','El Password es Obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)



module.exports = router;