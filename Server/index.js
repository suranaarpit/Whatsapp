const app = require("express")();
const cors = require("cors");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const PORT = process.env.PORT || 8080;

const users = {};

io.on("connection", (socket) => {
  console.log(`Someone Connected and Socket ID is ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`${socket.id} is Disconnected`);

    for (let user in users) {
      if (users[user] === socket.id) {
        delete users[user];
      }
    }

    // we can tell every other users someone is disconnected
    io.emit("all_users", users);
  });

  socket.on("new_user", (username) => {
    console.log(`${username} is connected on Server`);
    users[username] = socket.id;

    // we can tell every other users someone is connetced
    io.emit("all_users", users);
  });

  socket.on("send_message", (data) => {
    console.log(data);

    const socketID = users[data.receiver];
    io.to(socketID).emit("new_message", data);
  });
});
httpServer.listen(PORT, () => {
  console.log(`🌎 Started on http://localhost:${PORT}`);
});
