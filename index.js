require('./object-watch.js')
var express = require('express')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var admin = require("firebase-admin");

var serviceAccount = require("./sr-analytics-a968c-firebase-adminsdk-q3ulc-a1901f7d4d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sr-analytics-a968c.firebaseio.com"
});
var db = admin.database();
var data = {};
var ref = db.ref("analytics");
// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {
  console.log(snapshot.val());
  data = snapshot.val().data
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});




function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 100; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function updateDB(path, data) {
  let updateRef = db.ref('analytics/data/')
  console.log(`updateDB path: ${'analytics/data/' + path} data: ${data}`);
  updateRef.update({
    [path]: data
  });
}

app.use(express.static('client'))

io.on('connection', (socket) => {
  console.log('a user connected', data);
  data.currentUsers++
    updateDB('currentUsers', data.currentUsers)
  socket.on('requestID', function(payload) {
    io.emit('assignID', {
      id: makeid()
    });

  });
  socket.on('id', function(payload) {
    data.users.push({
      [payload.id]: {
        online: true
      }
    })
    console.log(data);
    console.log(payload.id, payload.users[data.id].online)
  });
  socket.on('disconnect', function() {
    console.log('user disconnected');
    data.currentUsers--
      updateDB('currentUsers', data.currentUsers)
  });
});

setTimeout(() => {
  console.log(data);
  http.listen(3000, function() {
    console.log('listening on *:3000');
  });
}, 1000);