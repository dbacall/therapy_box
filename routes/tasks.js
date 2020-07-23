var express = require('express');
var router = express.Router();
var TaskController = require('../controllers/TaskController');

router.post('/create', TaskController.create);
router.get('/:id', TaskController.all);
router.post('/task/:id', TaskController.update);

module.exports = router;
