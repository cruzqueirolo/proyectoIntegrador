var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const registerValidator = require('../middlewares/registerValidator');

router.get('/register', usersController.register);

router.post("/register",registerValidator,usersController.store_register);


router.get('/login',usersController.login);
router.post("/login",usersController.store_login);
router.get("/logout",usersController.logout)

router.get("/profile-edit/:id",usersController.profileEdit)
router.get("/profile/:id",usersController.profile);


module.exports = router;
