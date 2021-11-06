const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },    
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user","admin","superadmin","director","head_of_engineering","operator"]
    },    
    emailToken: {
        type: String,
    },
    isVerified: {
        type:String,
        required: Boolean
    },
    userImage: {
        type: String,        
    },
    cloudinary_id: {
        type: String
    },

},  
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema);