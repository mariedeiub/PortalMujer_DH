let carrito = [1,3,6,5]

const fs = require('fs');
const path = require('path');
const { Association } = require('sequelize');

const productsFilePath = path.join(__dirname, '../data/productsList.json');
const usersFilePath = path.join(__dirname, '../data/usersList.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const db = require('../database/models');

const mainController = {
    index: (req, res) => {
        let condicion=false
        res.render('home',{condicion});
    },

    home: (req, res) => {
        let condicion=false
        res.render('home',{condicion});
    },

    carrito: (req, res) => {
        
        db.Carritos.findAll(
            {where: {
                usuario_id:req.session.userLogged.usuario_id,
                estado: null
            },
            include: ['producto'],
            raw: true,
            nest: true
        }
          )
        .then(productos =>{
            let pedido = [];
            let total = 0;
            let subtotal = 0;
            productos.forEach(p => {
                pedido.push(p);
                let precio = parseInt(p.precio);
                let descuento = parseInt(p.producto.descuento)
                subtotal += precio;
                if(descuento > 0){    
                    total += precio-(precio * (descuento/100))
                }else{
                    total += precio
                }
            });
            res.render('cart', {pedido, total, subtotal});
        })
        .catch(error => {
            console.log(error);
            res.render('cart', {pedido, total, subtotal});
        })
    },

    eliminarCarrito: (req,res) => {
        db.Carritos.destroy({
            where: {
                producto_fk: req.params.id,
                usuario_id: req.session.userLogged.usuario_id
            }
          })

        res.redirect('/carrito')
    },

    cargar:(req, res) =>{
        db.Productos.findByPk(req.params.id)
        .then(producto =>{
            if(producto.stock > 0){
                let nuevoCarrito = {
                    producto_fk: producto.producto_id,
                    usuario_id: req.session.userLogged.usuario_id,
                    precio: producto.precio,
                    cantidad: 1
                }
                console.log('NUEVO CARRITO: ' + nuevoCarrito);

                db.Carritos.create(nuevoCarrito);
                res.redirect(`/productos/producto/${req.params.id}`)
            }
        })
        
    },

} 

module.exports = mainController