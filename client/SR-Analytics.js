var socketScript = document.createElement('script');
socketScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js');
document.head.appendChild(socketScript);
var socket = io('localhost:3000');
console.log('init');