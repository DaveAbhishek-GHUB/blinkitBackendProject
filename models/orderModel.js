const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
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
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 200
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Delivery",
        required: true
    }
}, { timestamps: true });

const validateOrder = (order) => {
    const schema = Joi.object({
        user: Joi.string().required(),
        products: Joi.array().items(Joi.string()).required(),
        totalPrice: Joi.number().min(0).required(),
        address: Joi.string().min(10).max(200).required(),
        status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').default('pending'),
        payment: Joi.string().required(),
        delivery: Joi.string().required()
    });
    return schema.validate(order);
};

module.exports = {
    orderModel: mongoose.model("Order", orderSchema),
    validate: validateOrder
};