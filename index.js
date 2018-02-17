var express = require('express')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var admin = require("firebase-admin");

var serviceAccount = require("sr-analytics-a968c-firebase-adminsdk-q3ulc-a1901f7d4d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sr-analytics-a968c.firebaseio.com"
});
app.use(express.static('client'))

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});