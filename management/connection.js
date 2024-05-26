const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

async function connect_mongo(url) {
    console.log('Connecting');
    return mongoose.connect(url);
};

module.exports = {
    connect_mongo
};