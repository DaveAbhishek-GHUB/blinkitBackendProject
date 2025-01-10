const mongoose = require("mongoose");
const Joi = require("joi");

const delhiverySchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    deliveryBoy: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'in-transit', 'delivered', 'cancelled'],
        default: 'pending'
    },
    trackingURL: {
        type: String,
        required: true,
        trim: true
    },
    estimatedDelivery: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const validateDelhivery = (delivery) => {
    const schema = Joi.object({
        order: Joi.string().required(),
        deliveryBoy: Joi.string().min(2).max(50).required(),
        status: Joi.string().valid('pending', 'in-transit', 'delivered', 'failed').default('pending'),
        trackingURL: Joi.string().required(),
        estimatedDelivery: Joi.date().required()
    });
    return schema.validate(delivery);
};

module.exports = {
    delhiveryModel: mongoose.model("Delhivery", delhiverySchema),
    validate: validateDelhivery
};
