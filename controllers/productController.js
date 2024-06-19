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
                        attributes: ['usuario'] // Atributos que deseas obtener del usuario
                    }],
                    required: false
                }
            ]
        })
            .then(function (data) {
                console.log(data)
                const comentarios = data.comentarios
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map(comentario => ({
                        ...comentario.dataValues,
                        usuario: comentario.usuario ? comentario.usuario.usuario : 'Usuario desconocido'
                    }));
                 console.log('Comentarios:', comentarios);
                res.render("product", { product: data, comentarios, user: req.session.user });
            });
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
        let info = req.body;

        console.log('Información recibida:', info);
        console.log('Sesión de usuario:', req.session.user);

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
                console.error('Error al crear el producto:', error);
                res.status(500).send("Error al crear el producto");
            });
    },

    addComment: function(req, res) {
        let info = req.body;
        
        console.log('Información recibida:', info);
        console.log('Sesión de usuario:', req.session.user);
        
        let comment = {
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
                                attributes: ['usuario'] // Atributos que deseas obtener del usuario
                            }],
                            required: false
                        }
                    ]
                });
            })
            .then(product => {
                if (!product) {
                    return res.status(404).render("error", { mensaje: "Producto no encontrado" });
                }
                
                const comentarios = product.comentarios
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map(comentario => ({
                        ...comentario.dataValues,
                        usuario: comentario.usuario ? comentario.usuario.usuario : 'Usuario desconocido'
                    }));
                
                // Renderizar la vista del producto con los comentarios actualizados
                res.render("product", { product, comentarios, user: req.session.user });
            })
            .catch(error => {
                console.log(error);
                res.render("error", { mensaje: "Error al agregar el comentario" });
            });
    }
};

module.exports = productController;
