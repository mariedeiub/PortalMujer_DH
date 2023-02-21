const {body, check} = require ('express-validator')
const db = require('../database/models');
const path = require("path");

const emailInUse = async (email) => {
    const user = await db.Usuarios.findOne({ where: {
        email: email
    } });
    return user !== null;
};

const userFormMiddleware = [
    body('nombre')
        .notEmpty().withMessage('Debes completar el campo Nombre')
        .isLength({min: 2}).withMessage('El nombre debe que tener al menos 2 caracteres'),

    body('apellido')
        .notEmpty().withMessage('Debes completar el campo Apellido')
        .isLength({min: 2}).withMessage('El Apellido debe que tener al menos 2 caracteres'),

    // VALIDA EDAD
    body('edad')
        .notEmpty().withMessage('Debes completar el campo Edad')
        .custom((value) =>{
            if(value < 18){
                throw new Error('Debes ser mayor de edad')
            }
            return true; 
        }),

    // VALIDA DIRECCION
    body('direccion').notEmpty().withMessage('Debes completar el campo Direccion'),

    body('localidad').notEmpty().withMessage('Debes completar el campo Localidad'),

    body('pais').notEmpty().withMessage('Debes completar el campo Pais'),
    
    //VALIDA EMAIL
    check('email')
        .notEmpty().withMessage('Debes completar el campo Correo electronico')
        .isEmail().withMessage('Debe ingrear un Email valido')
        .custom(async (value) => {
            if (await emailInUse(value)) {
              throw new Error('Este correo electrónico ya está en uso');
            }
            return true;
          }),
    
    // VALIDA USERNAME
    body('nombreUsuario')
        .notEmpty().withMessage('Debes completar el campo Nombre usuario')
        .isLength({min:8, max:20}).withMessage("El nombre de usuario debe tener como minimo 8 caracteres y maximo 20 caracteres"),
    
    // VALIDA CONTRASEÑA
    body('contrasenia')
        .notEmpty().withMessage('Debes completar el campo Contraseña')
        .isLength({min:8, max:20}).withMessage("La contraseña debe tener como minimo 8 caracteres y maximo 20 caracteres"),
    

    // VALIDA CONTRASEÑA
    body('repetirContrasenia')
        .notEmpty().withMessage('Debes completar el campo Repetir Contraseña')   
        .isLength({min:8, max:20}).withMessage("La contraseña debe tener como minimo 8 caracteres y maximo 20 caracteres")
        .custom((value, {req}) => {
            if (value !== req.body.contrasenia) {
                throw new Error('Las contraseñas no coinciden')
            }
            return true; 
        }),

    // VALIDA EXTENSION IMAGEN
    body('foto').custom((value, {req}) =>{
        let file = req.file;
        let extensionesPermitidas = ['JPG', 'JPEG', 'PNG', 'GIF'];

        console.log('MOSTRAR FILE ' + file)

        if(file){
            let fileExtension = path.extname(file.originalname)
            console.log('EXTENSION:  ' + fileExtension);
            if(!extensionesPermitidas.includes(fileExtension)){
                throw new Error(`Las extensiones permitidas son ${extensionesPermitidas}.`)
            }
        }
        return  true;
    })
    
]

module.exports = userFormMiddleware;