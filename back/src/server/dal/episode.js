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
            }, (err) => { callback("Retrieving error !"); });
    });
};

exports.createEpisode = function(body, callback){
    let uuid = uuidv4();
    let yes = body;
    yes.id = uuid;
    if(body.name && body.code && body.note
        && typeof body.name === "string" && typeof body.code === "string") {

        fs.writeFile("data/" + "episode" + uuid + ".json", JSON.stringify(yes), function (error) {
            if (error !== null)
                throw error;

        });
        callback(false, {id: uuid});
    }
    else{
        callback(true, "Error ! Missing values");
    }

}

exports.editEpisode = function(id, body,  callback){

    if(body.name && body.code && body.note
        && typeof body.name === "string" && typeof body.code === "string" && typeof id === "string") {
        fs.writeFile("data/" + "episode" + id + ".json", JSON.stringify(body), function (error) {
            if (error !== null)
                throw error;
        });
        callback(false, body);
    }
    else{
        callback(true, "Error ! Invalid informations");
    }
}

exports.getOneEpisode = function(id, callback) {

    if(typeof id === "string") {
        //find one episode by id
        let p = new Promise((resolve, reject) => {
            fs.readFile("data/" + "episode" + id + ".json", (err, data) => {
                if (err) {
                    reject("Impossible to retrieve an episode");
                }
                else {
                    resolve(JSON.parse(data));
                }
            });
        }).then((data) => {
            callback(false, data);

        }, (data) => {
            callback(true, data);
        });
    }
    else{
        callback(true, "Incorrect ID");
    }
}

exports.deleteEpisode = function (id, callback) {
    if(typeof id === "string" ) {
        fs.unlink("data/" + "episode" + id + ".json", (err) => {
            if (err) callback(true, "Deleting generated an error");
        });

        callback(false, "Deleted");
    }
    else{
        callback(true, "Incorrect ID");
    }
}