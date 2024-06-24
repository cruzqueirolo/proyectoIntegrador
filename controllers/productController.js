const db = require("../database/models");
const op = db.Sequelize.Op;
const { validationResult } = require("express-validator");

const productController = {
    product: function (req, res) {
        const id = req.params.id;
        db.Productos.findByPk(id, {
            include: [
                { association: 'user' },
                {
                    model: db.Comentarios,
                    as: 'comentarios',
                    include: [{
                        model: db.Usuarios,
                        as: 'usuario',
                        attributes: ['usuario'] 
                    }],
                    required: false
                }
            ]
        })
            .then(function (data) {
                const comentarios = data.comentarios
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map(comentario => ({
                        ...comentario.dataValues,
                        usuario: comentario.usuario ? comentario.usuario.usuario : 'Usuario desconocido'
                    }));
                    const isOwner = req.session.user && req.session.user.id === data.idUsuario;
                res.render("product", { product: data, comentarios, user: req.session.user , isOwner, errors: []});
            })
    },
    add: function (req, res) {
        if (req.session.user == undefined) {
            return res.redirect("/users/register");
        } else {
            res.render("product-add", {
                title: 'Laurent Watches'
            });
        }
    },
    store_add: function (req, res) {
        let errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).render("product-add", { errors: errors.mapped(), oldData: req.body });
        }
        let info = req.body;

        let product = {
            idUsuario: req.session.user.id,
            imagen: info.imagen,
            nombreProducto: info.nombreProducto,
            descripcion: info.descripcion
        };

        db.Productos.create(product)
            .then(() => {
                return res.redirect("/users/profile/" + req.session.user.id);
            })
            .catch(error => {
                console.error(error);
            });
    },

    
    edit: function(req, res) {
        const id = req.params.id;
        db.Productos.findByPk(id)
        .then(function(prod) {
            if (!prod) {
                return res.send("Producto no encontrado");
            }
            res.render('product-edit', { producto: prod, user: req.session.user });
        })
        .catch(function(error) {
            console.error(error);
        });
    },
    
    update: function(req, res) {
        const id = req.params.id;
        const producto = req.body;
    
        db.Productos.update(producto, {
            where: { id: id }
        })
        .then(() => {
            return db.Productos.findByPk(id);
        })
        .then(prod => {
            if (prod) {
                res.redirect(`/product/${id}`);
            } else {
                return res.status(404).send("Producto no encontrado");
            }
        })
        .catch(error => {
            console.error( error);
        });
    },
    destroy: function(req, res) {
        const id = req.params.id;
    
        // Eliminar comentarios asociados al producto
        db.Comentarios.destroy({
            where: { idProducto: id }
        })
        .then(() => {
            // Una vez eliminados los comentarios, eliminar el producto
            return db.Productos.destroy({
                where: { id: id }
            });
        })
        .then(() => {
            return res.redirect(`/users/profile/${req.session.user.id}`);
        })
        .catch(error => {
            console.error(error);
        });
    }
    
    ,
    addComment: function(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const info = req.body;
            const comentarios = JSON.parse(info.comentarios);

            return res.status(400).render('product', { 
                product: { 
                    id: info.productoId, 
                    nombreProducto: info.productName, 
                    descripcion: info.productDescription, 
                    imagen: info.productImage }, 
                comentarios: comentarios,
                user: req.session.user, 
                errors: errors.array() 
            });
        } else {
            const info = req.body;
            const comment = {
                idUsuario: req.session.user.id,
                idProducto: info.productoId,
                comentario: info.comentario,
            };

            db.Comentarios.create(comment)
                .then(() => {
                    
                    return db.Productos.findByPk(info.productoId, {
                        include: [
                            { association: 'user' },
                            {
                                model: db.Comentarios,
                                as: 'comentarios',
                                include: [{
                                    model: db.Usuarios,
                                    as: 'usuario',
                                    attributes: ['usuario']
                                }],
                                required: false
                            }
                        ]
                    });
                })
                
                .then(product => {
                    if (!product) {
                        return res.status(404).render('error', { mensaje: 'Producto no encontrado' });
                    }

                    const comentarios = product.comentarios
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map(comentario => ({
                            ...comentario.dataValues,
                            usuario: comentario.usuario ? comentario.usuario.usuario : 'Usuario desconocido'
                        }));

                    res.render('product', { product, comentarios, user: req.session.user, errors: [] });
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
};

module.exports = productController;
