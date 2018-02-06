const express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require("fs");

const episode = require('./dal/episode.js');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// GET ALL EPISODES
router.get('/', function (req, res) {

    episode.getEpisodes(function (data) {

        res.send(data);
    });

});

// POST ONE EPISODE
router.post('/', function (req, res) {

    episode.createEpisode(req.body, function (data) {

        res.send(data);
    });

});

// UPDATE ONE EPISODE
router.put('/:id', function (req, res) {

    episode.editEpisode(req.params.id, req.body, function (data) {

        res.send(data);
    });

});

// GET ONE EPISODE
router.get('/:id', function (req, res) {

    episode.getOneEpisode(req.params.id, function(data){
        res.send(data);
    });

});

// DELETE ONE EPISODE
router.delete('/:id', function (req, res) {

    episode.deleteEpisode(req.params.id,  function (data) {

        res.send(data);
    });

});

module.exports = router