const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function register(req, res) {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({
      status: "ok",
    });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate Email" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ status: "error", error: "Invalid Login" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const tokenPayload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      return res.json({
        status: "ok",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          recipes: user.recipes,
          token: token,
        },
      });
    } else {
      return res.json({ status: "error", error: "Invalid Login" });
    }
  } catch (error) {
    console.error(error);
    return res.json({ status: "error", error: "An error occurred" });
  }
}

module.exports = {
  register,
  login,
};
