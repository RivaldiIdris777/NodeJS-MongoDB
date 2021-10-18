const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../Controller/Product');

router.get('/getProducts', getAllProducts );
router.post('/addProduct', addProduct );
router.patch('/updateProduct', updateProduct );
router.delete('/deleteProduct', deleteProduct);

module.exports = router;