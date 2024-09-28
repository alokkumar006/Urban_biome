const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    air_quality: String,
    heat_islands: String,
    infrastructure: String,
    underserved: String,
    improvement: String,
    importance: Number,
    latitude: Number,
    longitude: Number
}, { collection: 'Consumerdata' }); // Use the correct collection name

// Create the model
const userData = mongoose.model('TelecomData', userSchema);

module.exports = userData;
