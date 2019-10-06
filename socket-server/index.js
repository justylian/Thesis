let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('new-city', (city) => {
        console.log("Sending  " + city + " to Desktop");
        io.emit('new-city', city);
    });
    socket.on('new-country', (country) => {
        console.log("Sending " + country + "to Desktop");
        io.emit('new-country', country);
    });
});

server.listen(3000, () => {
    console.log(`started on port: 3000`);
});