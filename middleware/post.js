let User = require("../models/user.js");
let Post = require("../models/post.js");
let jwt = require("jsonwebtoken");


// JWT TOKEN 
function createToken(email, id){
    return jwt.sign({email, id}, "secret")
}

function verify(token){
    return jwt.verify(token, "secret");
}

async function createUser(req, res){
    try{
        console.log("CREATE USER REQUEST : ", req.body);
        var {name, email, password} = req.body;
        let candidate = User({
            name : name,
            email : email,
            password : password
        });
        await candidate.save().catch( (error)=> {throw error})
        let newUser =  await User.findOne({name : name, email : email});
        if(newUser){
            res.send({status : 200, token : createToken(newUser.name, newUser._id)});    
        }
        else{
            res.send({status : 404, message : "Problem occured"});
        }
    }
    catch(error){
        console.log("Error : ", error);
        res.send({status : 400});
    }
};

async function signUser(req, res){ 
    try{
        console.log("LOGGIN USER REQUEST : ", req.body);
        var {email, password} = req.body;
        let candidate =  await User.findOne({email : email});
        if(candidate.password == password){
            res.send({message : "User logged", status : 200, token : createToken(candidate.email, candidate._id)});
        }
        else{ 
            console.log("Password dont match");
            res.send({message : "Passwords dont match", status : 404});
        }
    }
    catch(error){
        res.send({message : "User unlogged", status : 404});
    }
};

async function createPost(req, res){
    try{
        console.log("POST CREATE REQUEST : ", req.body);
        var {title, text} = req.body;
        var token = req.headers["authorization"].split(" ")[1];
        let data = verify(token);
        if(data){
            let candidate = await User.findOne({email : data.email});
            if(candidate){
                let newPost = Post({
                    title : title,
                    text : text,
                    creator : candidate._id
                });
                await newPost.save().catch( (error)=> {throw error});
                res.send({message : "POST CREATED ", status : 200})
            }
        }
    }
    catch(error){
        res.send({message : "POST CANT BE CREATED", status : 404})
    }
};
module.exports = {createUser, signUser, createPost};