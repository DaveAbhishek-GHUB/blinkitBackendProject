    const mongoose = require("mongoose");
    const Joi = require("joi");

    const paymentSchema = new mongoose.Schema({
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        method: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            required: true,
            default: 'pending'
        },
        transactionId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    }, { timestamps: true });

    const validatePayment = (payment) => {
        const schema = Joi.object({
            order: Joi.string().required(),
            amount: Joi.number().min(0).required(),
            method: Joi.string().required(),
            status: Joi.string().required(),
            transactionId: Joi.string().required()
        });
        return schema.validate(payment);
    };

    module.exports = {
        paymentModel: mongoose.model("Payment", paymentSchema),
        validate: validatePayment
    };