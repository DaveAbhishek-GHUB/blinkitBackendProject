const mongoose = require("mongoose");
const Joi = require("joi");

const adminSchema = new mongoose.Schema({
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
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    role: {
        type: String,
        required: true,
        enum: ['superadmin', 'admin',],
        default: 'admin'
    }
}, { timestamps: true });

const validateAdmin = (admin) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(255).required(),
        role: Joi.string().valid('super-admin', 'admin', 'moderator').default('admin')
    });
    return schema.validate(admin);
};

module.exports = {
    adminModel: mongoose.model("Admin", adminSchema),
    validate: validateAdmin
};
