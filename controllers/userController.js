const db = require('../database/models');
const { validationResult } = require("express-validator");
const bcrypt = require ('bcrypt');
const { Sequelize } = require("../database/models");
const sal = bcrypt.genSaltSync(10);

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const usersController = {
    //--------------------------LOGIN---------------------------//
    login: (req, res) => {
  
        return res.render('login');
    },

    //--------------------------REGISTRO----------------------------//
    registro: (req, res) => {
      db.Perfiles.findAll()
      .then(perfiles=>{
        res.render('register', {perfiles});
      })
    },

    //--------------------------REGISTRAR---------------------------//
    registrar: (req, res) => {
      let errors = validationResult (req);

      if (errors.isEmpty()){
        let img;

        if(req.files.length > 0){
          img = "/images/users/" + req.files[0].filename;
        } else{
          img = '/images/users/default-image.png'
        }

        req.body.contrasenia = bcrypt.hashSync(req.body.contrasenia,10);

        const usuario = { 
            perfil_id: req.body.tipoUsuario,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            localidad: req.body.localidad,
            pais: req.body.pais,
            edad: req.body.edad,        
            email: req.body.email,
            nombre_usuario: req.body.nombreUsuario,
            contraseña: req.body.contrasenia,
            foto:img
        };
        
        db.Usuarios.create(usuario);

        res.redirect('/');

      }else{
        db.Perfiles.findAll()
        .then(perfiles=>{
          res.render('register', {errors : errors.array(), old: req.body, perfiles})
      })
      }
    },

    //--------------------------LOGIN POST----------------------------//
    processLogin: (req, res) =>{
      let errors = validationResult (req);

      if (errors.isEmpty()){
        db.Usuarios.findOne({
          where:{email: req.body.email
          }})  
        .then( (user) => {
          if (bcrypt.compareSync(req.body.contraseña, user.contraseña)){
            req.session.userLogged = user;
            if(req.body.remember_user) {
              res.cookie('usuario', req.body.email, { maxAge: (1000 * 60) * 60 })
            }
            res.render('home',{user})
          } 
          })
          .catch (err=>{
            res.render('login', {
              errors: {
                email: {
                  msg: 'error de conexion'
                }
              }
            })
          })
      }
      else{
        res.render('login', {errors : errors.array(), old: req.body})
      }
    },

    //--------------------------LOGOUT----------------------------//
    logout: (req, res) => {
      res.clearCookie('userEmail');
      req.session.destroy();
      return res.redirect('/');
    },

    //--------------------------EDITAR----------------------------//
    editar: (req,res) => {
      db.Usuarios.findByPk(req.session.userLogged.usuario_id)
      .then(usuario => {
        res.render('user-edit', {usuario})
      })     
    },

    //--------------------------EDITAR PUT----------------------------//
    update: (req,res) => {
      db.Usuarios.findByPk(req.session.userLogged.usuario_id)
      .then(usuario => {
        let img;
        let pass;

        //----------------------VALIDO SI SE MODIFICO LA IMAGEN--------------//
        if(req.files.length > 0){
          img = "/images/users/" + req.files[0].filename;
        } else{
          img = usuario.foto
        }

        //----------------------VALIDO SI SE MODIFICO EL PASSWORD-----------//
        if (bcrypt.compareSync(req.body.contraseña, usuario.contraseña)){
          pass = usuario.contraseña
        }
        else{
          pass = bcrypt.hashSync(req.body.contrasenia,10);
        }

        const usuarioEdit = { 
            perfil_id: req.body.tipoUsuario,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            localidad: req.body.localidad,
            pais: req.body.pais,
            edad: req.body.edad,        
            email: req.body.email,
            nombre_usuario: req.body.nombreUsuario,
            contraseña: req.body.contrasenia,
            foto:img
        };
        
        db.Usuarios.update(usuarioEdit, {
          where: {usuario_id : usuario.usuario_id}
        });
        res.redirect('/');
      })
      .catch(error => res.render('login'))
    },

    //--------------------------PERFIL DE USUARIO---------------------------//
    perfil: (req,res) =>{
      if(req.session.userLogged){
        db.Usuarios.findByPk(req.session.userLogged.usuario_id)
        .then(usuario => {
          res.render('user-detail', {usuario})
        })
        .catch(e => console.log(e))
      }
      else{
        res.render('login')
      }
    },

    //------------------------LISTADO DE USUARIO --------------------------*/
    listar:(req, res) =>{
      db.Usuarios.findAll({
        include: ['perfil'],
            raw: true,
            nest: true
      })
      .then(usuarios =>{
        res.render('user-list', {usuarios})
      })
    },

    //------------------------ELIMINAR USUARIO--------------------------*/
    elminarUsuario: (req,res) => {
      db.Usuarios.destroy({
          where: {
              usuario_id: req.params.id,
          }
        })

      res.redirect('/user/lista')
    }
}

module.exports = usersController;