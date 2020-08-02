let Router = require("express").Router;
// MIDDLEWARE 
    // POST
let createUser = require("../middleware/post.js").createUser;
let signUser = require("../middleware/post.js").signUser;
let createPost = require("../middleware/post.js").createPost;
    // GET
let getPost = require("../middleware/get.js").getPost;
let getPosts = require("../middleware/get.js").getPosts;
    // UPDATE 
let updatePost = require("../middleware/update.js").updatePost;
let changePassword = require("../middleware/update.js").changePassword;
    // DELETE
let deleteUser = require("../middleware/delete.js").deleteUser;
let deletePost = require("../middleware/delete.js").deletePost;

const router = Router(); 
// ENTRY POINT 
router.get("/", (req, res)=>{ 
    res.send({
        message : "CRUD SERVER",
        status : 200
    });
});

// GET
    // ALL POSTS 
router.get("/post", getPosts);  // DONE 
    // ONE POST 
router.get("/post/:title", getPost); // DONE

// POST 
    //CREATE POST
router.post("/post", createPost); // DONE
    // REGISTRATION
router.post("/register", createUser); // DONE
    // LOGIN IN
router.post("/signIn", signUser); // DONE

// UPDATE 
    // UPDATE POST 
router.put("/post", updatePost); // DONE 
    // UPDATE USER
router.put("/user", changePassword); // DONE

// DELETE 
    // DELET POST                           
router.delete("/post", deletePost);
    // DELETE USER
router.delete("/user", deleteUser); // DONE



module.exports = router;