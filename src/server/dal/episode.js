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
    let yes = body;
    yes.id = uuid;
    if(body.name && body.code && body.note
        && typeof body.name === "string" && typeof body.code === "string" && typeof body.note === "number") {

        fs.writeFile("data/" + "episode" + uuid + ".json", JSON.stringify(yes), function (error) {
            if (error !== null)
                throw error;

        });
        callback(false, {id: uuid});
    }
    else{
        callback(true, "Erreur ! Informations manquantes");
    }

}

exports.editEpisode = function(id, body,  callback){

    if(body.name && body.code && body.note
        && typeof body.name === "string" && typeof body.code === "string" && typeof body.note === "number"
        && typeof id === "string") {
        fs.writeFile("data/" + "episode" + id + ".json", JSON.stringify(body), function (error) {
            if (error !== null)
                throw error;
        });
        callback(false, body);
    }
    else{
        callback(true, "Erreur ! Informations manquantes");
    }
}

exports.getOneEpisode = function(id, callback) {

    if(typeof id === "number") {
        //find one episode by id
        let p = new Promise((resolve, reject) => {
            fs.readFile("data/" + "episode" + id + ".json", (err, data) => {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(JSON.parse(data))
                }
            });
        }).then((data) => {
            callback(data);

        }, () => {
            callback(false);
        });
    }
    else{
        callback("Id incorrect");
    }
}

exports.deleteEpisode = function (id, callback) {
    if(typeof id === "string" ) {
        fs.unlink("data/" + "episode" + id + ".json", (err) => {
            if (err) callback(false);
            console.log('successfully deleted /tmp/hello');
        });

        callback("deleted");
    }
    else{
        callback("Id incorrect");
    }
}