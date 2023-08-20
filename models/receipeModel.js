const mongoose = require("mongoose");
const UserModel = require("../models/userModel"); // Make sure the path is correct

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  steps: {
    type: [String],
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData", // Reference the UserData model
    required: true,
  },
});

const RecipeModel = mongoose.model("Recipe", RecipeSchema);
module.exports = RecipeModel;
