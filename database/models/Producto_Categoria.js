module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductoCategorias';

    let cols = {
        producto_categoria_id: {
            type: dataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        producto_fk: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        categoria_fk: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }

    let config= {
        tableName: 'producto_categoria',
        timestamps: false,
        underscore: true,
        freezeTableName: true
    }

    const ProductoCategoria = sequelize.define(alias,cols,config);

    return ProductoCategoria;
}