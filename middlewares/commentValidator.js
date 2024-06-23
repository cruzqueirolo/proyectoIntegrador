const { body } = require('express-validator');

const commentValidator = [
  body('comentario')
    .notEmpty()
    .withMessage('El comentario no puede estar vacío')
    .isLength({ min: 3 })
    .withMessage('El comentario debe tener al menos 3 caracteres')
];

module.exports = commentValidator;