const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
   name:String,
   email:String,
   password:String,
}, { collection: 'Consumerdata' }); // Use the correct collection name

// Create the model
const userData = mongoose.model('TelecomData', userSchema);

module.exports = userData;
