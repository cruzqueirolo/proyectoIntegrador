var express = require('express');
var router = express.Router();
const commentValidator = require('../middlewares/commentValidator');
let productController = require("../controllers/productController");
const productAddValidator = require('../middlewares/productAddValidator');


router.get("/add", productController.add)
router.post("/add",productAddValidator,productController.store_add)
router.get("/edit/:id",productController.edit)
router.post("/edit/:id",productController.update)
router.post("/comment/add",commentValidator, productController.addComment)
router.get("/:id",productController.product)
router.post("/:id/destroy", productController.destroy)


module.exports = router;