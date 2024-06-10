const db = require("../database/models")
const op = db.Sequelize.Op

const productController = {
    product: function(req,res){
        id = req.params.id

        db.Productos.findByPk(id,{
           /* include: [
                { association: 'user'}
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