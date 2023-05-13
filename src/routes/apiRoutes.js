const express = require("express");
const model = require("../models/ShiftSchema");

function initRoutes(app) {
  app.get("/shiftdata/:date", (req, res) => {
    const date = req.params.date;
    console.log("called1", date, req.params);

    model
      .findOne({ date })
      .then((user) => {
        if (!user) {
          return res.status(201).json({ message: "Record not found" });
        }
        res.status(200).json(user);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      });
  });
  app.post("/shifts", async (req, res) => {
    try {
      const { date } = req.body;
      console.log(date);
      const existingRecord = await model.findOne({ date });
      if (existingRecord) {
        existingRecord.date = req.body.date;
        existingRecord.shift1 = req.body.shift1;
        existingRecord.shift2 = req.body.shift2;
        await existingRecord.save();
        res.status(203).json({ message: existingRecord });
      } else {
        const shift = new model(req.body);
        await shift.save();
        res.status(201).send(shift);
      }
    } catch (err) {
      console.error(err);
      res.status;
    }
  });
}
module.exports = initRoutes;
