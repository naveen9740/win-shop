const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// Create Product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// Update a Product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.json({ sucess: true, product });
});

// Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  await product.remove();
  res.json({ sucess: true, message: "Product Deleted success" });
});

//Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.json({ sucess: true, product });
});

// Get All Products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const products = await Product.find();
  res.json({ success: true, products });
});
