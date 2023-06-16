const express = require("express");
const { upload } = require("../middlewares/multer");
const router = express.Router();
const postController = require("../controllers").postController;
//get

router.get("/", postController.getAll);
router.get("/image/render/:token", postController.renderPostImage);

router.get("/userId/:id", postController.getByUserId);

router.get("/:id", postController.getById);
router.post("/image/v2", upload.single("avatar"), postController.insertPost);
router.patch("/v2/:id", postController.editPost);
router.delete("/v3/:id", postController.deletePost);

module.exports = router;
