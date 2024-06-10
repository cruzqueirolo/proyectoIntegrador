const db = require("../database/models")

const usersController = {
   
   register: function(req, res) {
      res.render('register', {
         title: 'Laurent Watches'
      });
   },
   login: function(req,res){
      res.render('login',{
         title: 'Laurent Watches'
      })
   },
   profile: function(req,res){
      id = req.params.id
      const usuario = req.query.usuario;
      const contrasenia = req.query.contrasenia;

      db.Usuarios.findOne({
         where: {
            usuario: usuario,
            contrasenia: contrasenia
         }
      })
      .then(function(data){
         res.render("profile",{user:data})
         console.log(data)
      })
         
   },
   profileEdit: function(req,res){
      res.render("profile-edit",{
         title:"Laurent Watches"
      })
   }, 
   user: function(req,res){                
      res.render("user", {
         title: "Laurent Watches",
         id: req.params.id
      })
   }  
};

module.exports = usersController;
