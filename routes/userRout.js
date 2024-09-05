const { Router } = require("express");
const route = Router();
const userController = require("../controller/userController");
const multer = require("multer");
const ensureAuthenticated = require("../middleware/auth");
const storage = multer.memoryStorage();
const path = require("path");
const upload = multer({ storage: multer.memoryStorage() });

route.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
route.get("/chat", ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "chat.html"));
});
route.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "login.html"));
});
route.get("/updateUser", ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "updateUser.html"));
});
route.get("/404", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "error.html"));
});
route.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "register.html"));
});
route.get("/HomePage", ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "HomePage.html"));
});
route.get("/profile", ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "profile.html"));
});
route.get(
  "/api/v1/userProfile",
  ensureAuthenticated,
  userController.getUserProfile
);

route.post(
  "/api/v1/register",
  upload.single("profileImage"),
  userController.register_post
);
route.post("/api/v1/login", userController.login_post);
route.post(
  "/api/v1/updateUser",
  upload.single("profileImage"),
  userController.updateUser_post
);
route.post("/logout", userController.logOut);

module.exports = route;
