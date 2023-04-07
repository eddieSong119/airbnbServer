const mongoose = require("mongoose");
const axios = require("axios");
const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const City = require("./models/city");
const Activity = require("./models/activity");
const Venue = require("./models/venue");

const mongoDBURI =
  "mongodb+srv://eddiesong119:980119Szh@cluster0.qx1jpfy.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

async function compressImage(inputPath, outputPath, maxSize) {
  const { width, height } = await sharp(inputPath).metadata();
  const scaleFactor = Math.sqrt(maxSize / (width * height));
  const newWidth = Math.floor(width * scaleFactor);
  const newHeight = Math.floor(height * scaleFactor);

  await sharp(inputPath).resize(newWidth, newHeight).toFile(outputPath);
}

async function downloadImage(url, destinationPath, maxSize) {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const tempPath = `./temp_${path.basename(url)}`;
  await fs.writeFile(tempPath, response.data);

  await compressImage(tempPath, destinationPath, maxSize);

  await fs.unlink(tempPath);
}

async function updateImageUrls() {
  const models = [
    { model: City, imageField: "image" },
    { model: Activity, imageField: "image" },
    { model: Venue, imageField: "imageUrl" },
  ];

  for (const { model, imageField } of models) {
    const records = await model.find();

    for (const record of records) {
      const imageUrl = record[imageField];
      if (!imageUrl) continue;

      const imageName = path.basename(imageUrl);
      const destinationPath = `./images/${imageName}`;

      await downloadImage(imageUrl, destinationPath, 300);

      record[imageField] = `./images/${imageName}`;
      await record.save();
    }
  }

  console.log("Image URLs updated successfully.");
  mongoose.connection.close();
}

updateImageUrls().catch((error) => {
  console.error(error);
  mongoose.connection.close();
});
