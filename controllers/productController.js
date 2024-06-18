const db = require("../database/models")
const op = db.Sequelize.Op
const { validationResult } = require("express-validator");

const productController = {
    product: function(req,res){
        id = req.params.id

        db.Productos.findByPk(id,{
            include: [
                { association: 'user'}
            ]
        })
            .then(function(data) {
                res.render("product", {product: data})
            })
    },
    add: function(req,res) {
        if (req.session.user == undefined){
            return res.redirect("/users/register");
        } else {
          res.render("product-add",{
            title: 'Laurent Watches'
        });  
        }  
    },
    store_add: function(req,res){
        let info = req.body;
        let product = {
            idUsuario: req.session.user.id,
            imagen: info.imagen,
            nombreProducto: info.nombreProducto,
            descripcion: info.descripcion
        };
        db.Productos.create(product)
         .then(() => {
            return res.redirect("/users/profile")
        })
         .catch(error => {
            console.log(error)
            res.status(500).send("Error al crear el producto")
        })
    }
}

module.exports = productController 