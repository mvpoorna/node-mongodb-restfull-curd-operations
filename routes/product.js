var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var product_controller = require('../controllers/product');


// a simple test url to check that all of our files are communicating correctly.
//router.get('/products', product_controller.test);

router.get('/products', product_controller.indexAPI);
router.post('/create', product_controller.create);
router.get('/:id', product_controller.show);
router.put('/:id/update', product_controller.update);
router.delete('/:id/delete',product_controller.destroy);

module.exports = router;