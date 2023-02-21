module.exports = (sequelize, dataTypes) => {
    let alias = 'Carritos';

    let cols = {
        carrito_id: {
            type: dataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        producto_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        usuario_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        estado: {
            type: dataTypes.BOOLEAN(1)
        },
        precio: {
            type: dataTypes.DECIMAL(10.0),
            allowNull: false
        },
        cantidad: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }

    let config= {
        tableName: 'Carritos',
        timestamps: false
    }

    const Carrito = sequelize.define(alias,cols,config);

    Carrito.associate = function(models){
        Carrito.belongsTo(models.Usuarios, {
            foreignKey: 'usuario_id',
            as: 'usuario'
        })
        Carrito.belongsTo(models.Productos, {
            foreignKey: 'producto_id',
            as: 'producto'
        })
    }

    return Carrito;
}