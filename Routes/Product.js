const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../Controller/Product');
const upload = require('../Middleware/Multer');

router.get('/getProducts', getAllProducts );
router.post('/addProduct', upload.single("productImage"), addProduct );
router.patch('/updateProduct/:productId', upload.single("productImage"), updateProduct );
router.delete('/deleteProduct/:productId', deleteProduct);

module.exports = router;