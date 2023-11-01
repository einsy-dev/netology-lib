const router = require('express').Router();

router.use('/user', require('./userRouter'));
router.use('/book', require('./booksRouter'));

module.exports = router;