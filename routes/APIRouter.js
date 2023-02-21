const express = require('express');
const router = express.Router();
const userController = require('../controllers/APIController');

//------------------- Lista usuarios
router.get('/users/', userController.listaUsuarios)


//------------------- Informacion de un usuario en particular
router.get('/users/:id/', userController.usuario)


//------------------- Lista productos
router.get('/products/', userController.listaProductos)


//------------------- Producto
router.get('/products/:id/', userController.producto)

module.exports = router
