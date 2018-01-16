const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('mille xD')
})

app.get('/coucou', function (req, res) {
    res.send('TU MA DIS COUCOU C DROLE CA!')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})