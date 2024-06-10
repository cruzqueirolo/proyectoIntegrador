const db = require("../database/models")
const op = db.Sequelize.op
indexProd = db.productos

const indexController = {
    index: function(req,res){
        db.Productos.findAll()
        .then(function(data){
            res.render('index', { 
            product: data })
            console.log(data)
        })
        
    },
    search: function(req,res){
        res.render("search-results",{
            title: "Laurent Watches"
        })
    }}

module.exports = indexController 