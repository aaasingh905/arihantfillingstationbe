const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
    },
    village: {
      type: String,
    },
    totalDueAmount: {
      type: Number,
    },
    createdAt: Date,
  },
  { collection: "User" },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
