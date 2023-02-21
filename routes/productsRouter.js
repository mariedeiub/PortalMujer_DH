const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require ('multer');
const path = require('path');
const productFormMiddleware = require ('../middlewares/productFormMiddleware');

// ************ Configuracion Multer para los midleware ************
const storage = multer.diskStorage({
    
    destination: function(req, file, cb){
        cb(null, 'public/images/products/')
    },

    filename: function(req,file,cb){
        const uniqueSuffix = Date.now() + path.extname(file.originalname)

        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer ({storage: storage})


// NUEVO PRODUCTO
router.get('/cargar', productsController.cargar);
router.post('/crear/', upload.any(''), productFormMiddleware , productsController.crear);

// DETALLE DEL PRODUCTO
router.get('/producto/:id/', productsController.producto);

router.get('/filtrar', productsController.filtrar);

// EDITAR PRODUCTO
router.get('/editar/:id/', productsController.editar);
router.put('/editar/:id/', upload.any(''), productFormMiddleware , productsController.update)

router.delete('/delete/:id/',productsController.eliminar)

router.get('/:categoria/', productsController.categoria);



module.exports = router