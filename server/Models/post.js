import mongoose from 'mongoose'
mongoose.Promise = global.Promise
import db from './db'
const PostSchema = new mongoose.Schema({
    author:String,
    title:String,
    content:String,
    flag: String,
    type: String,
    discussion: [],
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
    this.flag = date.getTime() + post.author;
    this.author = post.author;
    this.title = post.title;
    this.content = post.content;
    this.time = time;
    this.type = post.type;
    this.discussion = []
    this.save(cb);
};

PostSchema.methods.get = function(query,cb){
    if(query===null){
        return this.model('post').find(cb);
    }
    this.model('post').find(query,cb);
};

export default db.model('post',PostSchema);