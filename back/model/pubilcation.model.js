const timespan = require('jsonwebtoken/lib/timespan');
const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    publication : {
        type : String,
    },

    date : {
        type : String,
        default : Date.now()
    },
    imageUrl: { 
        type: String, 
        required: true 
    },

    userId: { 
        type: String,
        required: true },

})

const publicationModel = mongoose.model('Publication', publicationSchema);

module.exports = publicationModel;