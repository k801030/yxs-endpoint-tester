var express = require('express');
var request = require('request');
var mapping = require('../app/mapping');
var constant = require('../app/constant');

var router = express.Router();


var mapData = [];
let roomMapping = new Object();

var elevator = { // middle point between SYS Memorial Hall and Metro Opera House
    x: 570.275,
    y: 398.3
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

function calculateDistance(startingPoint) {
//    var  = startingPoints.elevator;
    var distanceData = [];
    for(i=0; i<mapData.length; i++) {
        var xMeter = Math.round((mapData[i].x - startingPoint.x) * constant.pixelToMeterRatio);
        var yMeter = Math.round((mapData[i].y - startingPoint.y) * constant.pixelToMeterRatio);
        distanceData[i] = {
            seq: mapData[i].seq,
            name: {
                en: mapData[i].name.en,
                zh: mapData[i].name.zh
            },
            x_meter: xMeter,
            y_meter: yMeter
        }
    }
    return distanceData;
}

init();




/**
 * Get all locations in floor 14th
 * query: type [pretty]
 */
router.get('/floor14/location', function(req, res) {
    var format = req.query.format;

    var obj = {"data": mapData};
    if(format == "html") {
        res.send("<pre>"+JSON.stringify(obj, null, 4)+"</pre>");
    } else {
        res.json(obj);
    }
})

/**
 * Get distance from starting point
 */
router.get('/floor14/distance', function(req, res) {
    var distanceData = calculateDistance(startingPoints.elevator);
    var format = req.query.format;

    var obj = {"data": distanceData};
    if(format == "html") {
        res.send("<pre>"+JSON.stringify(obj, null, 4)+"</pre>");
    } else {
        res.json(obj);
    }
})



/**
 * Get location of starting point
 */
router.get('/floor14/starting_points', function(req, res) {
    res.json(elevator);
})






router.get('/maps/floor14_mapping', function(req, res) {
    res.json({
        "info": "Data about floor 14 will show here.",
        "data": roomMapping
    });
})


module.exports = router;

