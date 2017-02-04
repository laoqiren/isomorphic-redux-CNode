const mongoose = require("mongoose");
const db = mongoose.createConnection('localhost','myBlog');
db.once('open',function(){
    console.log('we are connected to the database');
});

export default db;