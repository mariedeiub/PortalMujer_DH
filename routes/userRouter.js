const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require ('multer');
const path = require('path');
const userFormMiddleware = require ('../middlewares/userFormMiddleware');
const loginFormMiddleware = require ('../middlewares/loginFormMiddleware');
const logueadoMiddleware= require('../middlewares/logueadoMiddleware');


// ************ Configuracion Multer para los midleware ************
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images/users/')
    },

    filename: function(req,file,cb){
        const uniqueSuffix = Date.now() + path.extname(file.originalname)

        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer ({storage: storage})

// // LOGIN
router.get('/login', logueadoMiddleware, userController.login);
router.post('/login/', loginFormMiddleware, userController.processLogin);
router.get('/logout', userController.logout);
router.get('/perfil', userController.perfil);
// // NUEVO USUARIO
router.get('/registro', userController.registro);
router.post('/registrar/',upload.any(''), userFormMiddleware, userController.registrar);

//EDITAR USUARIO
router.get('/editar/:id/', userController.editar);
router.put('/editar/', upload.any(''), userController.update);

//LISTA DE USUARIOS
router.get('/lista', userController.listar);

//ELIMINAR USUARIO
router.post('/eliminar/:id/', userController.elminarUsuario)

module.exports = router