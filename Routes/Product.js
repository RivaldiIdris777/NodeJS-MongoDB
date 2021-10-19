const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../Controller/Product');

router.get('/getProducts', getAllProducts );
router.post('/addProduct', addProduct );
router.patch('/updateProduct/:productId', updateProduct );
router.delete('/deleteProduct/:productId', deleteProduct);

module.exports = router;