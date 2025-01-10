const mongoose = require("mongoose");
const Joi = require("joi");

const addressSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    zip: {
        type: Number,
        required: true,
        min: 100000,
        max: 999999
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        // required: true,
        minlength: 8,
        maxlength: 1024
    },
    phone: {
        type: Number,
        // required: true,
        min: 1000000000,
        max: 9999999999
    },
    addresses: [addressSchema],
    googleId: {
        type: String,
        sparse: true
    }
}, { timestamps: true });

// Joi validation schema
const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(255)  ,
        phone: Joi.number().min(1000000000).max(9999999999),
        addresses: Joi.array().items(
            Joi.object({
                state: Joi.string().min(2).max(50).required(),
                city: Joi.string().min(2).max(50).required(),
                address: Joi.string().min(5).max(255).required(),
                zip: Joi.number().min(100000).max(999999).required()
            })
        ),
        googleId: Joi.string()
    });
    return schema.validate(user);
};

module.exports = {
    userModel: mongoose.model("User", userSchema),
    validate: validateUser
};
