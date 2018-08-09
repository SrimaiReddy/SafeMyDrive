const _ = require('lodash');

var { mongoose } = require('./../../../db/mongoose');
var { Login } = require('./user.schemas');
var {tokencheck} = require('./../../../middleware/tokencheck');
const { SignUpModel } = require('./user.models');

let validateEmail = (req, res) => {
    var body = _.pick(req.body,['email']);
    SignUpModel.findOne({ email: body.email}).then((user) => {
        if(!user){
            return res.json({ code: 400, message: false});
        }        
        return new Promise((resolve, reject) =>{
                if(resolve){
                    return res.json({ code: 200, message: true});
                }
            });
        });
}
module.exports.validateEmail = validateEmail;

let signUp = (req,res) => {
    var body = _.pick(req.body,['fullname','email','password']);
    var signUpModel = new SignUpModel(body);
    signUpModel.save().then((user) => {
        if(user)
        return res.json({ code: 200, message: true});           
    }).catch((e) => {
        console.log(e);
        return res.json({ code: 400, message: e});        
    })
}

module.exports.signUp = signUp;

let signIn = (req,res) => {
    var body = _.pick(req.body,['email','password']);
    Login.findByCredentials(body.email,body.password).then((login) => {
        var newToken = login.generateAuthToken();
        console.log(login.email);
        return Login.updateToken(login.email,newToken).then((result) => {
            
            if(!result){
                return res.json({ code: 403, message: err });
            }
            return res.json({ code: 200, message: "User signin successful", token: newToken });           
        });
    }).catch((err) =>{
        res.json({ code: 403, message: err });
    });
}

module.exports.signIn = signIn;

let details = (req,res) => {    
    console.log(req.body.sname);
    Login.findByUser(req.body.sname).then((user) =>{
        console.log(user.password);
        return res.send(user.password);
    }).catch((e) => {
        res.status(400).send("User details not found!!");
    });
}

module.exports.details = details;