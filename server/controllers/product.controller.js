import Product from "../mongodb/models/product.js";

const getAllProducts = async (req, res) => {
  try {
    const { page = 0, pageSize = 10 } = req.query;

    const products = await Product.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const total = await Product.countDocuments();

    res.json({ products, total });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getProductDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(500).send("Server Error");
  }
};

export { getAllProducts, getProductDetail };
