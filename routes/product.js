var express = require('express');
var router = express.Router();
let productController = require("../controllers/productController")

router.get("/add", productController.add)
router.get("/:id",productController.product)

router.post("/add",productController.store_add)

module.exports = router;