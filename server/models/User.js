const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false
    },

    payment: {
      card_number: {
        type: String,
        required: false,
      },
      expiration_date: {
        type: String,
        required: false,
      },
      cvv: {
        type: String,
        required: false,
      }
    },
    address: {
      street: {
        type: String,
        required: false
      },
      city: {
        type: String,
        required: false
      },
      province: {
        type: String,
        required: false
      },
      postal_code: {
        type: String,
        required: false
      },
      phone: {
        type: String,
        required: false
      }
    }

  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Compare the incoming password with hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
