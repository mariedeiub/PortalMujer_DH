const db = require('../database/models');
const sequelize = require('sequelize')

const APIController = {
    //---------- API USUARIOS----------------
    listaUsuarios:(req,res) =>{
        db.Usuarios.findAll({attributes: [['usuario_id', 'id'] , ['nombre', 'name'], 'email',
            [sequelize.fn(
                'concat',
                '/api/users/',
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
    },
    usuario:(req,res) => {
        db.Usuarios.findByPk(req.params.id, 
            {attributes: [['usuario_id', 'id'] , ['nombre', 'firstName'],
            ['apellido','secondName'], ['nombre_usuario','nickname'], 'email', ['foto', 'image']]}
        )
        .then(user =>{
            return res.status(200).json({
            total: user.length,
            data: user,
            status: 200
            })
        })
    },

    //------------- API PRODUCTOS
    listaProductos:(req,res) => {
        db.Productos.findAll({attributes: [['producto_id', 'id'] , ['nombre', 'name'],
        ['descripcion','description'], 
        [sequelize.fn('concat', '/api/products/', sequelize.col('producto_id')), 'URL' ]
        ]})
        .then(users =>{
            return res.status(200).json({
            total: users.length,
            data: users,
            status: 200
            })
        })
    },

    producto:(req,res) => {
        db.Productos.findByPk(req.params.id)
        .then(product =>{
            return res.status(200).json({
            total: product.length,
            data: {
                product
            },
            status: 200
            })
        })
    }
}

module.exports = APIController;