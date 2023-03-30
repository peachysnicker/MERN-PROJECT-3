const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
