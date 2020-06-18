const User = require('../models/user');
const config = require ('../config/server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async(req, res) => {
    let userData = req.body;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(userData.password, salt);
    let user = new User({
        name: userData.name,
        email: userData.email,
        password: password,
        isAdmin: false,
        date: Date.now()
    });

    user.save((error, registedUser)=>{
        if(error){
            console.log(error);
        }else{
            let payload = {subject: registedUser._id};
            let token = jwt.sign(payload, config.secret);
            res.status(200).send({token});
        }
    });
};

exports.login = async (req,res) => {
    let userData = req.body;

    User.findOne({email: userData.email}, (error, user)=>{
        if(error){
            console.log(error);
        }else{
            if(!user){
                res.status(401).send("Invalid email");
            } else
            if(!bcrypt.compare(userData.password, user.password)){
                res.status(401).send("Invalid Password");
            } else {
                let payload = {subject: user._id, isAdmin: this.isAdmin};
                let token = jwt.sign(payload, config.secret);
                res.status(200).send({token});
            }
        }
    })
};
