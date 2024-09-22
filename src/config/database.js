const mongoose =  require('mongoose');
const User = require('../models/userModel');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Yushi:Gys008@cluster0.voh7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB connected');

    }catch(error){
        console.error('MongoDB connection error: ', error)
        process.getMaxListeners(1);
    }
};
module.exports = connectDB;
