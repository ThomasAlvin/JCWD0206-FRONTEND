const express = require("express");
const router = express.Router();
const commentController = require("../controllers").commentController;
//get

router.get("/", commentController.getAll);
router.get("/:id", commentController.getById);
router.post("/v1", commentController.insertComment);
router.patch("/v2/:id", commentController.editComment);
router.delete("/v3/:id", commentController.deleteComment);

module.exports = router;
