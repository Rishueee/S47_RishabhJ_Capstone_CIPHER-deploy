const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://Rishabh:Cipher@cluster0.rjxz1yt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { dbName: "Cipher" }
  )
  .then(() => {
    console.log("Connected to MongoDB");


app.get("/", (req, res) => {
  res.send("Hello World!");
})

    // Define routes and start the server
    const userRoute = require("./routes/auth");
    const artistRoutes = require("./routes/artist");
    const albumRoutes = require("./routes/album");
    const songRoutes = require("./routes/songs");

    // user auth routes
    app.use("/api/users", userRoute);

    // artist routes
    app.use("/api/artist", artistRoutes);

    // album routes
    app.use("/api/album", albumRoutes);

    // songs routes
    app.use("/api/songs", songRoutes);

    app.listen(3000, () => {
      console.log("Running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
