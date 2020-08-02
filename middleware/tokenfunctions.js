let jwt = require("jsonwebtoken");

// JWT TOKEN  FUNCTIONS 
function createToken(email, id){
    return jwt.sign({email, id}, "secret")
}

function verify(token){
    return jwt.verify(token, "secret");
}

module.exports = {createToken, verify};