const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncError")
// Create a Product
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})


//Get all Products
exports.getAllProducts = catchAsyncErrors(async(req,res)=>{
    const products = await Product.find();
    if (!products) {
        return next(new ErrorHandler("Product not found", 404));
      }
    res.status(200).json({
        success:true,
        products
    })
})

//Update Products -- Admin
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{

    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }
  

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });

        res.status(200).json({
            success:true,
            product
        })
    }
)
    // Delete Product

    exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
          }

        await product.deleteOne();

        res.status(200).json({
            success:true,
            message:"Product Delete Successfull"
        })
    }
    )
// Get Product Details
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }
    res.status(200).json({
        success:true,
        product
    })
})