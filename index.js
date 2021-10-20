const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { success, error } = require("consola");
const morgan = require('morgan');
const { DB_NAME, DB_USERNAME, DB_PASSWORD, PORT } = require('./config/keyfile');

const productRoutes = require('./Routes/Product');
const categoryRoutes = require('./Routes/Category');

// Running ExpressJs
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(morgan("dev"));
app.use(cors());

// Routes Product
app.use('/node/', productRoutes);
app.use('/node/', categoryRoutes);


// MongoDB Connect
const mongoStart = async () => {
    try {
        // Connect to mongodb
        await mongoose.connect("mongodb://"+ DB_USERNAME +":"+ DB_PASSWORD +"@cluster0-shard-00-00.fl3yi.mongodb.net:27017,cluster0-shard-00-01.fl3yi.mongodb.net:27017,cluster0-shard-00-02.fl3yi.mongodb.net:27017/"+ DB_NAME +"?ssl=true&replicaSet=atlas-ixle32-shard-0&authSource=admin&retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,                          
        })
        mongoose.Promise = global.Promise
        success({
            message: `Success connected with the database \n ${DB_USERNAME}`,
            badge: true
        })
        app.listen(PORT, () => 
            success({
                message: `Server started on PORT ${PORT}`, badge: true
            })
        );
    } catch (err) {
        error({
            message: `Unable to connect with Database \n${err}`,
            badge: true
        })        
        mongoStart();
    }
}

mongoStart();
