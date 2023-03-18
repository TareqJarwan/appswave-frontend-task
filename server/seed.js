import mongoose from 'mongoose';
import * as dotenv from "dotenv";


import { products } from "./data.js";
import connectDB from "./mongodb/connect.js";

import Product from './mongodb/models/product.js';

dotenv.config();

const startSeeding = async () => {
    try {
        connectDB(process.env.MONGODB_URL)

        // Insert product data into the database
        Product.insertMany(products)
            .then(() => {
                console.log('Products seeded successfully');
                mongoose.connection.close();
            })
            .catch(err => {
                console.error(err);
                mongoose.connection.close();
            });

    } catch (error) {
        console.log(error);
    }
};

startSeeding();


