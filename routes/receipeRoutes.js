const express = require("express");
const recipeController = require("../controllers/receipeController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post(
  "/add",
  upload.array("images", 5),
  authMiddleware,
  recipeController.createReceipe
);
router.get("/user/:userId/recipes", recipeController.getUserReceipes);
router.get("/", recipeController.getReceipes);
router.get("/:id", recipeController.getRecipeById);
router.put("/:id/update", recipeController.updateRecipe);

module.exports = router;
