const mongoose = require('mongoose');
const ProductModel = require('../models/Product');
const cloudinary = require('../Middleware/Cloudinary');
const Category = require('../models/Category')

const getAllProducts = async (req, res) => {
    try {
        const getDataProducts = await ProductModel.find().populate('category','nameCategory');
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

        if(req.file === undefined) {
            console.log(req.file)
            return res.status(500).json("Data Kosong")
        }

        Category.findById(req.body.categoryId);
        const cld = await cloudinary.uploader.upload(req.file.path)        
        const productForm = new ProductModel({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            desc: req.body.desc,
            productImage: cld.url,
            cloudinary_id: cld.public_id
        })        
        await productForm.save();
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

        const findImage = await ProductModel.findById({ _id:id })

        let Image = findImage.cloudinary_id        

        await cloudinary.uploader.destroy(Image)

        if (req.file === undefined) {
            console.log(req.file)
            return res.status(500).json("Data Kosong");
        }        

        const cld = await cloudinary.uploader.upload(req.file.path)        

        const productForm = {
            name: req.body.name,
            price: req.body.price,
            categoryId: req.body.category,
            desc: req.body.desc,
            productImage: cld.url,
            cloudinary_id: cld.public_id
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

        const findImage = await ProductModel.findById({ _id:id })

        let Image = findImage.cloudinary_id        

        await cloudinary.uploader.destroy(Image)
        
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
        })
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
}