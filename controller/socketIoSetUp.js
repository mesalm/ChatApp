const { Server } = require("socket.io");
const Message = require("../models/messages");
const jwt = require("jsonwebtoken");
const User = require("../models/User_module");
const cookie = require("cookie");

function setupSocket(server) {
  const io = new Server(server);
  const activeUsers = new Map();
  const userCache = new Map();

  io.use((socket, next) => {
    const cookies = socket.handshake.headers.cookie;
    if (cookies) {
      const parsedCookies = cookie.parse(cookies);
      const token = parsedCookies.accessToken;

      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            console.error("Error verifying token:", err);
            return next(new Error("Authentication error"));
          }
          socket.userId = decoded.userId;
          next();
        });
      } else {
        next(new Error("No token found"));
      }
    } else {
      next(new Error("No cookies found"));
    }
  });

  io.on("connection", async (socket) => {
    console.log("A user connected");
    const userId = socket.userId;

    try {
      let user = userCache.get(userId);
      if (!user) {
        user = await User.findById(userId);
        if (user) {
          userCache.set(userId, user);
        }
      }

      if (!user) {
        socket.disconnect();
        return console.error("User not found");
      }

      try {
        const messages = await Message.find().sort({ createdAt: 1 });
        socket.emit("load messages", messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }

      activeUsers.set(socket.id, user.username);
      io.emit("update users", Array.from(activeUsers.values()));
      console.log(`User ${user.username} connected`);

      socket.on("chat message", async (message) => {
        try {
          const newMessage = new Message({
            senderId: userId,
            username: user.username,
            message: message
          });

          await newMessage.save();
          io.emit("chat message", newMessage);
        } catch (error) {
          console.error("Error saving message:", error);
        }
      });

      socket.on("disconnect", () => {
        activeUsers.delete(socket.id);
        io.emit("update users", Array.from(activeUsers.values()));
        console.log(`User ${user.username} disconnected`);
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      socket.disconnect();
    }
  });

  return io;
}

module.exports = setupSocket;
