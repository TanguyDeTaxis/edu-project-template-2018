const express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require("fs")
const uuidv4 = require('uuid/v4');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.get('/', function(req, res) {
   var fileReaded = [];

   fs.readdir("data", function (err, files) {
    if (err) {
        throw err;
    }
    
    files.forEach(function (file) {
        fileReaded.push(JSON.parse(fs.readFileSync("data/"+file)));
    });
    res.send(fileReaded);
  });
});

router.post('/', function (req, res) {
  let uuid = uuidv4();
   fs.writeFile("data/" + "episode" + uuid + ".json", JSON.stringify(req.body), function( error ) {
      throw error;
   });
   res.send(req.body);
});

router.put('/:id', function (req, res) {


});


module.exports = router

