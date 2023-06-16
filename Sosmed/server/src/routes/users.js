const express = require("express");
const { fileUploader, upload } = require("../middlewares/multer");

const router = express.Router();
const userController = require("../controllers").userController;

router.post("/v2", userController.loginV2);
router.post("/", userController.register);
router.get("/image/render/:id", userController.renderAvatar);
router.get("/email", userController.getByEmail);
router.get("/username", userController.getByUsername);

router.post(
  "/image/v1/:id",
  fileUploader({
    destinationFolder: "avatar",
  }).single("avatar"),
  userController.uploadAvatar
); //register
router.post(
  "/image/v2/:id",
  upload.single("avatar"),
  userController.uploadAvatarv2
); //register
router.get("/getall", userController.getAll);
router.get("/v5", userController.getUserByName);

router.delete("/del/:id", userController.deleteUser); // delete user
router.get("/role", userController.getUserByRole); // get user by role
router.get("/token", userController.getByToken); // get Token
router.get("/v3", userController.getByToken, userController.getUserByToken);
// mendapatkan user dari token di path. apakah token expired? kalau tidek kirim user
router.patch("/update/:id", userController.updateProfile); //update profile
router.patch("/v4", userController.getByToken, userController.changePassword);

router.get("/generate-token/email", userController.generateTokenByEmail);
router.get(
  "/generate-token/emailVerify",
  userController.generateTokenByEmailVerify
);
router.get(
  "/token/verifyemail",
  userController.getByToken,
  userController.verifyEmail
);

router.get("/getByid/:id", userController.getById);

// router.post(
//   "/image/v1/:id",
//   fileUploader({ destinationFolder: "avatar" }).single("avatar"),
//   userController.uploadAvatar
// );

//mendapatkan user dari token di path. apakah token exp ? kalau tidak kirim user

module.exports = router;
