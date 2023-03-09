const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const mongoose = require("mongoose");
const axios = require("axios");

// Require the Therapy model in order to interact with the database
const Therapy = require("../models/Therapy.model");

//get all
router.get("/therapies", async (req, res, next) => {
  try {
    const therapies = await Therapy.find();
    res.json(therapies);
  } catch (error) {
    res.json(error);
  }
});

//create therapy

router.post(
  "/therapies",
  fileUploader.single("image"),
  async (req, res, next) => {
    const { title, description, image } = req.body;

    try {
      let therapy;

      if (req.file) {
        therapy = await Therapy.create(
          {
            title,
            description,
            image: req.file.path,
          },
          { new: true }
        );
      } else {
        therapy = await Therapy.create(
          {
            title,
            description,
          },
          { new: true }
        );
      }

      res.json(therapy);
    } catch (error) {
      res.json(error);
    }
  }
);

//Read (by id)

router.get("/therapies/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const therapy = await Therapy.findById(id);

    res.json(therapy);
  } catch (error) {
    res.json(error);
  }
});

//Update

router.put(
  "/therapies/edit/:id",
  fileUploader.single("image"),
  async (req, res, next) => {
    const { id } = req.params;
    const { title, description, image } = req.body;

    //check if id is a mongoDB valid ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json("The provided id is not valid");
    }

    try {
      let updatedTherapy;

      if (req.file) {
        updatedTherapy = await Therapy.findByIdAndUpdate(
          id,
          {
            title,
            description,
            image: req.file.path,
          },
          { new: true }
        );
      } else {
        updatedTherapy = await Therapy.findByIdAndUpdate(
          id,
          {
            title,
            description,
          },
          { new: true }
        );
      }

      res.json(updatedTherapy);
    } catch (error) {
      res.json(error);
    }
  }
);

//Delete

router.delete("/therapies/:id", async (req, res, next) => {
  const { id } = req.params;

  //check if id is a mongoDB valid ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json("The provided id is not valid");
  }

  //remove the project
  try {
    await Therapy.findByIdAndRemove(id);
    res.json({ message: `Therapy with the id ${id} deleted successfully` });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
