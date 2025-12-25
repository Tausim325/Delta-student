const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  // 1. delete old data
  await Listing.deleteMany({});

  // 2. ONLY add owner — image ko touch hi mat karo
  const listings = initData.data.map((obj) => ({
    ...obj,
    owner: "692fefc53eb467202abe4135",
  }));

  // 3. insert
  await Listing.insertMany(listings);
  console.log("data was initialized");
};

initDB();
