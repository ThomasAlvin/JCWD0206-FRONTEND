const express = require("express");
const router = express.Router();
const ingredientHistoryController =
  require("../controllers").ingredientHistoryController;

router.get("/", ingredientHistoryController.getAll);
router.get("/:id", ingredientHistoryController.getById);
router.post("/v1", ingredientHistoryController.insertIngredientHistory);
router.patch("/v2/:id", ingredientHistoryController.editIngredientHistory);
router.delete("/v3/:id", ingredientHistoryController.deleteIngredientHistory);

module.exports = router;
