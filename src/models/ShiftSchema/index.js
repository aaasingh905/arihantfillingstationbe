const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the transaction data
const shiftData = new Schema({
  date: String,
  shift1: {
    priceMS: Number,
    priceHSD: Number,
    machine1: {
      openingBalanceHSD: Number,
      closingBalanceHSD: Number,
      openingBalanceMS: Number,
      closingBalanceMS: Number,
      tankerMS: Number,
      tankerHSD: Number,
      totalSaleMS: Number,
      totalSaleHSD: Number,
      totalPriceHSD: Number,
      totalPriceMS: Number,
      listPaytm: [Number],
      listBorrowings: [{ item: Number, comment: String }],
      listSpendings: [{ item: Number, comment: String }],
      listDeposits: [Number],
      totalPaytm: Number,
      totalBorrowings: Number,
      totalSpendings: Number,
      totalDeposits: Number,
      totalDue: Number,
    },
    machine2: {
      openingBalanceHSD: Number,
      closingBalanceHSD: Number,
      openingBalanceMS: Number,
      closingBalanceMS: Number,
      tankerMS: Number,
      tankerHSD: Number,
      totalSaleMS: Number,
      totalSaleHSD: Number,
      totalPriceHSD: Number,
      totalPriceMS: Number,
      listPaytm: [Number],
      listBorrowings: [{ item: Number, comment: String }],
      listSpendings: [{ item: Number, comment: String }],
      listDeposits: [Number],
      totalPaytm: Number,
      totalBorrowings: Number,
      totalSpendings: Number,
      totalDeposits: Number,
      totalDue: Number,
    },
  },
  shift2: {
    priceHSD: Number,
    priceMS: Number,
    machine1: {
      openingBalanceHSD: Number,
      closingBalanceHSD: Number,
      openingBalanceMS: Number,
      closingBalanceMS: Number,
      tankerMS: Number,
      tankerHSD: Number,
      totalSaleMS: Number,
      totalSaleHSD: Number,
      totalPriceHSD: Number,
      totalPriceMS: Number,
      listPaytm: [Number],
      listBorrowings: [{ item: Number, comment: String }],
      listSpendings: [{ item: Number, comment: String }],
      listDeposits: [Number],
      totalPaytm: Number,
      totalBorrowings: Number,
      totalSpendings: Number,
      totalDeposits: Number,
      totalDue: Number,
    },
    machine2: {
      openingBalanceHSD: Number,
      closingBalanceHSD: Number,
      openingBalanceMS: Number,
      closingBalanceMS: Number,
      tankerMS: Number,
      tankerHSD: Number,
      totalSaleMS: Number,
      totalSaleHSD: Number,
      totalPriceHSD: Number,
      totalPriceMS: Number,
      listPaytm: [Number],
      listBorrowings: [{ item: Number, comment: String }],
      listSpendings: [{ item: Number, comment: String }],
      listDeposits: [Number],
      totalPaytm: Number,
      totalBorrowings: Number,
      totalSpendings: Number,
      totalDeposits: Number,
      totalDue: Number,
    },
  },
});

// Define the Mongoose model for transactions
const model = mongoose.model("Shift Data", shiftData);

module.exports = model;
