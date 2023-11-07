const router = require('express').Router();
const multer = require('multer');
const userController = require('../../controllers/userController');
const passport = require('passport');

router.post('/register', multer().none(), userController.register);
router.post('/login', multer().none(), passport.authenticate('local', { failureRedirect: '/app/login' }), userController.login);
router.get('/profile', userController.profile);

module.exports = router;