const mongoose = require("mongoose");
import config from '../../config';
const db = mongoose.createConnection(`${config.dbaddr}:${config.dbport}/${config.db}`,{user:config.dbuser,pass:config.dbpwd});
db.once('open',()=>{
    console.log('we are connected to the database');
});

export default db;
