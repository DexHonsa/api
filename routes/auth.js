const express = require("express");
const router = express.Router();
var multer = require("multer");
var MongoClient = require("mongodb").MongoClient;
var CircularJSON = require("circular-json");
var ObjectId = require("mongodb").ObjectId;
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var config = require("../config");

var URL =
"mongodb://dexhonsa:Awesomeo21!@hid-shard-00-00-6vaxg.mongodb.net:27017,hid-shard-00-01-6vaxg.mongodb.net:27017,hid-shard-00-02-6vaxg.mongodb.net:27017/test?ssl=true&replicaSet=HID-shard-0&authSource=admin&retryWrites=true"

router.post("/", (req, res, next) => {
  const { username, password } = req.body;
  var lowercase = username.toLowerCase();
  var passwordHash = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");
  MongoClient.connect(URL, function(err, db) {
    if (err) throw err;
    var collection = db.collection("users");
    collection.findOne({ username: lowercase, password: passwordHash }).then(
      result => {
        if (result != null) {
          var token = jwt.sign({ id: result._id, username: result.username, email: result.email }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });

          res.send({ auth: true, token: token });
        } else {
          res.status(401).send({ error: "Incorrect Credentials" });
        }
      },
      err => {
        res.status(401).send({ error: err });
      }
    );
  });
});
router.post("/signup", (req, res, next) => {
  const { username, password, email } = req.body;
  lowerEmail = email.toLowerCase();
  var lowercase = username.toLowerCase(); 
  if(username.indexOf(' ') > -1){
    res.status(401).send({error:'Usernames cannot have spaces'})
    return;
  }
  if(password.length < 6){
    res.status(401).send({error:'Passwords must have more than 6 characters'})
    return;
  }
  var passwordHash = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");
  MongoClient.connect(URL, function(err, db) {
    if (err) throw err;
    var collection = db.collection("users");
    collection.findOne({ username: lowercase }).then(result => {
      if (result == null) {
        collection.findOne({ email: lowerEmail }).then(result => {
          if (result == null) {
            collection
            .insert({
              username: lowercase,
              password: passwordHash,
              email: lowerEmail
            })
            .then(result => {
              res.send({
                userId: result.ops[0]["_id"],
                message: "Created Succesfully"
              });
            });
          } else {
            res.status(401).send({ error: "Email Exists" });
          }
        })

        
      } else {
        res.status(401).send({ error: "Username Exists" });
      }
    });
  });
});
router.get("/me", function(req, res) {
  var token = req.headers["authorization"];
  token = token.split(" ");
  if (!token[1])
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token[1], config.secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    res.status(200).send(decoded);
  });
});

module.exports = router;
