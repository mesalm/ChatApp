const express = require("express");
const { createServer } = require("node:http");
const path = require("path");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const dbConnect = require("./config/db_connection");
const router = require("./routes/userRout");
const setupSocket = require("./controller/socketIoSetUp");
const app = express();
const server = createServer(app);
const cors = require("cors");
dbConnect();
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later."
});

app.use(
  cors({
    origin: "localhost:4000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);
app.use(limiter);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(router);
const io = setupSocket(server);
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log("server running ");
});
