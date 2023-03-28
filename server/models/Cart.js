const { Schema, model } = require("mongoose");


const cartSchema = new Schema(
  {
    userId: {
      // type: Schema.Types.ObjectId,
      // ref: 'User',
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          //  type: Schema.Types.ObjectId,
          //  ref: 'Product,
          type: String,
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
