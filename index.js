const mongoose = require("mongoose");
const sensors = require("./routes/sensors");
const devices = require("./routes/devices");
const express = require("express");
const app = express();

mongoose
  .connect(
    "mongodb+srv://spt-aquaculture:admin123qwe@democlusterazizi-wy1r4.mongodb.net/spt?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/sensors", sensors);
app.use("/api/devices", devices);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
