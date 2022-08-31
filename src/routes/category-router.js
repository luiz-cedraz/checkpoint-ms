const express = require('express');
const router = express.Router(); 
const categoryController = require('../controllers/category-controller')

router.get('/:categoryId', categoryController.getById);
router.delete('/:categoryId', categoryController.deleteById);
router.put('/:categoryId', categoryController.update);
router.get('/', categoryController.get);
router.post('/', categoryController.post);

module.exports = router;