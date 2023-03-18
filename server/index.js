import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import { products } from "./data.js";
import Product from './mongodb/models/product.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        //Product.insertMany(products)

        app.listen(5001, () =>
            console.log("Server started on port http://localhost:5001"),
        );

    } catch (error) {
        console.log(error);
    }
};

startServer();