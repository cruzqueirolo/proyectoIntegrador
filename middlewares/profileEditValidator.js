const { body } = require("express-validator");
const db = require('../database/models');

const profileEditValidator = [
    body("email")
        .notEmpty()
        .withMessage("Debes completar este campo")
        .isEmail()
        .withMessage("Debes escribir un email válido"),


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

module.exports = profileEditValidator;