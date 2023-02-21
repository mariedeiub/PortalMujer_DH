const Usuarios = require("./Usuario");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Perfiles';

    let cols = {
        id: {
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
        tableName: 'perfil',
        timestamps: false,
        underscore: true,
        freezeTableName: true
    }

    const Perfil = sequelize.define(alias,cols,config);
    
    Perfil.associate = function(models){
        Perfil.hasMany(models.Usuarios, {
            foreignKey : 'perfil_id',
            as: 'perfil'
        })
    }

    return Perfil;
}