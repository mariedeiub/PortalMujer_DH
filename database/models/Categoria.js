module.exports = (sequelize, dataTypes) => {
    let alias = 'Categorias';

    let cols = {
        categoria_id: {
            type: dataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true, 
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    }

    let config= {
        tableName: 'Categorias',
        timestamps: false
    }

    const Categoria = sequelize.define(alias,cols,config);

    Categoria.associate = function(models){
        Categoria.belongsToMany(models.Productos, {
            as : 'productos',
            through: 'producto_categoria',
            foreignKey: 'categoria_fk',
            otherKey: 'producto_fk',
            timestamps: false
        })
    }
    
    return Categoria;
}