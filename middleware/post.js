let User = require("../models/user.js");
let Post = require("../models/post.js");
let createToken = require("./tokenfunctions.js").createToken;
let verify = require("./tokenfunctions.js").verify;

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
            res.send({status : 200, token : createToken(newUser.email, newUser._id)});    
        }
        else{
            res.send({status : 404, message : "Problem occured"});
        };
    }
    catch(error){
        console.log("Error : ", error);
        res.send({status : 400});
    }
};

async function signUser(req, res){ 
    try{
        var {email, password} = req.body;
        console.log("LOGGIN USER REQUEST : ", email, password);
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
        var {title, text} = req.body;
        console.log("POST CREATE REQUEST", title, text);
        var token = req.headers["authorization"].split(" ")[1];
        let data = verify(token);
        console.log(data);
        if(data){
            let candidate = await User.findOne({email : data.email});
            if(candidate){
                let newPost = Post({
                    title : title,
                    text : text,
                    creator : candidate.id
                });
                newPost.creator = candidate;
                newPost.save().catch(err=> {throw err});    
                candidate.posts.push(newPost);
                await candidate.save().catch(err=> {throw err});
                res.send({message : "POST CREATED ", status : 200})
            }
        }
    }
    catch(error){
        res.send({message : "POST CANT BE CREATED", status : 404})
    }
};


module.exports = {createUser, signUser, createPost};