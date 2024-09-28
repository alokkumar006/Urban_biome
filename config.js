const mongoose = require('mongoose');

const dbConnect = async () => {
   await mongoose.connect('mongodb+srv://TeleGuide:TeleGuide%40123@cluster0.hlh9dih.mongodb.net/UrbanBiome?retryWrites=true&w=majority').then(() => {
        console.log("Database connection to TelecomData login done");
    }).catch((error) => {
        console.error("Database connection error:", error);
    });    
}

module.exports = dbConnect;