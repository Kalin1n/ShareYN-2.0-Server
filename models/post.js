let mongoose = require("mongoose");

let PostSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : true,
        unique : true
    },
    text : {
        type : String, 
        required : true
    },
    creator : {
        type : mongoose.Schema.Types.ObjectId,
    }
});

let Post = mongoose.model("Post", PostSchema);

module.exports = Post;