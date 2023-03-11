module.exports = (sequelize, dataTypes) => {
    let alias = 'Productos';

    let cols = {
        producto_id: {
            type: dataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        marca: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        tamanio: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        color: {
            type: dataTypes.STRING(30)
        },
        precio: {
            type: dataTypes.DECIMAL(10.0),
            allowNull: false
        },
        fabricante: {
            type: dataTypes.STRING(45)
        },
        modelo: {
            type: dataTypes.STRING(45)
        },
        stock: {
            type: dataTypes.INTEGER(11)
        },
        descuento: {
            type: dataTypes.INTEGER(11)
        },
        imagen: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        descripcion: {
            type: dataTypes.STRING(300),
            allowNull: false
        },
    }

    let config= {
        tableName: 'Productos',
        timestamps: false
    }

    const Producto = sequelize.define(alias,cols,config);

    Producto.associate = function(models){
        Producto.belongsToMany(models.Categorias, {
            as : 'categorias',
            through: 'producto_categoria',
            foreignKey: 'producto_fk',
            otherKey: 'categoria_fk',
            timestamps: false
        })
        Producto.hasMany(models.Carritos, {
            foreignKey : 'producto_fk',
            as: 'producto'
        })
        Producto.hasMany(models.ProductoCategorias, {
            foreignKey : 'producto_fk',
            as: 'productos'
        })
    }

    return Producto;
}