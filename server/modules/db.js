var mongoose = require('mongoose');
// Mongo Connection //
var mongoURI = process.env.MONGODB_URI;

// var mongoURI = "mongodb://localhost:27017/meanmud";
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err, res) {
    if (err) {
        console.log("MONGO ERROR: ", err);
    }
    res.sendStatus(500);
});

mongoDB.once('open', function() {
    console.log("Connected to Mongo, meow!");
});

module.exports = mongoDB;