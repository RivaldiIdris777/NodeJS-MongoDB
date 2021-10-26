const express = require('express');
const router = express.Router();
const { checkAuth, checkRole, getAllUser, updateUser, deleteUser } = require('../Controller/SuperAdmin');
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../Controller/Product');
const upload = require('../Middleware/Multer');

// User Management
router.get('/super/getUser', checkAuth, checkRole(['superadmin']), getAllUser );
router.patch('super/updateUser/:userId', checkAuth, checkRole(['superadmin']), updateUser);
router.delete('super/deleteUser/:userId', checkAuth, checkRole(['superadmin']), deleteUser);

// Product Management
router.get('/super/getProducts', checkAuth, checkRole(['superadmin','user']), getAllProducts );
router.post('/super/addProduct', checkAuth, checkRole(['superadmin','user']), upload.single("productImage"), addProduct );
router.patch('/super/updateProduct/:productId', checkAuth, checkRole(['superadmin','user']), upload.single("productImage"), updateProduct );
router.delete('/super/deleteProduct/:productId', checkAuth, checkRole(['superadmin','user']), deleteProduct);

module.exports = router;