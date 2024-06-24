const { body } = require("express-validator");
const db = require('../database/models');
const bcrypt = require('bcryptjs');
const loginValidator = [
    body('usuario')
        .notEmpty().withMessage('Debes completar este campo')
        .custom(function (value) {
            return new Promise(function (resolve, reject) {
                db.Usuarios.findOne({ where: { usuario: value } })
                    .then(function (user) {
                        if (!user) {
                            reject('El usuario ingresado no existe');
                        } else {
                            resolve();
                        }
                    });
            });
        }),

    body('contrasenia')
        .notEmpty().withMessage('Debes completar este campo')
        .custom(function (value, { req }) {
            let usuario = req.body.usuario;

            return db.Usuarios.findOne({ where: { usuario: usuario } })
                .then(function (user) {
                    if (!user) {
                        return bcrypt.compare(value, '')
                    }

                    return bcrypt.compare(value, user.contrasenia)
                        .then(function (match) {
                            if (!match) {
                                return Promise.reject('Contraseña incorrecta');
                            }
                        });
                })
        }),
];

module.exports = loginValidator;
