const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  }
}, { timestamps: true });

const validateCategory = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required()
  });
  return schema.validate(category);
};

module.exports = {
  categoryModel: mongoose.model("Category", categorySchema),
  validate: validateCategory
};
