import mongoose from "mongoose";
import * as dotenv from "dotenv";

import { products, users } from "./data.js";
import connectDB from "./mongodb/connect.js";

import Product from "./mongodb/models/product.js";
import User from "./mongodb/models/user.js";

dotenv.config();

const startSeeding = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    // Insert product data into the database
    Product.insertMany(products)
      .then(() => console.log("Products seeded successfully"))
      .catch((err) => console.error(err));

    // Insert user data into the database
    User.insertMany(users)
      .then(() => console.log("Users seeded successfully"))
      .catch((err) => console.error(err));
  } catch (error) {
    console.log(error);
  } finally {
    // mongoose.connection.close();
  }
};

startSeeding();