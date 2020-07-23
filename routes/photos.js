var express = require('express');
var router = express.Router();
var PhotoController = require('../controllers/PhotoController');

router.post('/create', PhotoController.create);
router.get('/:id', PhotoController.all);

module.exports = router;
