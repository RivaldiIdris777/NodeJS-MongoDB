require('dotenv').config();

module.exports = {
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    USEREMAIL: process.env.USEREMAIL ,
    EMAILPASSWORD: process.env.EMAILPASSWORD,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
}