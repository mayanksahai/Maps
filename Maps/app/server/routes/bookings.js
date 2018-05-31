var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://mayank:sganesh@ds135750.mlab.com:35750/mayanktest",["bookings"]);

router.get("/bookings",function(req,res,next){
    db.bookings.find(function(err,bookings){
        if(err){
            res.send(err);
        }
        res.json(bookings);
    });
});

router.post("/bookings",function(req,res,next){
    var booking = req.body.data;
    var nearByDriver = req.body.nearByDriver;
    var io = req.app.io;
    if(!booking.username){
        res.status(400);
        res.json({error:"bad data"});
    }else{
        db.bookings.save(booking,function(error,savedBooking){
            if(error){
                res.send(error);
            }
            res.json(savedBooking);
            if(nearByDriver.socketId){
                console.log("driver is connected", nearByDriver.socketId);
                io.emit(nearByDriver.socketId + "driverRequest", savedBooking);
            }else{
                console.log("Driver not connected");
            }
        });
    }
});

module.exports = router;