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
        let post = await Post.findOne({title : titleToFind});
        console.log("Post from db : ",post)
        let {title, text } = post;
        post ? res.send({ title, text, status : 200}) : res.send({status : 200})
    }
    catch(error){
        res.send({message : error, status : 404});
    }
};

async function getUserPosts(req, res){
    var candidate = req.params;
    console.log(candidate)
};

module.exports = {getPost, getPosts, getUserPosts};