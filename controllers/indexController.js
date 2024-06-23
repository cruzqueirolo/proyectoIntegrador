const db = require("../database/models")
const op = db.Sequelize.Op
indexProd = db.productos

const indexController = {
    index: function(req,res){
        db.Productos.findAll({
            order: [
                ['createdAt','DESC']
            ],
            include: [
                { association: 'comentarios' },
            ]
        })
        .then(function(data){
            res.render('index', { 
            product: data })
            console.log(JSON.stringify(data,null,4))
        })
        
    },
    search: function (req,res){
        let infoABuscar = req.query.search;
        db.Productos.findAll({
            where: {
                [op.or]: [
                    { nombreProducto: {[op.like]: '%' + infoABuscar + '%'}},
                    {descripcion: {[op.like]: '%' + infoABuscar + '%'}}
                ]
            }
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