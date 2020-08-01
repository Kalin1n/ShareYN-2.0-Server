let Router = require("express").Router;
// MIDDLEWARE 
    // POST
let createUser = require("../middleware/post.js").createUser;
let signUser = require("../middleware/post.js").signUser;
let createPost = require("../middleware/post.js").createPost;
    // GET
let getPost = require("../middleware/get.js").getPost;
let getPosts = require("../middleware/get.js").getPosts;
const router = Router(); 

// ENTRY POINT 
router.get("/", (req, res)=>{ 
    res.send({
        message : "CRUD SERVER",
        status : 200
    });
});

// GET ALL POSTS 
router.get("/post", getPosts);

// GET ALL USERS 
//router.get("/users", getAllUsers);

// GET ONE POST 
router.get("/post/:title", getPost);

// POST ONE POST 
router.post("/post", createPost);

router.post("/register", createUser);

router.post("/signIn", signUser)

module.exports = router;