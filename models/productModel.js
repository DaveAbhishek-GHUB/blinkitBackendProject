const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  stock: {
    type: Boolean,
    required: true,
    default: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000
  },
  image: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().min(2).max(50).required(),
    stock: Joi.boolean().required(),
    description: Joi.string().required(),
    image: Joi.string().required()
  });
  return schema.validate(product);
};

module.exports = {
  productModel: mongoose.model("Product", productSchema),
  validate: validateProduct
};
