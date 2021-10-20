const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const authController = require("../controllers/auth");

router.post(
  "/create-or-update-user",
  [authCheck],
  authController.CreateOrUpdateUser
);

router.post("/current-user", [authCheck], authController.currentUser);

router.post(
  "/current-admin",
  [authCheck, adminCheck],
  authController.currentUser
);

router.post("/update-username", [authCheck], authController.updateUsername);
router.post("/update-address", [authCheck], authController.updateAddress);

router.post("/user/sendOTP", [authCheck], authController.sendOTP);

router.post("/user/verifyOTP", [authCheck], authController.verifyOTP);

module.exports = router;
