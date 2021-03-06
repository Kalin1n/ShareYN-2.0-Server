let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String, 
        required : true
    },
    posts : [{type : mongoose.Types.ObjectId, ref :"Post"}],
    comments : [{type : mongoose.Types.ObjectId, ref :"Comment"}]
});

let User = mongoose.model("User", UserSchema);

module.exports = User;