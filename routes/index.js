const express = require('express');
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require('../models/product.model');
const userModel = require('../models/user.model');

router.get("/",function(req,res){
    let error = req.flash("error");
    res.render("index",{error, isloggedin: false});
});

router.get("/shop",isloggedin,async function(req,res){
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop",{products, success});
});
router.get("/logout",isloggedin,function(req,res){
    res.render("shop");
})

module.exports = router;