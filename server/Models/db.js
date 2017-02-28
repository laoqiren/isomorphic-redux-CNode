const mongoose = require("mongoose");
const db = mongoose.createConnection('localhost:27520/mycnode',{user:'laoqiren',pass:'luoxia.me'});
db.once('open',function(){
    console.log('we are connected to the database');
});

export default db;
