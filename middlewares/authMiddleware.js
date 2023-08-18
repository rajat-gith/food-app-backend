const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: "Token Unauthorized" });
  }


  jwt.verify(token, "secret123", (err, decoded) => {
    console.log(decoded)
    if (err) {
      return res.status(401).json({ error: "Verification Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};
