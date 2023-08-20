const mongoose = require("mongoose");

const Recipe = require("../models/receipeModel"); // Make sure the path is correct

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    recipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe", // Reference the Recipe model
      },
    ],
  },
  { collection: "user-data" }
);

const UserModel = mongoose.model("UserData", UserSchema);
module.exports = UserModel;
