const express = require('express');
const router = express.Router();
const { getAllCategories, addCategory, updateCategory, deleteCategory } = require('../Controller/Category');

router.get('/getCategories', getAllCategories );
router.post('/addCategory', addCategory );
router.patch('/updateCategory/:categoryId', updateCategory );
router.delete('/deleteCategory/:categoryId', deleteCategory);

module.exports = router;