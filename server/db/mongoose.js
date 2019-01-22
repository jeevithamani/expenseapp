var mongoose = require('mongoose');
const config = require('./../../config/config');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.once('open', function(){
    console.log("Connection has been established");
});
mongoose.connection.on('error', function(){
    console.log("Error making a connection");
});
module.exports = {mongoose};