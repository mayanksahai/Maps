var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://mayank:sganesh@ds135750.mlab.com:35750/mayanktest",["driverLocations"]);

//update driver socket id
router.put("/driverLocationSocket/:id",function(req,res,next){
    var io = req.app.io;
    if(!req.body){
        res.status(400);
        res.json({
            "error":"bad data"
        });
    }else{
        db.driversLocation.update({_id:mongojs.ObjectId(req.params.id)},
            {$set:{socketId:req.body.socketId}},function(error,updateDetails){
                if(error){
                    res.send(error);
                }else {
                    res.send(updateDetails);
                }
            }
            );
    }

});

// get nearby driver
router.get("/driverLocation",function(req,res,next) {
    db.driversLocation.ensureIndex({coordinate:"2dsphere"});
    db.driversLocation.find({
        coordinate:{
            "$near":{
                "$geometry":{
                    "type":"Point",
                    "coordinates": [parseFloat(req.query.longitude), parseFloat(req.query.latitude)]
                },
                "$maxDistance":10000
            }
        }
    },function(error,location){
        if(error){
            res.send(error);
        }else {
            res.send(location);
        }
    });
});

module.exports = router;