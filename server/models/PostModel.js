const mongoose = require('mongoose');

// creates a Mongoose schema
const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    file: String,
    email: String,
    createdAt: { type: Date, default: Date.now } 
});


const PostModel = mongoose.model("posts", PostSchema);

module.exports = PostModel;