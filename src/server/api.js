var express = require('express')
var router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  res.send("Movies home page" + res.json);
})
router.post('/', function (req, res) {
    res.send('-- '+  JSON.stringify(req.body));
})

module.exports = router
