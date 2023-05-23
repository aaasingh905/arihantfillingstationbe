const express = require("express");
const model = require("../models/ShiftSchema");
const jwt = require("jsonwebtoken");
const { user, jwtSecret } = require("../constants/user");
const User = require("../models/UserSchema");
const Transactions = require("../models/TransactionSchema");
const { ObjectId } = require("mongodb");

function initRoutes(app) {
  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === user.username && password === user.password) {
      const token = jwt.sign({ id: user.id }, jwtSecret);
      res.json({ token });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });

  app.get("/shiftdata/:date", (req, res) => {
    const date = req.params.date;
    model
      .findOne({ date })
      .then((user) => {
        if (!user) {
          return res.status(201).json({ message: "Record not found" });
        }
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(500).json({ message: "Internal server error" });
      });
  });

  app.post("/shifts", async (req, res) => {
    try {
      const { date } = req.body;
      const existingRecord = await model.findOne({ date });
      if (existingRecord) {
        existingRecord.date = req.body.date;
        existingRecord.shift1 = req.body.shift1;
        existingRecord.shift2 = req.body.shift2;
        await existingRecord.save();
        res.status(203).json({ message: "Data Save Successfully !!" });
      } else {
        const shift = new model(req.body);
        await shift.save();
        res.status(201).send({ message: "New Record Created Successfully !!" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/users", async (req, res) => {
    const name = req.body.name;
    const { number } = req.body;
    const user = await User.findOne({ number });
    if (user) {
      res
        .status(201)
        .json({ user: user, message: "User Already Present with this number" });
    } else {
      const newUser = await new User({
        number: req.body?.number,
        name: name,
        village: req.body.village,
        createdAt: new Date(),
        totalDueAmount: 0,
      }).save();
      res.status(200).json({
        user: newUser,
        message: "User Account Successfully Created",
      });
    }
  });

  app.get("/getusers", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Current page number
      const limit = parseInt(req.query.limit) || 10; // Number of users per page

      // Calculate the skip value based on the current page and limit
      const skip = (page - 1) * limit;

      // Fetch users from the database based on pagination
      const users = await User.find().sort({ name: 1 }).skip(skip).limit(limit);

      // Count the total number of users
      const totalUsers = await User.countDocuments();

      res.json({ users, page, limit, totalUsers });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get("/getuserbyid/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
      // Fetch users from the database based on pagination
      const users = await User.findOne({
        _id: userId,
      });

      res.json({ users });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.post("/addtransactions", async (req, res) => {
    try {
      const { amount, slipNo, date, type, userId } = req.body;

      const transaction = new Transactions({
        amount,
        slipNo,
        date,
        type,
        userId: new ObjectId(userId),
      });

      await transaction.save();

      const user = await User.findOne({
        _id: new ObjectId(userId),
      }).exec();
      if (type === "D") {
        user.totalDueAmount = user.totalDueAmount + amount;
      } else {
        user.totalDueAmount = user.totalDueAmount - amount;
      }
      await user.save();

      res
        .status(201)
        .json({ transaction, totalDueAmount: user.totalDueAmount });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  app.get("/transactions/:userId", async (req, res) => {
    const userId = req.params.userId;
    const { page, limit } = req.query;
    console.log("file: apiRoutes.js:148 > page:", page, limit, userId);
    try {
      const totalCount = await Transactions.countDocuments({ userId: userId });
      const userDetails = await User.findOne({
        _id: new ObjectId(userId),
      });
      if (totalCount > 0) {
        const skip = (page - 1) * limit;
        const transactions = await Transactions.find({
          userId: new ObjectId(userId),
        })
          .skip(skip)
          .limit(parseInt(limit))
          .sort({ createdAt: -1 })
          .exec();

        res.status(200).json({
          transactions,
          totalCount,
          userDetails,
          page,
          limit,
        });
      } else {
        res.status(201).json({ error: "No transactions found for he user." });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions." });
    }
  });
}
module.exports = initRoutes;
