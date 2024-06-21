var express = require('express');
var router = express.Router();
let productController = require("../controllers/productController");
const productAddValidator = require('../middlewares/productAddValidator');

router.get("/add", productController.add)
router.post("/add",productAddValidator,productController.store_add)
router.get("/:id",productController.product)
router.post("/comment/add", productController.addComment)

module.exports = router;