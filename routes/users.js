var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const registerValidator = require('../middlewares/registerValidator');
const loginValidator = require("../middlewares/loginValidator")
const profileEditValidator = require('../middlewares/profileEditValidator');

router.get('/register', usersController.register);
router.post("/register",registerValidator,usersController.store_register);
router.get('/login',usersController.login);
router.post("/login",loginValidator,usersController.store_login);


router.get("/logout",usersController.logout)
router.get("/profile/:id",usersController.profile);
<<<<<<< HEAD
=======

router.get('/show/:id', usersController.userNotLoged);



>>>>>>> refs/remotes/origin/main
router.get('/edit/:id', usersController.editProfileForm);
router.post('/edit/:id' ,usersController.profileEdit);
module.exports = router;
