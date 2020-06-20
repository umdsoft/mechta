const User = require('../models/user');
const config = require ('../config/server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async(req, res) => {
    let userData = req.body;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(userData.password, salt);
    try {
        const isExistingUser = await User.findOne({phone : {
            countryCode : userData.phone.countryCode,
            companyCode : userData.phone.companyCode,
            phoneNumber : userData.phone.phoneNumber
        }});
        if(isExistingUser) {
            return res.status(409).json({
                success : false,
                message : {
                    ru : "Пользаватель с таким телефоном уже имеется",
                    uz : "Bunday telefon raqamli foydalanuvchi mavjud"
                }
            });
        }
        const user = new User({
            phone: {
                countryCode : userData.phone.countryCode,
                companyCode : userData.phone.companyCode,
                phoneNumber : userData.phone.phoneNumber
            },
            name : userData.name,
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
                res.status(200).send({success : true , token});
            }
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.login = async (req,res) => {
    let {phone,password} = req.body;
    try {
        const user = await  User.findOne({phone : phone });
        if(!user){
            return res.status(401).send({
                success : false,
                message : {
                    uz : "Bunday telefon raqamli foydalanuvchi mavjud emas",
                    ru : 'Пользователть с таким телефонным номером не сушествует'
                }
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).send({
                success : false,
                message : {
                    uz : "Parol hato",
                    ru : 'Неправильный пароль'
                }})
        }
        let payload = {subject: user._id, isAdmin: this.isAdmin};
        let token = jwt.sign(payload, config.secret);
        res.status(200).send({token, success : true});
    } catch (error) {
        console.log(error);
    }
};
