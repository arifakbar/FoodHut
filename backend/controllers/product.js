const Product = require("../models/product");
const slugify = require("slugify");
const User = require("../models/user");

exports.productsCount = async (req, res, next) => {
  try {
    const total = await Product.find().estimatedDocumentCount();
    res.status(200).json({
      data: total,
      message: "Total Products count fetched successfully.",
    });
  } catch (err) {
    console.log(err);
    res.send(500).json({ err: "Some error occured" });
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 4;
    const products = await Product.find()
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subCategory")
      .sort([[sort, order]])
      .limit(perPage);
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

exports.getProductsByCount = async (req, res, next) => {
  try {
    const { count } = req.params;
    console.log("C:" + count);
    const products = await Product.find()
      .populate("category")
      .populate("subCategory")
      .sort({ createdAt: -1 })
      .limit(+count);
    res
      .status(200)
      .json({ data: products, message: "Products fetched successfully" });
  } catch (err) {
    console.log(err);
    res.send(500).json({ err: "Some error occured" });
  }
};

exports.searchProduct = async (req, res, next) => {
  try {
    const { query } = req.body;
    const products = await Product.find({
      $or: [
        { title: new RegExp(query, "i") },
        { description: new RegExp(query, "i") },
      ],
    }).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ data: products, message: "Products found successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.relatedProducts = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    const realted = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    })
      .limit(3)
      .populate("subCategory");
    res.status(200).json({
      data: realted,
      message: "Related products fetched successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.productRating = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    const { star } = req.body;
    const user = await User.findOne({ email: req.user.email });
    let existingRatedProduct = product.ratings.find(
      (e) => e.postedBy.toString() === user._id.toString()
    );
    if (existingRatedProduct === undefined) {
      let addedRatings = await Product.findByIdAndUpdate(
        product._id,
        {
          $push: { ratings: { star: star, postedBy: user._id } },
        },
        { new: true }
      );
      res.status(200).json({
        message: "Ratings added successfully",
        data: addedRatings,
      });
    } else {
      const updatedRating = await Product.updateOne(
        {
          ratings: { $elemMatch: existingRatedProduct },
        },
        { $set: { "ratings.$.star": star } },
        { new: true }
      );
      res.status(200).json({
        message: "Ratings updated successfully",
        data: updatedRating,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Some error occured!",
    });
  }
};
