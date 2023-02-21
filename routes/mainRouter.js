const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const carritoMiddleware= require('../middlewares/carritoMiddleware');

//PANTALLA PRINCIPAL
router.get('/', mainController.index);
router.get('/home', mainController.home);

// VER CARRITO DE COMPRAS
router.get('/carrito', carritoMiddleware, mainController.carrito);

// SUMAR AL CARRITO
router.post('/carrito/sumar/:id/', mainController.cargar);

// ELIMINAR PRODUCTO DEL CARRITO DE COMPRAS
router.post('/carrito/eliminar/:id/', mainController.eliminarCarrito);

module.exports = router