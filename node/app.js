var bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello World!'))


var nextDestination = {};

app.post('/setNextDestination', (req, res) => {
    console.log("Set");
    nextDestination.city = req.body[0];
    nextDestination.country = req.body[1];
    console.log(nextDestination);

    res.send('OK!');
    res.status(200);

});

app.get('/getNextDestination', (req, res) => {
    if (nextDestination.city === null || nextDestination.country === null) {
        res.json(null);
    } else {
        res.json(nextDestination);

    }
    res.status(200);
});

app.post('/resetNextDestination', (req, res) => {

    nextDestination.city = null;
    nextDestination.country = null;
    res.send('OK');
    res.status(200);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))