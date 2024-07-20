const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);
const io = socketio(server);

let socketid = [];
let usersName = [];

io.on("connection", (socket) => {
  console.log("user connected " + socket.id);
  socket.on("input", (userName) => {
    socketid.push(socket.id);
    usersName.push(userName);
    io.emit("liveUser", usersName.length);
    socket.emit('nameSetDone');
  });

  // io.emit('user-show');
  socket.on("client-send", (data) => {
    let index = socketid.indexOf(socket.id);
    let name = usersName[index];
    io.emit("server-send", { message: data, name, id: socket.id });
  });

  //showing to every one of typin word without me
  socket.on("type", (type) => {
    socket.broadcast.emit("server-type", type);
  });

  socket.on("disconnect", () => {
    let index = socketid.indexOf(socket.id);
    if (index !== -1) {
      socketid.splice(index, 1);
      usersName.splice(index, 1);
    }
    io.emit('liveUser', usersName.length);
    console.log("user disconnected " + socket.id);
  });
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(8080, () => {
  console.log("Server started on port 8080"); // logs to console when server starts
});
