const express = require("express");
const router = express.Router();
const menuDishesController = require("../controllers").menuDishesController;

router.get("/", menuDishesController.getAll);
router.get("/:id", menuDishesController.getById);
router.post("/v1", menuDishesController.insertMenuDishes);
router.patch("/v2/:id", menuDishesController.editMenuDishes);
router.delete("/v3/:id", menuDishesController.deleteMenuDishes);

module.exports = router;
