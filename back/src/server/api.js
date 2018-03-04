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
    console.log("mille");
    episode.getEpisodes(function (data) {
        console.log(data);
        res.send(data);
    });

});

// POST ONE EPISODE
router.post('/', function (req, res) {
    episode.createEpisode(req.body, function (err, data) {
        if(err){
            res.status(404).send(data);
        }
        else{
            res.send(data);
        }
    });
});

// UPDATE ONE EPISODE
router.put('/:id', function (req, res) {

    episode.editEpisode(req.params.id, req.body, function (err, data) {
        if(err){
            res.status(404).send(data);
        }
        else{
            res.send(data);
        }
    });

});

// GET ONE EPISODE
router.get('/:id', function (req, res) {

    episode.getOneEpisode(req.params.id, function(err, data){
        if(err) {
            res.status(404).send(data);
        }
        else{
            res.send(data);
        }
    });

});

// DELETE ONE EPISODE
router.delete('/:id', function (req, res) {

    episode.deleteEpisode(req.params.id,  function (err, data) {
        if(err){
            res.status(404).send(data);
        }
        else{
            res.send(data);
        }
    });

});

module.exports = router