const mongoose = require('mongoose');
const ProductModel = require('../models/Product');

const getAllProducts = async (req, res) => {
    res.status(200).json({
        message: 'Success get request',
        success: true
    })
}

const addProduct = async (req, res) => {
    res.status(200).json({
        message: 'Success save request',
        success: true
    })
}

const updateProduct = async (req, res) => {
    res.status(200).json({
        message: 'Success update request',
        success: true
    })
}

const deleteProduct = async (req, res) => {
    res.status(200).json({
        message: 'Success get request',
        success: true
    })
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
}