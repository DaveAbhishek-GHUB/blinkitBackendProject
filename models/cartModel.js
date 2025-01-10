const mongoose = require("mongoose");
const Joi = require("joi");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

const validateCart = (cart) => {
    const schema = Joi.object({
        user: Joi.string().required(),
        products: Joi.array().items(Joi.string()).required(),
        totalPrice: Joi.number().min(0).required()
    });
    return schema.validate(cart);
};

module.exports = {
    cartModel: mongoose.model("Cart", cartSchema),
    validate: validateCart
};
