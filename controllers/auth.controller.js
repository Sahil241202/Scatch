const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const {generateToken} = require('../utils/generateToken');

module.exports.registerUser = async function (req, res) {
    try {
        let {email, fullname, password} = req.body;

        let user = await userModel.findOne({email});
        if(user) return res.status(401).send("You alreday have an account ,Please Login");

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if ( err ) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    })
                    let token = generateToken(user);
                    res.cookie("token", token);
                    return res.send("Account created successfully");
                }
            })
        })
    } catch (err) {
        console.error(err.message);
        return res.redirect('/');
    }
}

module.exports.loginUser = async function (req,res){
    let {email,password} = req.body;
    
    let user = await userModel.findOne({email: email});
    if(!user) return res.status(401).send("Invalid email or password");

    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            return res.send("Login successful");
        }
        else{
            return res.status(401).send("Invalid email or password");
        }
    });
};