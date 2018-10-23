const express = require("express");
const router = express.Router();
var multer = require("multer");
var MongoClient = require("mongodb").MongoClient;
var CircularJSON = require("circular-json");
var ObjectId = require("mongodb").ObjectId;
var crypto = require("crypto");

var URL =
"mongodb://dexhonsa:Awesomeo21!@hid-shard-00-00-6vaxg.mongodb.net:27017,hid-shard-00-01-6vaxg.mongodb.net:27017,hid-shard-00-02-6vaxg.mongodb.net:27017/test?ssl=true&replicaSet=HID-shard-0&authSource=admin&retryWrites=true";

  router.post("/search", (req, res, next) => {
    
    const { term, categories, page } = req.body;
    const reg = new RegExp(term, 'i');
    var skip = page * 10 - 10;
    var query = {name: reg , $or: []};
    for(var i = 0; i < categories.length; i++){
      query.$or.push({type: {$all: [categories[i]]}})
    }
    if(categories.length == 0){
      query = {$or: [{name: reg}, {rep_name: {$regex: reg}}]}
    }
    
    MongoClient.connect(URL, function(err, db) {
      if (err) throw err;
      var collection = db.collection("professionals");
      var call = collection.find(query).sort({name:1}).skip(skip).limit(10);
      

      call.toArray(function(err, result){
        
        collection.count(query).then(count=>{
          res.send({query, items:result, total:count});
          // res.send({items:result, total:count});
        })
       
      })
        
    });
  });

  router.get("/search/:id", (req, res, next) => {
    
    const id = req.params.id;
    MongoClient.connect(URL, function(err, db) {
      if (err) throw err;
      var collection = db.collection("professionals");
      collection.findOne({ _id: ObjectId(id) }).then(result=>{
        res.send(result);
      })
              
    });
  });

  module.exports = router;