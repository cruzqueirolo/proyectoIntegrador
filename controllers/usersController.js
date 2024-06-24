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
        console.log(errors.mapped()); 
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
      });
  },
  logout:function(req,res){
    req.session.destroy();
    res.clearCookie("userId")
    return res.redirect("/")
 },

 profile: function(req, res) {
  const userId = req.params.id; 
  const loggedInUserId = req.session.user.id; 

  if (userId != loggedInUserId) {
      return res.status(403).send("No tienes permiso para acceder a este perfil");
  }

  db.Usuarios.findByPk(userId, {
      include: [
        
          { association: 'productos',
            order: [['createdAt', 'DESC']],
          include: [
            {
                model: db.Comentarios,
                as: 'comentarios',
                include: [
                    {
                        model: db.Usuarios,
                        as: 'usuario',
                        attributes: ['usuario']
                    }
                ]
              }
            ]
          }
        ]
      })  
        .then(function(user) {
            if (user) {
              let totalComentarios = 0;
              user.productos.forEach(producto => {
                  totalComentarios += producto.comentarios.length;
              });
              res.render("profile", { user: user, totalComentarios: totalComentarios })

            }
        })
        .catch(function(error) {
            console.log(error);
        });

 },
 profileEdit: function(req, res) {
  //  let errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(400).render("profile-edit", { errors: errors.mapped(), oldData: req.body, user: { id: req.params.id } });
  //  } no lo pudimos hacer funcionar
  
  const userId = req.params.id;
  const userData = req.body;
  
  
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
      res.send("Usuario no encontrado");
    }
  })
  .catch(function(error){
    console.error(error);
  });
},

editProfileForm: function(req, res) {
  const userId = req.params.id;

  db.Usuarios.findByPk(userId)
  .then(function(user){
    if (user) {
      res.render("profile-edit", { user: user});
    } else {
      res.send("Usuario no encontrado");
    }
  })
  .catch(function(error){
    console.error(error);
  });
},
userNotLoged: function(req, res) {
  const userIdNotLoged = req.params.id; 

  db.Usuarios.findByPk(userIdNotLoged, {
    include: [
        {
            model: db.Productos,
            as: 'productos',
            include: [
                {
                    model: db.Comentarios,
                    as: 'comentarios',
                    include: [
                        {
                            model: db.Usuarios,
                            as: 'usuario',
                            attributes: ['usuario']
                        }
                    ]
                }
            ],
        }
    ]
})
  .then(function(userNotLoged) {
      if (userNotLoged) {
        let totalComentarios = 0;
        userNotLoged.productos.forEach(producto => {
            totalComentarios += producto.comentarios.length;
        });

        res.render("user", { userNotLoged: userNotLoged, totalComentarios: totalComentarios });
      } else {
          res.status(404).send("Usuario no encontrado");
      }
  })
  .catch(function(error) {
      console.log(error);
  });
},
}
module.exports = usersController;
