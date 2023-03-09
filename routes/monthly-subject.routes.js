const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const mongoose = require("mongoose");
const axios = require("axios");

// Require the MonthlySubject model in order to interact with the database
const MonthlySubject = require("../models/MonthlySubject.model");

//get about
router.get("/monthly-subject", async (req, res, next) => {
  try {
    const monthlySubject = await MonthlySubject.find();
    res.json(monthlySubject);
  } catch (error) {
    res.json(error);
  }
});

//Update

router.put(
  "/monthly-subject/edit/:id",
  fileUploader.single("image"),
  async (req, res, next) => {
    const { title, description, image } = req.body;
    const { id } = req.params;

    try {
      let updatedMonthlySubject;

      if (req.file) {
        updatedMonthlySubject = await MonthlySubject.findByIdAndUpdate(
          id,
          {
            title,
            description,
            image: req.file.path,
          },
          { new: true }
        );
      } else {
        updatedMonthlySubject = await MonthlySubject.findByIdAndUpdate(
          id,
          {
            title,
            description,
          },
          { new: true }
        );
      }

      res.json(updatedMonthlySubject);
    } catch (error) {
      res.json(error);
    }
  }
);

//create
router.post(
  "/monthly-subject",
  fileUploader.single("image"),
  async (req, res, next) => {
    const { title, description, image } = req.body;

    try {
      let monthlySubject;

      if (req.file) {
        monthlySubject = await MonthlySubject.create(
          {
            title,
            description,
            image: req.file.path,
          },
          { new: true }
        );
      } else {
        monthlySubject = await MonthlySubject.create(
          {
            title,
            description,
          },
          { new: true }
        );
      }

      res.json(monthlySubject);
    } catch (error) {
      res.json(error);
    }
  }
);

module.exports = router;
