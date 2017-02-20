import mongoose from 'mongoose'
import db from './db'
mongoose.Promise = global.Promise
const UserSchema = new mongoose.Schema({
    name: String,
    passwd:String,
    score: Number
});
UserSchema.methods.saveUser = function(user,cb){
    this.name = user.name;
    this.passwd = user.passwd;
    this.score = 0;
    this.save(cb);
};
UserSchema.methods.getUser = function(query,cb){
    if(query === null){
        return this.model('user').findOne(cb);
    }
    this.model('user').findOne(query,cb);
};

export default db.model('user',UserSchema);