const {body, check} = require ('express-validator')
const db = require('../database/models');
const path = require("path");
const bcrypt = require ('bcrypt');

const validoUsuario = async (email) => {
  const user = await db.Usuarios.findOne({ where: {
      email: email
  } });
  return user;
};

const userFormMiddleware = [
  //VALIDA EMAIL
    check('email')
        .notEmpty().withMessage('Debes completar el campo Correo electronico')
        .isEmail().withMessage('Debe ingrear un Email valido')
        .custom(async (value) => {
            if ((await validoUsuario(value)) == null) {
              throw new Error('Email erroneo');
            }
            return true;
          }),
    
    // VALIDA CONTRASEÑA
    body('contraseña')
        .notEmpty().withMessage('Debes completar el campo Contraseña') 
        .custom(async(value, {req}) =>{
          let user = await validoUsuario(req.body.email);
          if(user != null){ 
            if (!bcrypt.compareSync(value, user.contraseña)){
              throw new Error('Contraseña incorrecta');
          }}
        })     
]

module.exports = userFormMiddleware;