const db = require("../database/models");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');


const usersController = {

  register: function(req, res) {
    res.render('register', {
      title: 'Laurent Watches'
    });
  },

  store_register: function(req, res) {
    let info = req.body;
    let usuario = {
      email: info.email,
      usuario: info.usuario,
      contrasenia: bcrypt.hashSync(info.contrasenia, 10),
      fecha: info.fecha,
      dni: info.dni,
      fotoPerfil: info.fotoPerfil
    };
    db.usuarios.create(usuario) 
      .then(() => {
        return res.redirect("/users/login");
      })
      .catch(error => {
        console.log(error);
        res.status(500).render("register", { errors: { mensaje: "Error al registrar el usuario" } });
      });
  },

  login: function(req, res, next) {
    if (req.session.user != undefined) {
      return res.redirect("/");
    } else {
      return res.render("login");
    }
  },

  store_login: function(req, res) {
   let email = req.body.email;
   let contrasenia = req.body.contrasenia;
 
   let coinciden = {
     where: { email: email }
   };
 
   db.usuarios.findOne(coinciden) 
     .then(function(result) {
       if (result) { // Si se encontró un usuario
         let claveComparada = bcrypt.compareSync(contrasenia, result.contrasenia);
         if (claveComparada) {
           req.session.user = result.dataValues;
           if (req.body.recordarme) {
            res.cookie("id", result.dataValues.id, { maxAge: 1000 * 60 * 60 });
           }
            let id = req.session.user.id;
            return res.redirect(`/profile/${id}`);
         } else {
           let errors = { mensaje: "La contraseña ingresada es incorrecta" };
           return res.render("login", { errors: errors });
         }
       } else {
         let errors = { mensaje: "El usuario ingresado no existe" };
         return res.render("login", { errors: errors });
       }
     })
     .catch(function(error) {
       console.log(error);
       let errors = { mensaje: "Error interno del servidor" };
       res.status(500).render("login", { errors: errors });
     });
 },
 

 profile: function(req, res) {
   const usuario = req.query.usuario;
   const contrasenia = req.query.contrasenia;
 
   db.usuarios.findOne({
     where: {
       usuario: usuario,
       contrasenia: contrasenia
     }
   })
   .then(function(user) {
     if (user) {
       res.render("profile", { user: user }); // Pasar el usuario a la vista
     } else {
       // Manejar el caso cuando no se encuentra el usuario
       let errors = { mensaje: "Usuario no encontrado" };
       res.render("profile", { errors: errors });
     }
   })
   .catch(function(error) {
     console.log(error);
     let errors = { mensaje: "Error al buscar el usuario" };
     res.render("profile", { errors: errors });
   });
 },
 

  profileEdit: function(req, res) {
    const userId = req.params.id; // ID del usuario a editar
    const userData = req.body; // Datos actualizados del usuario

    db.usuarios.update(userData, {
      where: { id: userId }
    })
    .then(updatedUser => {
      if (updatedUser[0]) {
        res.status(200).json({ success: true, message: 'Perfil actualizado exitosamente.' });
      } else {
        res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error al actualizar el perfil.' });
    });
  },

  user: function(req, res) {
    res.render("user", {
      title: "Laurent Watches",
      id: req.params.id
    });
  }
};

module.exports = usersController;
