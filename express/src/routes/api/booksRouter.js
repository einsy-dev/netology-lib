const bookController = require('../../controllers/bookController');
const multer = require('multer')
const upload = multer()

const router = require('express').Router();

router.get('/', bookController.getAll);
router.get('/:id', bookController.getById);
router.get('/:id/download', bookController.download)
router.post('/', upload.fields([{ name: 'fileBook' }, { name: 'fileCover' }]), bookController.create);
router.post('/:id', upload.fields([{ name: 'fileBook' }, { name: 'fileCover' }]), bookController.update);
router.delete('/:id', bookController.delete);

module.exports = router;