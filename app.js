const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);
const io = socketio(server);

let socketid = [];
let userName = [];

io.on('connection', socket => {

    console.log('user connected ' + socket.id);
    socket.on('input', userName => {
      console.log(userName);
    })

    // io.emit('user-show');
    socket.on('client-send', data => {
        io.emit('server-send', {message: data, id: socket.id});
    });
    
    //showing to every one of typin word without me
    socket.on('type', type => {
      socket.broadcast.emit('server-type', type)
    })

    socket.on('disconnect', () =>{
        console.log('user disconnected ' + socket.id);
    })
})


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(8080, () => {
  console.log("Server started on port 8080"); // logs to console when server starts
});