const express = require("express");
const router = express.Router();
const likeController = require("../controllers").likeController;
//get

router.get("/", likeController.getAll);
router.get("/getlike/:postid", likeController.getLikeTotalByPostId);

router.get("/:id", likeController.getById);
router.post("/v1", likeController.insertLike);
router.patch("/v2/:id", likeController.editLike);
router.delete("/v3/:id", likeController.deleteLike);

module.exports = router;
