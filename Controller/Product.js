const mongoose = require('mongoose');
const ProductModel = require('../models/Product');

const getAllProducts = async (req, res) => {
    try {
        const getDataProducts = await ProductModel.find();
        return res.status(201).json({
            message: "Success get all data products",
            success: true,
            listProduct: {
                getDataProducts
            }
        })
        
    } catch (error) {
            return res.status(500).json({
                message: "Failed get all data products",
                success: false,
                listProduct: null,            
            }, console.log(error)
        )
    }
}

const addProduct = async (req, res) => {
    try {
        const productForm = new ProductModel({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            desc: req.body.desc,
            productImage: req.body.productImage
        })

        productForm.save();
        return res.status(201).json({            
            message: "Success, Data product has saved",
            success: true,
            detailProduct: productForm
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed, Product data not save",
            success: false,
            detailProduct: null
        },
        console.log(error)
        )        
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.productId;
        const productForm = {
            name: req.body.name,
            price: req.body.price,
            desc: req.body.desc,
            productImage: req.body.productImage
        };

        await ProductModel.findByIdAndUpdate(id, productForm, { new: true})
        return res.status(201).json({
            message: "Success, Product data updated",
            success: false,
            detailProduct: {
                productForm
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed, Product data not updated",
            success: false,
            detailProduct: null
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.productId;
        
        await ProductModel.deleteOne({ _id:id })
        return res.status(500).json({
            message: "Success, Product data deleted",
            success: false,
            detailProduct: id
        })
    } catch (error) {
        return res.status(500).json({
            message: "Success, Product data deleted",
            success: false,
            detailProduct: id
        })
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
}