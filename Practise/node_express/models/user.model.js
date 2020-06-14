const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User must have a name']
    },
    email: {
        type: String,
        required: [true, 'User must have a Email address'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid e-mail address']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'User must have a password'],
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    confirmPassword: {
        type: String,
        required: [true, 'Must Confirm the password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not same!'
        },
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;

    next();
});

userSchema.pre(/^find/, function (next){
    this.find({ active: { $ne: false } });
    next();
});

userSchema.methods.correctPassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + (10*60*1000);

    console.log({resetToken},this.passwordResetToken);

    return resetToken;
}

const User = mongoose.model('User', userSchema);
module.exports = User;