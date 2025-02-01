const express = require('express');
const router = express.Router();
const {registerUser, loginUser,logout} = require("../controllers/auth.controller")
const isloggedin = require("../controllers/auth.controller")

router.get('/', function (req, res){
    res.send("Users Page");
});

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logout);

module.exports = router;