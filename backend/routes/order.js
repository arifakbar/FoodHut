const express = require("express");

const router = express.Router();
const orderController = require("../controllers/order");
const { authCheck } = require("../middlewares/auth");

router.post("/user/order", [authCheck], orderController.createOrder);

module.exports = router;
