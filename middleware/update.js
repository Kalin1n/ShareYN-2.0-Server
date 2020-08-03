let Post = require("../models/post.js");
let User = require("../models/user.js");
let Comment = require("../models/coment.js");
let verify = require("../middleware/tokenfunctions.js").verify;

async function updatePost(req, res){
    try{
        var {text, title } = req.body;
        var token = req.headers["authorization"].split(" ")[1];
        let data = verify(token);
        if(data){
            let candidate = await User.findOne({email : data.email});
            if(candidate){
                let update = await Post.findOne({title : title});
                update.text = text; 
                await update.save().catch( (error)=> {throw error});
                res.send({message : "Post updated", status : 200})
            }
        }
    }
    catch(error){
        res.send({message : "POST CANT BE Updated", status : 404})
    }
};

async function changePassword(req, res){ 
    try{
        let {newPassword, email} = req.body;
        var token = req.headers["authorization"].split(" ")[1];
        let candidate = verify(token);
        if(candidate){
            let userToChange = await User.findOne({email : email}).catch((error)=> {throw new Error("CANT FIND USER WITH THAT EMAIL")});
            userToChange.password = newPassword;
            await userToChange.save().catch((error)=> {throw error});
            res.send({message : "Password updated", status : 200})
        }
    }
    catch(error){
        res.send({message : "Password cant be updated", status : 404})
    }
}; 

async function addComment(req, res){
    try{ 
        let {text, postTitle} = req.body;
        console.log("ADD COMMENT REQUEST : ", text, postTitle);
        var token = req.headers["authorization"].split(" ")[1];
        var candidate = verify(token);
        console.log(candidate);
        if(candidate){
            let post = await Post.findOne({title: postTitle});
            if(post){
                var newComment = new Comment({
                    text : text, 
                    postId : post._id,
                    commentator : candidate.id
                });
                newComment.save().catch( (error)=> {throw error});
                res.send({message : "Comment added", status : 200});
            }
        }else{
            res.send({message : "User unveryfied", status : 404});
        }
    }
    catch(error){
        res.send({error, message: "Comment cant be added", status : 404});
    }
};

module.exports = {updatePost, changePassword, addComment};