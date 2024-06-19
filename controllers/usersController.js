const db = require("../database/models");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');


const usersController = {

  register: function(req, res) {
    res.render("register", {
        errors: {},
        oldData: {}
    })
},
  store_register: function(req, res) {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("register", { errors: errors.mapped(), oldData: req.body });
  }
    let info = req.body;
    let usuario = {
      email: info.email,
      usuario: info.usuario,
      contrasenia: bcrypt.hashSync(info.contrasenia, 10),
      fecha: info.fecha,
      dni: info.dni,
      fotoPerfil: info.fotoPerfil
    };
    db.Usuarios.create(usuario) 
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
   let usuario = req.body.usuario;
   let contrasenia = req.body.contrasenia;
 
   let coinciden = {
     where: { usuario: usuario }
   };
 
   db.Usuarios.findOne(coinciden) 
     .then( function(result) {
       if (result) { // Si se encontró un usuario
         let claveComparada = bcrypt.compareSync(contrasenia, result.contrasenia);
         if (claveComparada) {
           req.session.user = result.dataValues;
           if (req.body.recordarme) {
            res.cookie("id", result.dataValues.id, { maxAge: 1000 * 60 * 60 });
           }
            let id = req.session.user.id;
            return res.redirect(`/users/profile/${id}`);
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
  logout:function(req,res){
    req.session.destroy();
    res.clearCookie("userId")
    return res.redirect("/")
 },

  profile: function(req, res) {
    const userId = req.params.id; // Get the user ID from the URL parameter

    db.Usuarios.findByPk(userId,{
      include: [
          { association: 'productos'}
      ]
    })  
        .then(function(user) {
            if (user) {
              res.render("profile", { user: user })  
            }
        })
        .catch(function(error) {
            console.log(error);
            let errors = { mensaje: "Error al buscar el usuario" };
            res.render("profile", { errors: errors });
        });

 },
 profileEdit: function(req, res) {
  // let errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(400).render("profile-edit", { errors: errors.mapped(), oldData: req.body, user: { id: req.params.id } });
  // }
  
  const userId = req.params.id;
  const userData = req.body;
  
  // Si el campo de contraseña está presente y no está vacío, hashéalo.
  if (userData.contrasenia && userData.contrasenia.trim()) {
    userData.contrasenia = bcrypt.hashSync(userData.contrasenia, 10);
  } else {
    delete userData.contrasenia;
  }

  db.Usuarios.update(userData, {
    where: { id: userId }
  })
  .then(() => {
    return db.Usuarios.findByPk(userId);
  })
  .then(user => {
    if (user) {
      const successMessage = "Perfil actualizado correctamente";
      res.render("profile-edit", { user: user, successMessage: successMessage });
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  })
  .catch(error => {
    console.error(error);
    res.status(500).send("Error al actualizar el perfil del usuario");
  });
},

editProfileForm: function(req, res) {
  const userId = req.params.id;

  db.Usuarios.findByPk(userId)
  .then(user => {
    if (user) {
      res.render("profile-edit", { user: user});
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  })
  .catch(error => {
    console.error(error);
    res.status(500).send("Error al cargar el formulario de edición del usuario");
  });
}
};

module.exports = usersController;
