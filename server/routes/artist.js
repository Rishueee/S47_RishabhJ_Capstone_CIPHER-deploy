const router = require("express").Router();
const artist = require("../models/artist");

router.post("/save", async (req, res) => {
  const newArtist = new artist({
    name: req.body.name,
    imageurl: req.body.imageurl,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
  });

  try {
    const savedArtist = await newArtist.save();
    res.status(200).send({ success: true, artist: savedArtist });
  } catch (error) {
    res.status(400).send({ success: false, message: "Error saving artist", error: error.message });
  }
});


router.get("/get/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const data = await artist.findOne(filter);

  if (!data) {
    res.status(400).send({ sucess: false, message: "artist not found" });
  } else {
    res.status(200).send({ sucess: true, artist: data });
  }
});

router.get("/getAll", async (req, res) => {
  const data = await artist.find().sort({ createdAt: 1 });
  if (data) {
    res.status(200).send({ success: true, artist: data });
  } else {
    res.status(400).send({ success: false, message: "artist not found" });
  }
});

router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  try {
    const result = await artist.findOneAndUpdate(filter, {
      name: req.body.name,
      imageurl: req.body.imageurl,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
    });
    res.status(200).send({ artist: result });
  } catch (error) {
    res.status(400).send({ sucess: false, message: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const data = await artist.findOneAndDelete(filter);
  if (!data) {
    res.status(400).send({ sucess: false, message: "artist not found" });
  } else {
    res.status(200).send({ message: "Deleted Successfully", artist: data });
  }
});

module.exports = router;
