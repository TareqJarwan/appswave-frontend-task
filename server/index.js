import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";

import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(5000, () =>
      console.log("Server started on port http://localhost:5000")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();