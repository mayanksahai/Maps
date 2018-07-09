var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://mayank:sganesh@ds135750.mlab.com:35750/mayanktest",["driverLocations"]);

//update driver socket id
router.put("/driverLocationSocket/:id",function(req,res,next){
    console.log("registering driver:"+ req.body.connectedDriver.payload.driverId);
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

//update driver socket id
router.post("/driverLocations",function(req,res,next){
    var driverLocation = req.body.driverLocation;
    var driverId = req.body.driverId;
    var socketId = req.body.socketId;
    var io = req.app.io;
    if(!driverLocation.latitude){
        res.status(400);
        res.json({error:"bad data"});
    }else{
        var coords = [driverLocation.latitude,driverLocation.longitude];
        var payload = {
            "driverId":driverId,
            "coordinate":{
                "type":"point",
                "coordinates":coords
            },
            "socketId":socketId
        }
        db.driverLocations.save(payload,function(error,savedLocation){
            if(error){
                res.send(error);
            }
            res.json(savedLocation);
            console.log("Driver id:"+driverId + " is connected with socketId:" +socketId + " and at location:%s" + driverLocation.latitude + ":" + driverLocation.longitude);
        });  
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

//Get Single Driver and emit track by user to driver
router.get("/driverLocation/:id", function(req, res, next){
    var io = req.app.io;
    db.driversLocation.findOne({driverId: req.params.id},function(err, location){
        if (err){
            res.send(err);
        }
        res.send(location);
        io.emit("trackDriver", location);
    });
});

//Update Location by driver to user
router.put("/driverLocation/:id", function(req, res, next){
    console.log("update driver location and socket id in database");
    var io = req.app.io;
    var location = req.body;
    var latitude = parseFloat(location.latitude);
    var longitude = parseFloat(location.longitude);
    if (!location){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.driversLocation.update({_id: mongojs.ObjectId(req.params.id)},{ $set: {
                socketId:location.socketId,
                coordinate:{
                    "type": "Point",
                    coordinates:[
                        longitude,
                        latitude
                    ]
                }
            }}, function(err, updateDetails){
            if (err){
                console.log(updateDetails);
                res.send(err);
            }
            if (updateDetails){

                //Get updated location
                db.driversLocation.findOne({_id:  mongojs.ObjectId(req.params.id)},function(error, updatedLocation){
                    if (error){
                        res.send(error);
                    }
                    res.send(updatedLocation);
                    io.emit("action", {
                        type:"UPDATE_DRIVER_LOCATION",
                        payload:updatedLocation
                    });
                });
            }
        });
    }
});

module.exports = router;