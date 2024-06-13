const { body } = require("express-validator");
const db = require('../database/models');
const bcrypt = require('bcryptjs');

const loginValidator = [
    body("email")
        .notEmpty().withMessage("Debes completar este campo")
        .isEmail().withMessage("Debes escribir un email válido"),

    body("password")
        .notEmpty().withMessage("Debes completar este campo")
        .custom((value, { req }) => {
            return db.usuarios.findOne({ where: { email: req.body.email } })
                .then(user => {
                    if (!user) {
                        return Promise.reject('No existe el usuario');
                    }
                    return bcrypt.compare(value, user.password)
                        .then(match => {
                            if (!match) {
                                return Promise.reject('Contraseña inválida');
                            }
                            req.user = user; // Guardamos el usuario en la request si la contraseña es válida
                            return true;
                        });
                });
        })
];

module.exports = loginValidator;
