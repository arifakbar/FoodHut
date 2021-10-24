const Order = require("../models/order");
const User = require("../models/user");
const Cart = require("../models/cart");

exports.createOrder = async (req, res, next) => {
  try {
    const { paymentIntent } = req.body.stripeResponse;
    const user = await User.findOne({ email: req.user.email });
    let { products } = await Cart.findOne({ orderedBy: user._id });
    const newOrder = new Order({
      products: products,
      orderedBy: user._id,
      paymentIntent: paymentIntent,
    });
    await newOrder.save();
    res.status(200).json({ ok: true, message: "Order created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};
