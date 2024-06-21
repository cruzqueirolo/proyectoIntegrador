const { body } = require("express-validator");
const db = require('../database/models');
const { product } = require("../controllers/productController");

const  productAddValidator =[
    body("imagen")
        .notEmpty()
        .withMessage("debes introducir una imagen"),
    body("nombreProducto")
        .notEmpty()
        .withMessage("Debes introducir el nombre del producto"),
    body("descripcion")
        .notEmpty()
        .withMessage("Debes introducir la descripcion del producto")
]

module.exports = productAddValidator