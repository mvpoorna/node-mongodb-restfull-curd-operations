var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/user');

router.get('/list', user_controller.indexAPI);
router.post('/create', user_controller.create);
router.get('/:id', user_controller.show);
router.put('/:id/update', user_controller.update);
router.delete('/:id/delete', user_controller.destroy);

module.exports = router;