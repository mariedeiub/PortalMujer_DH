module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuarios';

    let cols = {
        usuario_id: {
            type: dataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        perfil_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        direccion: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        localidad: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        pais: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        edad: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        nombre_usuario: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        contraseña: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        foto: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
    }

    let config= {
        tableName: 'Usuarios',
        timestamps: false
    }

    const Usuario = sequelize.define(alias,cols,config);

    Usuario.associate = function(models){
        Usuario.belongsTo(models.Perfiles, {
            foreignKey: 'perfil_id',
            as: 'perfil'
        })
    }

    return Usuario;
}