const mongoose = require('mongoose');
const urlMongod = "mongodb+srv://deivied:toto@cluster0.uctov.mongodb.net/db?retryWrites=true&w=majority"

const connectionDB = async () => {
    try {
        await mongoose.connect(urlMongod);
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    connectionDB,
}