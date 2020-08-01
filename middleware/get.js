let Post = require("../models/post.js");

async function getPost(req, res){
    try{
        var titleToFind = req.params.title;
        let post = await Post.findOne({title : titleToFind});
        let {title, text } = post;
        post ? res.send({ title, text, status : 200}) : res.send({status : 200})
    }
    catch(error){
        res.send({message : error, status : 404});
    }
};

module.exports = {getPost}