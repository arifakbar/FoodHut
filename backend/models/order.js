const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const orderSchema = new Schema({
  products: [
    {
      product: { type: ObjectId, ref: "Product" },
      count: Number,
    },
  ],
  paymentIntent: {},
  orderStatus: {
    type: String,
    default: "Not Processed",
    enum: [
      "Not Processed",
      "Processing",
      "Dispatched",
      "Cancelled",
      "Completed",
    ],
  },
  orderedBy: { type: ObjectId, ref: "User" },
});

module.exports = mongoose.model("Order", orderSchema);
