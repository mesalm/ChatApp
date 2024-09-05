const jwt = require("jsonwebtoken");

const ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.clearCookie("accessToken");
    return res.redirect("/login");
  }
};

module.exports = ensureAuthenticated;
