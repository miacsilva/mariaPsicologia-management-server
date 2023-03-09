const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const mongoose = require("mongoose");
const axios = require("axios");

// Require the About model in order to interact with the database
const About = require("../models/About.model");

//get about
router.get("/about", async (req, res, next) => {
  try {
    const about = await About.find();
    res.json(about);
  } catch (error) {
    res.json(error);
  }
});

//Update

router.put(
  "/about/edit/:id",
  fileUploader.single("image"),
  async (req, res, next) => {
    const { name, education, image, bigAbout, smallAbout } = req.body;
    const { id } = req.params;

    try {
      let updatedAbout;

      if (req.file) {
        updatedAbout = await About.findByIdAndUpdate(
          id,
          { name, education, image: req.file.path, bigAbout, smallAbout },
          { new: true }
        );
      } else {
        updatedAbout = await About.findByIdAndUpdate(
          id,
          {
            name,
            education,
            bigAbout,
            smallAbout,
          },
          { new: true }
        );
      }

      res.json(updatedAbout);
    } catch (error) {
      res.json(error);
    }
  }
);

/* //create
router.post("/about", fileUploader.single("image"), async (req, res, next) => {
  const { name, education, image, bigAbout, smallAbout } = req.body;

  try {
    let about;

    if (req.file) {
      about = await About.create({
        name,
        education,
        image: req.file.path,
        bigAbout,
        smallAbout,
      });
    } else {
      about = await About.create({ name, education, bigAbout, smallAbout });
    }

    res.json(about);
  } catch (error) {
    res.json(error);
  }
}); */

module.exports = router;
