const { Router } = require("express");
const route = Router();
const userController = require("../controller/userController");
const multer = require("multer");
const ensureAuthenticated = require("../middleware/auth");
const storage = multer.memoryStorage();
const path = require("path");
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * tags:
 *   name: Pages
 *   description: Endpoints for serving HTML pages
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Serve the home page
 *     tags: [Pages]
 *     responses:
 *       200:
 *         description: Home page served
 */
route.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

/**
 * @swagger
 * /chat:
 *   get:
 *     summary: Serve the chat page
 *     tags: [Pages]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Chat page served
 */
route.get("/chat", ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "chat.html"));
});

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Serve the login page
 *     tags: [Pages]
 *     responses:
 *       200:
 *         description: Login page served
 */
route.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "login.html"));
});

/**
 * @swagger
 * /updateUser:
 *   get:
 *     summary: Serve the update user page
 *     tags: [Pages]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Update user page served
 */
route.get("/updateUser", ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "updateUser.html"));
});

/**
 * @swagger
 * /404:
 *   get:
 *     summary: Serve the 404 error page
 *     tags: [Pages]
 *     responses:
 *       200:
 *         description: 404 error page served
 */
route.get("/404", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "error.html"));
});

/**
 * @swagger
 * /register:
 *   get:
 *     summary: Serve the registration page
 *     tags: [Pages]
 *     responses:
 *       200:
 *         description: Registration page served
 */
route.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "register.html"));
});

/**
 * @swagger
 * /HomePage:
 *   get:
 *     summary: Serve the home page
 *     tags: [Pages]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Home page served
 */
route.get("/HomePage", ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "HomePage.html"));
});

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Serve the profile page
 *     tags: [Pages]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile page served
 */
route.get("/profile", ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "profile.html"));
});

/**
 * @swagger
 * /api/v1/userProfile:
 *   get:
 *     summary: Get user profile data
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data retrieved successfully
 *       401:
 *         description: Unauthorized
 */
route.get(
  "/api/v1/userProfile",
  ensureAuthenticated,
  userController.getUserProfile
);

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
route.post(
  "/api/v1/register",
  upload.single("profileImage"),
  userController.register_post
);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
route.post("/api/v1/login", userController.login_post);

/**
 * @swagger
 * /api/v1/updateUser:
 *   post:
 *     summary: Update user details
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               phone:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User details updated successfully
 *       400:
 *         description: Bad request
 */
route.post(
  "/api/v1/updateUser",
  upload.single("profileImage"),
  userController.updateUser_post
);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out the current user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
route.post("/logout", userController.logOut);

module.exports = route;
