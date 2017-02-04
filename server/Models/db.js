var mongoose = require("mongoose");
var db = mongoose.createConnection('localhost','blog');
db.once('open',function(){
    console.log('we are connected to the database');
});

module.exports = db;