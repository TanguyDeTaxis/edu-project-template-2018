const frisby = require('frisby');

const uuidv4 = require('uuid/v4');

const URL = 'http://localhost:'+process.env.SERVER_PORT+'/api/episodes'; 

it ('GET should return a status of 200 OK', function (done) {
  frisby
    .get(URL)
    .expect('status', 200)
    .done(done);
});

it ('POST should return a status of 201 Created', function (done) {
  frisby
    .post(URL, {
      id: uuidv4(),
      name: "Episode de test",
      code: "S00E00",
      note: 5
    })
    .expect('status', 201)
    .done(done);
});

