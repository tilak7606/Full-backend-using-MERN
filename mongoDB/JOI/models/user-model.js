const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect("mongodb://127.0.0.1:27017/testingjoi");

// Mongoose Schema Definition
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true,
        lowercase: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [30, 'Username must be at most 30 characters']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [100, 'Name must be at most 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return emailRegex.test(v);
            },
            message: '{VALUE} is not a valid email'
        }
    },
    contact: {
        type: Number,
        required: [true, 'Contact number is required'],
        validate: {
            validator: function(v) {
                // Basic phone number validation (10 digits)
                return /^\d{10}$/.test(String(v));
            },
            message: '{VALUE} is not a valid phone number'
        }
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age cannot be negative'],
        max: [120, 'Age cannot exceed 120']
    }
});

// Joi Validation Schema
const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .pattern(/^[a-zA-Z0-9_-]+$/)
            .required()
            .messages({
                'string.pattern': 'Username can only contain letters, numbers, underscore and hyphen',
                'any.required': 'Username is required'
            }),
        
        name: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({
                'string.min': 'Name must be at least 2 characters',
                'string.max': 'Name must be at most 100 characters',
                'any.required': 'Name is required'
            }),
        
            email: Joi.string()
            .email()
            .custom((value, helpers) => {
                // Extract TLD from email
                const tld = value.split('.').pop().toLowerCase();
                
                // Check if TLD is in allowed domains
                if (!['com', 'net', 'org'].includes(tld)) {
                    return helpers.message({
                        custom: 'Only .org, .com and .net domains are allowed'
                    });
                }
                
                return value;
            })
            .messages({
                'string.email': 'Invalid email address format',
                'string.empty': 'Email is required',
                'any.required': 'Email is required',
                'custom': 'Only .org, .com and .net domains are allowed'
            })
            .required()
            ,
        
        contact: Joi.number()
            .integer()
            .min(1000000000)
            .max(9999999999)
            .required()
            .messages({
                'number.integer': 'Contact must be a valid phone number',
                'number.min': 'Invalid phone number',
                'number.max': 'Invalid phone number',
                'any.required': 'Contact is required'
            }),
        
        age: Joi.number()
            .integer()
            .min(0)
            .max(120)
            .required()
            .messages({
                'number.integer': 'Age must be a whole number',
                'number.min': 'Age cannot be negative',
                'number.max': 'Age cannot exceed 120',
                'any.required': 'Age is required'
            })
    }) .messages({
        "string.email" : "only .com , .net and .org is allowed"
    })

    let {error} =  schema.validate(user);
    return error;
};

module.exports = {
    userModel : mongoose.model('User', userSchema),
    validateUser: validateUser
};