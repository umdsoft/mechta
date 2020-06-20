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
    //foydalanuvchini tekshirish
    const candidate = await User.findOne({email: req.body.email})

    if(candidate){
        //parolni tekshirish
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            //token generatsiya qilish
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, config.secret, {expiresIn: 60 * 60 * 12 })
            res.status(200).json({
                token: `token`
            })
        } else {
            //parol xato bo`lsa
            res.status(401).json({
                message: "Parol xato"
            })
        }
    } else {
        //foydalanuvchi topilmasa
        res.status(404).json({message: "Foydalanuvchi topilmadi"})
    }
};
