const express = require('express');
const router = express.Router();
const apiController = require('../controllers/APIController');

//------------------- Lista usuarios
router.get('/users/', apiController.listaUsuarios)

//------------------- Total clientes por localidad
router.get('/users/localidades/', apiController.usuarioLocalidades)


//------------------- Informacion de un usuario en particular
router.get('/users/:id/', apiController.usuario)


//------------------- Lista productos
router.get('/products', apiController.listaProductos)


//------------------- Productos mas vendidos
router.get('/products/ventas/', apiController.productosVendidos)


//------------------- Lista Categorias
router.get('/categories/', apiController.listaCategorias)

//------------------- Producto
router.get('/products/paginado/:pagina/', apiController.paginado)

//------------------- Producto
router.get('/categories/:categoria/paginado/:pagina', apiController.productosPorCategorias)

//------------------- Producto
router.get('/products/:id/', apiController.producto)

module.exports = router
