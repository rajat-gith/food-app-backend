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

module.exports = {
  createReceipe,
};
