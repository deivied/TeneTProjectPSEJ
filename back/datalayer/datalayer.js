const mongoose = require('mongoose');
const urlClusterMongod = "mongodb+srv://deivied:toto@cluster0.uctov.mongodb.net/db?retryWrites=true&w=majority"
const urlMongod = "mongodb://localhost:27017/db";
const connectionDB = async () => {
    try {
        await mongoose.connect(urlClusterMongod);
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    connectionDB,
}