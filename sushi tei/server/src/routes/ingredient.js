const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers").ingredientController;

router.get("/", ingredientController.getAll);
router.get("/:id", ingredientController.getById);
router.post("/v1", ingredientController.insertIngredient);
router.patch("/v2/:id", ingredientController.editIngredient);
router.delete("/v3/:id", ingredientController.deleteIngredient);

module.exports = router;
