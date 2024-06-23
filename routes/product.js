var express = require('express');
var router = express.Router();
let productController = require("../controllers/productController");
const productAddValidator = require('../middlewares/productAddValidator');


router.get("/add", productController.add)
router.post("/add",productAddValidator,productController.store_add)
router.get("/:id/edit",productController.edit)
router.post("/:id/update",productController.update)
router.post("/comment/add", productController.addComment)
router.post("/delete/:id",productController.destroy)
router.get("/:id",productController.product)

module.exports = router;