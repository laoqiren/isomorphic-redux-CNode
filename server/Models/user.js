var mongoose = require("mongoose");
var db = require('./db');

var UserSchema = new mongoose.Schema({
    name: String,
    password:String
});
UserSchema.methods.saveUser = function(user,cb){
    this.name = user.name;
    this.password = user.password;
    this.save(cb);
};
UserSchema.methods.getUser = function(query,cb){
    if(query === null){
        return this.model('user').findOne(cb);
    }
    this.model('user').findOne(query,cb);
};

module.exports = db.model('user',UserSchema);