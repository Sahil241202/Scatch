const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require("../controllers/auth.controller")

router.get('/', function (req, res){
    res.send("Users Page");
});

router.post("/register",registerUser);
router.post("/login",loginUser);

module.exports = router;