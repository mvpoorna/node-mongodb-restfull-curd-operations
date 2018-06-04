var Product = require('../models/product');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the controller!');
};

exports.indexAPI = function(req, res){
    Product.find({}, function(req, products){
        res.send(products);
    });
};

exports.create = function(req, res){
    var product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    product.save(function(err,next){
        if(err){
            return next(err);
        }
        res.send("Product Created Successfully.");
    })
};

exports.show = function(req, res, next){
    Product.findById(req.params.id, function(err, product){
        if(err) return next(err);
        res.send(product);
    });
};

exports.update = function(req, res, next){
    Product.findByIdAndUpdate(req.params.id,{$set: req.body}, function(err, product){
        if(err) return next(err);
        res.send('Product Updated Successfully.');
    });
};

exports.destroy = function(req, res, next){
    Product.findByIdAndRemove(req.params.id,function(err){
        if(err) return next(err);
        res.send("Product Removed Successfully.");
    });
}