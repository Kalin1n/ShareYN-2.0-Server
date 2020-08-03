let mongoose = require("mongoose");

let CommentSchema = new mongoose.Schema({
    text : { 
        type : String, 
        required : true
    }, 
    postId : { 
        type : mongoose.Schema.Types.ObjectId, 
        ref : "Post",
        required : true
    }, 
    commentator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;