const db = require("../database/models")
const op = db.Sequelize.Op
indexProd = db.productos

const productController = {
    product: function(req,res){
        id = req.params.id

        db.Productos.findByPk(id,{
            /*include: [
                { association: 'users'},
                { association: 'comentarios'}
            ]*/
        })
            .then(function(data) {
                res.render("product", {product: data})
            })
    },
    add: function(req,res) {
        res.render("product-add",{
            title: 'Laurent Watches'
        });
    }
}

module.exports = productController 