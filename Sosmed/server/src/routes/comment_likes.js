const express = require("express");
const router = express.Router();
const commentLikeController = require("../controllers").commentLikeController;
//get

router.get("/", commentLikeController.getAll);
router.get("/:id", commentLikeController.getById);
router.post("/v1", commentLikeController.insertCommentLike);
router.patch("/v2/:id", commentLikeController.editCommentLike);
router.delete("/v3/:id", commentLikeController.deleteCommentLike);

module.exports = router;
