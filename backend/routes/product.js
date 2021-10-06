const express = require("express");

const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const productController = require("../controllers/product");

router.get("/products", productController.getAllProducts);

router.get("/product/:productId", productController.getProduct);

router.post(
  "/product",
  [authCheck, adminCheck],
  productController.createProduct
);

router.put(
  "/product/:productId",
  [authCheck, adminCheck],
  productController.updateProduct
);

router.delete(
  "/product/:productId",
  [authCheck, adminCheck],
  productController.deleteProduct
);

module.exports = router;
