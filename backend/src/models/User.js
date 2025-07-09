const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },

    govaaEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    contactEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    agency: {
        type: String,
        required: true,
        trim: true
    },

    jobDescription: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 500
    },

    acceptedTerms: {
        type: Boolean,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    registeredAt: {
        type: Date,
        default: Date.now
    },

    lastLoginAt: {
        type: Date
    }
}, {
    timestamps: true
});

userSchema.index({ agency: 1 });
userSchema.index({ registeredAt: -1 });

userSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.__v;
    return userObject;
};

module.exports = mongoose.model('User', userSchema);