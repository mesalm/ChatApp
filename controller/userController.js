const User = require("../models/User_module");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");

module.exports.register_post = async function (req, res) {
  const { username, email, password, phone } = req.body;
  const profileImage = req.file;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Invalid username or email address or password" });
  }

  try {
    const user = await User.findOne({ email });
    if (user) return res.json({ message: "User already exists" });

    const newUser = await User.create({
      username,
      email,
      password,
      phone,
      profileImage: profileImage
        ? { data: profileImage.buffer, contentType: profileImage.mimetype }
        : undefined
    });

    res.status(201).redirect("/login");
  } catch (err) {
    res.status(404).redirect("/error.html");
  }
};

module.exports.login_post = async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ mes: " please enter your email  and password" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ mes: "user not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const accessToken = await jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "60m" }
      );

      res.cookie("accessToken", accessToken, {
        sameSite: "strict",
        secure: true, //process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 60 * 1000
      });
      res.status(201).redirect("/HomePage");
    }
  } catch (err) {
    res.status(400).redirect("/login");
  }
};

module.exports.updateUser_post = async function (req, res) {
  const { username, phone } = req.body;
  const profileImage = req.file;

  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const updateData = {};
    if (username) updateData.username = username;
    if (phone) updateData.phone = phone;
    if (profileImage) {
      updateData.profileImage = {
        data: profileImage.buffer,
        contentType: profileImage.mimetype
      };
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.redirect("/HomePage");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
exports.getUserProfile = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await User.findById(userId).select("username profileImage");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
module.exports.logOut = async function (req, res) {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to log out" });
  }
};
