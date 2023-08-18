const Recipe = require("../models/receipeModel");

async function createReceipe(req, res) {
  try {
    const { name, description, ingredients, steps } = req.body;
    const images = req.files.map((file) => file.filename);

    const newReceipe = await Recipe.create({
      name,
      description,
      ingredients,
      steps,
      images,
    });

    res.status(201).json(newReceipe);
  } catch (err) {
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

module.exports = {
  createReceipe,
  getReceipes,
  getRecipeById,
};
