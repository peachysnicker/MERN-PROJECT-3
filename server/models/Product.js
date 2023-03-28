const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
