var socket = io('localhost:3000');
let id = localStorage.getItem("id");
if (!id) {
  socket.emit('requestID', {});
} else {
  console.log('id');
  socket.emit('id', {
    id: id
  });
}
console.log('init', id);
socket.on('assignID', function(data) {
  console.log(data.id);
  id = data.id
  localStorage.setItem("id", data.id);
  socket.emit('id', {
    id: id
  });
})