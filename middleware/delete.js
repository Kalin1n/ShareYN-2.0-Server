let Post = require("../models/post.js");
let User = require("../models/user.js");
let verify = require("../middleware/tokenfunctions.js").verify;

async function deleteUser(req, res){
    try{
        console.log("DELETE USER REQUEST");
        var {email, password} = req.body; 
        var token = req.headers["authorization"].split(" ")[1];
        let candidate = verify(token);
        if(candidate.email === email){
            let userToDelete = await User.findOne({email : email});
            let check = userToDelete.password === password;
            if(check){
                await User.deleteOne({email : email});
                res.send({message : "USER DELETE DONE ", email, status : 200 })
            }
        }
        else{
            res.send({status : 404, message : ""})
        }
    }
    catch(error){
        res.send({message : "USER CANT BE DELETED", status : 404});
    }
}; 

async function deletePost(req, res){
    try{
        console.log("DELETE POST REQUEST");
        var {title} = req.body;
        var token = req.headers["authorization"].split(" ")[1];
        let candidate = verify(token);
        if(candidate){ 
            let creator = await User.findOne({email : candidate.email});
            await Post.deleteOne({title : title, creator : creator._id});
            res.send({message : "TITLE DELETED", status : 200})
        }
        else{ 
            res.send({message : "POST CANT BE DELETED UNVERYFIED USER", status : 404});
        }
    }
    catch(error){
        res.send({message : "POST CANT BE DELETED", status : 404});
    }
}; 

module.exports = {deleteUser, deletePost};