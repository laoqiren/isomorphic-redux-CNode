import mongoose from 'mongoose'
import db from './db'
const PostSchema = new mongoose.Schema({
    name:String,
    title:String,
    content:String,
    time:{}
});
PostSchema.methods.savePost = function(post,cb){
    const date = new Date();
    const time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
    };
    this.name = post.name;
    this.title = post.title;
    this.content = post.content;
    this.time = time;
    this.save(cb);
};

PostSchema.methods.get = function(query,cb){
    if(query===null){
        return this.model('post').find(cb);
    }
    this.model('post').find(query,cb);
};

export default db.model('post',PostSchema);