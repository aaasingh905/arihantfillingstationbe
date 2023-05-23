const mongoose = require("mongoose");

const Transactions = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    type: { type: String },
    date: { type: String },
    slipNo: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Transactions" },
  { timestamps: true }
);

const model = mongoose.model("Transactions", Transactions);

module.exports = model;
