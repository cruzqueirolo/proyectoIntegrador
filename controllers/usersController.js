const db = require("../database/models")
index = db.usuarios

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
      // res.render("profile",{
      //    title: "Laurent Watches",
      //    id: req.params.id
      // })
      const id = req.params.id;
      db.User.findByPk(id)
          .then(function(user) {
              if (user) {
                  res.render("profile", {
                      title: "Laurent Watches",
                      user: user,
                      index: [{ usuario: user.email }] // Pass the user data here
                  });
                  console.log(user);
              } else {
                  res.render("profile", {
                      title: "Laurent Watches",
                      user: null,
                      error: "User not found"
                  });
              }
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
