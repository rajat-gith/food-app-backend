const Recipe = require("../models/receipeModel");
const User = require("../models/userModel");

async function createReceipe(req, res) {
  try {
    console.log("req.body=>", req.body);
    const { name, description, ingredients, steps } = req.body;
    const images = req.files.map((file) => file.filename);
    const userId = req.user.id;
    const newRecipe = await Recipe.create({
      name,
      description,
      ingredients,
      steps,
      images,
      user: userId,
    });
    await User.findByIdAndUpdate(userId, { $push: { recipes: newRecipe._id } });
    res.status(201).json({ status: "ok", receipe: newRecipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create recipe" });
  }
}

async function getReceipes(req, res) {
  try {
    const { name, ingredients } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (ingredients) {
      query.ingredients = { $in: ingredients.split(",") };
    }
    const receipe = await Recipe.find(query);
    res.json({ status: "ok", receipe: receipe });
  } catch (error) {
    res.json({ status: "error", error: "Failed to fetch receipes" });
  }
}

async function getRecipeById(req, res) {
  const recipeId = req.params.id;
  console.log(recipeId);
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.json({ status: "error", error: "Recipe not found" });
    }
    res.json({ status: "ok", recipe: recipe });
  } catch (error) {
    res.json({ status: "error", error: "Failed to fetch recipe" });
  }
}

async function getUserReceipes(req, res) {
  try {
    const userId = req.params.userId;
    const userRecipes = await Recipe.find({ user: userId });
    res.status(200).json(userRecipes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user recipes" });
  }
}

module.exports = {
  createReceipe,
  getReceipes,
  getRecipeById,
  getUserReceipes,
};
