const db = require('../database/models');
const sequelize = require('sequelize')

const APIController = {
    //---------- API USUARIOS----------------
    listaUsuarios:(req,res) =>{
        db.Usuarios.findAll({
            attributes: [['usuario_id', 'id'] , 
                        'email', 'nombre' , 'apellido',
                        ['perfil_id', 'perfil'], 
                        'edad', ['nombre_usuario', 'nickname'],
            [sequelize.fn('concat', 'http://localhost:3030', sequelize.col('foto')), 'imagen' ],
            [sequelize.fn(
                'concat',
                'http://localhost:3030/api/users/',
                sequelize.col('usuario_id')
                ), 'URL' ]
            ]})
        .then(users =>{
            return res.status(200).json({
            total: users.length,
            data:users,
            status: 200
            })
        })
        .catch(error => console.log(error))
    },

    usuario:(req,res) => {
        db.Usuarios.findByPk(req.params.id, 
            {attributes: [['usuario_id', 'id'] , ['nombre', 'firstName'],
            ['apellido','secondName'], ['nombre_usuario','nickname'], 'email', ['perfil_id', 'perfil'],
            [sequelize.fn('concat', 'http://localhost:3030', sequelize.col('foto')), 'URL' ]]}
        )
        .then(user =>{
            return res.status(200).json({
            total: user.length,
            data: user,
            status: 200
            })
        })
        .catch(error => console.log(error))
    },

    usuarioLocalidades:(req,res) => {
        db.Usuarios.findAll({
            attributes: [
              [sequelize.fn('COUNT', sequelize.col('localidad')), 'cantidad'],
              'localidad'
            ],
            group: 'localidad',
            order:[['cantidad', 'DESC']]
          }
        )
        .then(user =>{
            return res.status(200).json({
            total: user.length,
            data: user,
            status: 200
            })
        })
        .catch(error => console.log(error))
    },

    //------------- API PRODUCTOS
    listaProductos:(req,res) => {
        db.Productos.findAll({attributes: [['producto_id', 'id'] , ['nombre', 'name'], 'marca', 'precio', 'stock',
        ['descripcion','description'], 
        [sequelize.fn('concat', 'http:/localhost:3030/api/products/', sequelize.col('producto_id')), 'URL' ],
        [sequelize.fn('concat', 'http://localhost:3030/', sequelize.col('imagen')), 'imagen' ]
        ]
    })
        .then(users =>{
            return res.status(200).json({
            total: users.length,
            data: users,
            status: 200
            })
        })
        .catch(error => console.log(error))
    },

    paginado:(req,res) => {
        let pagina = (req.params.pagina * 4)-4;
        db.Productos.findAll({attributes: [['producto_id', 'id'] , ['nombre', 'name'], 'marca', 'precio', 'stock',
        ['descripcion','description'], 
        [sequelize.fn('concat', 'http:/localhost:3030/api/products/', sequelize.col('producto_id')), 'URL' ],
        [sequelize.fn('concat', 'http://localhost:3030/', sequelize.col('imagen')), 'imagen' ]
        ],
        offset: pagina, 
        limit: 4
        },
        )
        .then(users =>{
            return res.status(200).json({
            total: users.length,
            data: users,
            status: 200
            })
        })
        .catch(error => console.log(error))
    },

    producto:(req,res) => {
        db.Productos.findByPk(req.params.id, 
            {attributes:[
                ['producto_id', 'id'],
                ['nombre', 'name'],
                ['marca', 'marca'],
                ['stock', 'stock'],
                ['precio', 'precio'],
                ['descuento', 'descuento'],
                [sequelize.fn('concat', 'http://localhost:3030/', sequelize.col('imagen')), 'URL' ]
            ]},
            {
            include: ['categorias'],
                raw: true,
                nest: true
          })
        .then(product =>{
            return res.status(200).json({
            total: product.length,
            data: {
                product
            },
            status: 200
            })
        })
        .catch(error => console.log(error))
    },

    productosVendidos:(req,res) => {
        db.Carritos.findAll({
            attributes: [
              [sequelize.fn('COUNT', sequelize.col('producto_id')), 
              'cantidad']
            ],
            group: 'producto_id',
            order:[['cantidad', 'DESC']],
            include: ['producto'],
                raw: true,
                nest: true
          }
        )
        .then(product =>{
            return res.status(200).json({
            total: product.length,
            data: product,
            status: 200
            })
        })
        .catch(error => console.log(error))
    },

    //------------- API CATEGORIAS
    listaCategorias:(req,res) => {
        db.ProductoCategorias.findAll({
            attributes: [
              [sequelize.fn('COUNT', sequelize.col('categoria_fk')), 
              'cantidad']
            ],
            group: 'categoria_fk',
            include: ['categorias'],
                raw: true,
                nest: true
        })
        .then(categories =>{
            return res.status(200).json({
            total: categories.length,
            data: categories,
            status: 200
            })
        })
        .catch(error => console.log(error))
    },

    productosPorCategorias:(req,res) => {
        let pagina = (req.params.pagina * 4)-4;
        db.ProductoCategorias.findAll({
            where: {categoria_fk : req.params.categoria},
            include: ['categorias', 'productos'],
            raw: true,
            nest: true,
            offset: pagina, 
            limit: 4
        })
        .then(categories =>{
            return res.status(200).json({
            total: categories.length,
            data: categories,
            status: 200
            })
        })
        .catch(error => console.log(error))
    },



}

module.exports = APIController;