var express = require('express');
var router = express.Router();

router.get('/order', function(req, res) {
    res.json({ "product-name": "行動電源"});
})

router.get('/order/:id', function(req, res) {
    res.json({ "product-name": "行動電源 編號:" + req.params.id});
})

router.post('/order', function(req, res) {
    res.json({ 
        "product-name": "偽造的" + req.body.name,
        "count": req.query.count
    });
})

module.exports = router;