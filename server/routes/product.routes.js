import express from "express";

import {
    getAllProducts,
    getProductDetail,
} from "../controllers/product.controller.js";

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/:id").get(getProductDetail);

export default router;