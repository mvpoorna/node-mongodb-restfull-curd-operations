var User = require('../models/user');

exports.indexAPI = function(req, res){
    User.find({},function(req, users){
        res.send(users);
    });
};

exports.create = function(req, res){
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        mobile_number: req.body.mobile_number,
        status: req.body.status,
        created: req.body.created
    });

    user.save(function(err){
        if(err) return next(err);
        res.send("User Created Successfully.");
    })
};

exports.show = function(req, res){
    User.findById(req.params.id,function(req, user){
        res.send(user);
    });
};

exports.update = function(req, res){
    User.findByIdAndUpdate(req.params.id,{$set:req.body},function(err,user){
        if(err) return next(err);
        res.send("User Details Updated.");
    });
};

exports.destroy = function(req, res){
    User.findByIdAndRemove(req.params.id,function(err){
        if(err) return next(err);
        res.send("User Deleted successfully.");
    })
}