const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',        
    },
    desc: { 
        type: String, 
        required: true 
    },
    productImage: { 
        type:String, 
        required: true
    },
    cloudinary_id: {
        type: String,        
    }
}, { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);