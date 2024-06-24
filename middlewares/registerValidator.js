const { body } = require("express-validator");
const db = require('../database/models');

const registerValidator = [
    body("email")
        .notEmpty()
        .withMessage("Debes completar este campo")
        .isEmail()
        .withMessage("Debes escribir un email válido")
        .custom(function (email) {
            return db.Usuarios.findOne({ where: { email: email } })
                .then(function (user) {
                    if (user) {
                        return Promise.reject("El email ya está registrado");
                    }
                });
        }),


    body("usuario")
        .notEmpty()
        .withMessage("Debes completar este campo")
        .isLength({ min: 4 })
        .withMessage("El nombre de usuario debe tener al menos 4 caracteres"),



    body("contrasenia")
        .notEmpty()
        .withMessage("Debes completar este campo")
        .isLength({ min: 4 })
        .withMessage("La contraseña debe tener al menos 4 caracteres")
];

module.exports = registerValidator;