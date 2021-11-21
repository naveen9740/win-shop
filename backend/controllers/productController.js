const Product = require("../models/productModel");

// Create Product
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
};

// Update a Product
exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  let product = await Product.findById(id);
  if (!product) {
    return res
      .status(500)
      .json({ sucess: false, message: "Product Not Found" });
  }
  product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.json({ sucess: true, product });
};

// Delete Product
exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res
      .status(500)
      .json({ sucess: false, message: "Product Not Found" });
  }
  await product.remove();
  res.json({ sucess: true, message: "Product Deleted success" });
};

//Get Product Details
exports.getProductDetails = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res
      .status(500)
      .json({ sucess: false, message: "Product Not Found" });
  }
  res.json({ sucess: true, product });
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json({ success: true, products });
};
