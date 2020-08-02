let Post = require("../models/post.js");
const User = require("../models/user.js");
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


module.exports = {updatePost, changePassword};