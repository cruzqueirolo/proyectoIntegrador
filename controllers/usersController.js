const db = require("../database/models");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');


const usersController = {

  register: function(req, res) {
    res.render("register", {
        errors: {},
        oldData: {}
    });
},

store_register: function(req, res) {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.mapped()); // Para depuración
        return res.render('register', { 
            errors: errors.mapped(), 
            oldData: req.body 
        });
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
        .then(function() {
            return res.redirect("/users/login");
        })
        .catch(function(error) {
            console.log(error);
            res.status(500).render("register", { 
                errors: { mensaje: "Error al registrar el usuario" },
                oldData: req.body 
            });
        });
},

  login: function(req, res) {
    res.render("login", {
        errors: {},
        oldData: {}
    })
},

  store_login: function(req, res) {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("login", { errors: errors.mapped(), oldData: req.body });
  }
    let usuario = req.body.usuario;
    let contrasenia = req.body.contrasenia;

    let coinciden = {
      where: { usuario: usuario }
    };

    db.Usuarios.findOne(coinciden)
      .then(function(result) {
        if (result) { // Si se encontró un usuario
          let claveComparada = bcrypt.compareSync(contrasenia, result.contrasenia);
          if (claveComparada) {
            req.session.user = result.dataValues;
            if (req.body.recordarme) {
              res.cookie('id', result.dataValues.id, { maxAge: 1000 * 60 * 60 });
            }
            let id = req.session.user.id;
            return res.redirect(`/users/profile/${id}`)
          } 
      }})
      .catch(function(error) {
        console.log(error);
        res.status(500).send("Error interno del servidor"); // Mensaje de error genérico
      });
  },
  logout:function(req,res){
    req.session.destroy();
    res.clearCookie("userId")
    return res.redirect("/")
 },

 profile: function(req, res) {
  const userId = req.params.id; // Obtener el ID del usuario de la URL
  const loggedInUserId = req.session.user.id; // Obtener el ID del usuario logueado de la sesión

  if (userId != loggedInUserId) {
      return res.status(403).send("No tienes permiso para acceder a este perfil");
  }

  db.Usuarios.findByPk(userId, {
      include: [
          { association: 'productos'},
          {association: 'comentarios'}
      ]
    })  
        .then(function(user) {
            if (user) {
              res.render("profile", { user: user })
              console.log(productos.comentarios)
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
  .then(function(){
    return db.Usuarios.findByPk(userId);
  })
  .then(function(user){
    if (user) {
      const successMessage = "Perfil actualizado correctamente";
      res.render("profile-edit", { user: user, successMessage: successMessage });
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  })
  .catch(function(error){
    console.error(error);
    res.status(500).send("Error al actualizar el perfil del usuario");
  });
},

editProfileForm: function(req, res) {
  const userId = req.params.id;

  db.Usuarios.findByPk(userId)
  .then(function(user){
    if (user) {
      res.render("profile-edit", { user: user});
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  })
  .catch(function(error){
    console.error(error);
    res.status(500).send("Error al cargar el formulario de edición del usuario");
  });
},
userNotLoged: function(req, res) {
  const userId = req.params.id; 

  db.Usuarios.findByPk(userId, {
      include: [
          { association: 'productos' }
      ]
  })
  .then(function(user) {
      if (user) {
          res.render("user", { user: user }); 
      } else {
          res.status(404).send("Usuario no encontrado");
      }
  })
  .catch(function(error) {
      console.log(error);
      let errors = { mensaje: "Error al buscar el usuario" };
      res.status(500).render("user", { errors: errors });
  });
},
}
module.exports = usersController;
