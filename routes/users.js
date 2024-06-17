var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/register', usersController.register);

router.post("/register",usersController.store_register);


router.get('/login',usersController.login);
router.post("/login",usersController.store_login);

router.get("/profile-edit/:id",usersController.profileEdit)
router.get("/profile",usersController.profile);
router.get("/:id", usersController.user);

module.exports = router;
