const express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require("fs")

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.get('/', function(req, res) {
    var file = fs.readFileSync("data/episodes.json", "utf-8");
    var json = JSON.parse(file);
    res.send(json);
});

router.post('/', function (req, res) {
   res.send(req.body);
});


module.exports = router

