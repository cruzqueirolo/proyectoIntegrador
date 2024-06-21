const db = require("../database/models")
const op = db.Sequelize.Op
indexProd = db.productos

const indexController = {
    index: function(req,res){
        db.Productos.findAll()
        .then(function(data){
            res.render('index', { 
            product: data })
        })
        
    },
    search: function (req,res){
        let infoABuscar = req.query.search;
        db.Productos.findAll({
            where:[
                {nombreProducto: {[op.like]: '%' + infoABuscar + '%'}}
            ]
        })
            .then(data => {
                return res.render('search-results', {product: data});
            })
            .catch(error => {
                console.error('Error al buscar el producto:', error);
                res.status(500).render("error", { message: "Error al buscar el producto" });
            });
    }
}

module.exports = indexController 