var express = require('express');
var request = require('request');
var mapping = require('../app/mapping');
var constant = require('../app/constant');

var router = express.Router();


/**
 * Get yxs2
 */
router.get('/yxs2', function(req, res) {
		console.log('===GET YXS2===\n');
		console.log(req);
		console.log('body: ' + req.body);
		console.log('===END===\n');
    res.sendStatus(200);
})

/**
 * POST yxs2
 */
router.post('/yxs2', function(req, res) {
		console.log('===POST YXS2===\n');
		console.log(req);
		console.log('body: ' + JSON.stringify(req.body));
		console.log('===END===\n');
    res.sendStatus(200);
})
module.exports = router;

