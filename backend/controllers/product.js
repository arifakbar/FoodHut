const Product = require("../models/product");
const slugify = require("slugify");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subCategory");
    res
      .status(200)
      .json({ data: products, message: "Products fetched successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured." });
  }
};

exports.getProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId)
      .populate("category")
      .populate("subCategory");
    res
      .status(200)
      .json({ data: product, message: "Product fetched successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = new Product(req.body);
    await newProduct.save();
    res
      .status(201)
      .json({ data: newProduct, message: "Product created successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  req.body.slug = slugify(req.body.title);
  console.log(productId);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
      }
    );
    res
      .status(201)
      .json({ data: updatedProduct, message: "Product updated successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error ccured" });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    await Product.findByIdAndDelete(productId);
    res
      .status(201)
      .json({ ok: true, message: "Product deleted successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};
