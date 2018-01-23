var express = require('express');
var request = require('request');
var mapping = require('../app/mapping');
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


/// 
var mapData = [];
let roomMapping = new Object();

var elevator = { // middle point between SYS Memorial Hall and Metro Opera House
    x: 154.67,
    y: 133
}
var startingPoints = {
    elevator
}

//"x":492.82, "y":331.8, "x":647.49, "y":464.8,

function init() {
    const page = "https://search.corp.yahoo.com/map/mapdata.php";
    var mapid = "784_TPE05_TPE05_14";

    var url = page + "?mapid=" + mapid;
    request(url, function(err, res, body) {
        
        let json = JSON.parse(body);
        labels = json.d[2].texts;
        names = json.d[3].texts;

        for(i=0; i<names.length; i++) {
            var label = json.d[2].texts[i].t;
            var name = json.d[3].texts[i].t;
            mapData[i] = {
                seq: labels[i].t,
                name: {
                  en: mapping[label + ""].en,
                  zh: mapping[label + ""].zh
                },
                x: labels[i].x,
                y: labels[i].y
            }
        }


        for(i = 0; i<json.d[3].texts.length;i++) {
            var label = json.d[2].texts[i].t;
            var name = json.d[3].texts[i].t;
            
            roomMapping[label + ""] = name;
        }
    });
}

init();

/**
 * Get all locations in floor 14th
 */
router.get('/maps/floor14', function(req, res) {
    res.json({
        "data": mapData
    });
})

/**
 * Get location of starting point
 */
router.get('/maps/starting_points', function(req, res) {
    res.json(elevator);
})


router.get('/maps/floor14_mapping', function(req, res) {
    res.json({
        "info": "Data about floor 14 will show here.",
        "data": roomMapping
    });
})



module.exports = router;

