const express = require('express');
const router = express.Router(); 
const produtoController = require('../controllers/product-controller')

router.get('/:productId', produtoController.getById);
router.delete('/:productId', produtoController.deleteById);
router.put('/:productId', produtoController.update);
router.get('/', produtoController.get);
router.post('/', produtoController.post);

module.exports = router;