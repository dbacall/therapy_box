var express = require('express');
var router = express.Router();
var TeamController = require('../controllers/TeamController');

router.post('/create', TeamController.create);
router.get('/:id', TeamController.all);
router.post('/team/:id', TeamController.update);

module.exports = router;
