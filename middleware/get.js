let Post = require("../models/post.js");
const User = require("../models/user.js");

async function getPosts(req, res){
    let posts = await Post.find({});
    console.log("Posts : ", posts);
    res.send({posts});
};

async function getPost(req, res){
    try{
        var titleToFind = req.params.title;
        console.log(titleToFind);
        var post = await ( await Post.findOne({title : titleToFind}).populate("creator"));
        post ? res.send({ post, status : 200}) : res.send({status : 404})
    }
    catch(error){
        res.send({message : error, status : 404});
    }
};

async function getUser(req, res){
    var candidate = req.params.user;
    console.log(candidate);
    var user = await (await User.findOne({email : candidate}).populate("posts"));
    console.log("USER FROM DB : ", user);
    res.send({status : 200, user});
};

async function getUserPosts(req, res){
    var candidate = req.params;
    console.log(candidate)
};

module.exports = {getPost, getUser, getPosts, getUserPosts};