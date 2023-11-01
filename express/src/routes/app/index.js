const appController = require('../../controllers/appController');

const router = require('express').Router();

router.get('/:type?/:id?', appController.main);

module.exports = router;

