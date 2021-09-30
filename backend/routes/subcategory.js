const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const subCategoryController = require("../controllers/subcategory");

router.get("/sub-categories", subCategoryController.getAllSubCategories);

router.get("/sub-category/:slug", subCategoryController.getSubCategory);

router.post(
  "/sub-category",
  [authCheck, adminCheck],
  subCategoryController.addSubCategory
);

router.put(
  "/sub-category/:slug",
  [authCheck, adminCheck],
  subCategoryController.updateSubCategory
);

router.delete(
  "/sub-category/:slug",
  [authCheck, adminCheck],
  subCategoryController.deleteSubCategory
);

module.exports = router;
