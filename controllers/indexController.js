const db = require("../database/models")
const op = db.Sequelize.Op
indexProd = db.productos

const indexController = {
    index: function (req, res) {
        db.Productos.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                { association: 'comentarios' },
            ]
        })
            .then(function (data) {
                res.render('index', {
                    product: data
                })
                console.log(JSON.stringify(data, null, 4))
            })

    },
    search: function (req, res) {
        let infoABuscar = req.query.search;
        db.Productos.findAll({
            where: {
                [op.or]: [
                    { nombreProducto: { [op.like]: '%' + infoABuscar + '%' } },
                    { descripcion: { [op.like]: '%' + infoABuscar + '%' } }
                ]
            }
        })
            .then(data => {
                if (data.length === 0) {
                    // Si no se encontraron productos, renderiza la vista sin resultados
                    return res.render('search-results', { product: data, message: 'No se encontraron resultados' });
                } else {
                    // Si se encontraron productos, renderiza la vista con los resultados
                    return res.render('search-results', { product: data });
                }
            })
    }
}

module.exports = indexController 