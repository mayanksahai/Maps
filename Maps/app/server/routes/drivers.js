var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs("mongodb://mayank:sganesh@ds135750.mlab.com:35750/mayanktest",["drivers"]);

//Get Single Driver
router.get("/driver/:id", function(req, res, next){
    db.drivers.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, driver){
        if (err){
            res.send(err);
        }
        res.send(driver);
    });
});

module.exports = router;