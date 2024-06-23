var express = require('express');
var router = express.Router();
const commentValidator = require('../middlewares/commentValidator');
let productController = require("../controllers/productController");
const productAddValidator = require('../middlewares/productAddValidator');


router.get("/add", productController.add)
router.post("/add",productAddValidator,productController.store_add)
router.get("/:id/edit",productController.edit)
router.post("/:id/update",productController.update)
router.post("/comment/add",commentValidator, productController.addComment)
router.get("/:id",productController.product)

module.exports = router;