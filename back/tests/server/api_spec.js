const frisby = require('frisby');
const Joi = frisby.Joi;
const URL = 'http://localhost:'+process.env.SERVER_PORT+'/api/episodes';

describe('Posts', function () {
    it ('Create a valid episode',
        function (done) {
            frisby
                .post(URL, {
                    name: "ALEXIS MEURT AINSI QUE TOUTE SA FAMILLE",
                    code: "S03E01",
                    note: 20
                })
                .expect('status',200)
                .then(function (res) {
                    let id = res._body.id;
                    frisby.get(URL+"/"+id)
                        .expect('status', 200);

                    frisby.put(URL+"/"+id, {
                        id: res._body.id,
                        name: "ALEXIS MEURT IVRE",
                        code: "S03E01",
                        note: 18
                    })
                        .expect('status', 200);

                    frisby.del(URL+"/"+id)
                        .expect('status', 200);

                    return frisby.get(URL+"/iBZGOQUHGO")
                        .expect('status', 404);
                })
                .done(done);
        });

    it("Create a episode without all fields",
        function (done) {
            frisby
                .post(URL, {
                    name: "ALEXIS MEURT AINSI QUE TOUTE SA FAMILLE",
                    code: "S03E01"
                })
                .expect('status', 404)
                .done(done);
        });

    it("Create a episode without false fields",
        function (done) {
            frisby
                .post(URL, {
                    name: "ALEXIS MEURT AINSI QUE TOUTE SA FAMILLE",
                    code: 100,
                    note: "20"
                })
                .expect('status', 404)
                .done(done);
        });

});