var User   = require('../models/user');
var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');
var config = require('../config');

const saltRounds = 10;

exports.indexAPI = function(req, res){
    User.find({},function(req, users){
        res.send(users);
    });
};

exports.create = function(req, res){
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        mobile_number: req.body.mobile_number,
        status: req.body.status,
        created: req.body.created
    });

    user.save(function(err,next){
        if(err) return next(err);
        res.send("User Created Successfully.");
    })
};

exports.authenticateAPI = function(req, res){
    var password = req.body.password;
    
    User.find({"email":req.body.email}, function(req, user){
        bcrypt.compare(password, user[0].password, function(err, result) {
            if(result){
                const payload = {
                    admin: user.admin 
                };
                var token = jwt.sign(payload, config.secret, {
                    expiresIn: 1440 // expires in 24 hours
                });
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
            else{
                res.json({ success: true, message: 'Authentication failed. User not found.' });
            }
        });
    });
};

exports.show = function(req, res){
    User.findById(req.params.id,function(req, user){
        res.send(user);
    });
};

exports.update = function(req, res, next){
    User.findByIdAndUpdate(req.params.id,{$set:req.body},function(err,user){
        if(err) return next(err);
        res.send("User Details Updated.");
    });
};

exports.destroy = function(req, res, next){
    User.findByIdAndRemove(req.params.id,function(err){
        if(err) return next(err);
        res.send("User Deleted successfully.");
    })
}