/*
    Ruta: /api/auth
*/
const { Router } = require ('express');
const { login, googleSingIn } = require('../controllers/auth');
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
);
router.post(
    '/google',
    [
        check('token','El Token de Google  es Obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSingIn
)



module.exports = router;