var fs = require("fs");
const uuidv4 = require('uuid-v4');

exports.getEpisodes = function (callback) {
    //find all episodes
    fs.readdir("data", function (err, files) {
        if (err) {
            throw err;
        }

        let promises = [];

        files.forEach(function (file) {
            let p = new Promise((resolve, reject) => {
                fs.readFile("data/" + file, (err, data) => {
                    resolve(JSON.parse(data));
                });
            });
            promises.push(p);
        })

        Promise.all(promises)
            .then((data) => {
                callback(data);
            }, () => { callback("Erreur recupération"); });
    });
};

exports.createEpisode = function(body, callback){

    let uuid = uuidv4();
    fs.writeFile("data/" + "episode" + uuid + ".json", JSON.stringify(body), function (error) {
        throw error;
    });
    callback(body);

}

exports.editEpisode = function(id, body,  callback){


    fs.writeFile("data/" + "episode" + id + ".json", JSON.stringify(body), function (error) {
        throw error;
    });
    callback(body);

}

exports.getOneEpisode = function(id, callback) {


    //find one episode by id
    let p = new Promise((resolve, reject) => {
        fs.readFile("data/" + "episode" + id + ".json", (err, data) => {
            resolve(JSON.parse(data))
        });
    }).then((data) => {
        callback(data);

    }, () => { callback("Erreur recupération"); });

}

exports.deleteEpisode = function (id, callback) {

    fs.unlink("data/" + "episode" + id + ".json", (err) => {
        if (err) throw err;
        console.log('successfully deleted /tmp/hello');
    });

    callback("deleted");

}