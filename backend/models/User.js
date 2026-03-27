const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['member', 'mentor', 'admin'], default: 'member' },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    businessType: { type: String, default: '' },
    interests: [{ type: String }],
    skills: [{ type: String }],
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiry: { type: Date },
    socialLinks: {
        linkedin: { type: String, default: '' },
        instagram: { type: String, default: '' },
        website: { type: String, default: '' },
    },
    groupsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    eventsAttending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    notificationPrefs: { email: { type: Boolean, default: true }, push: { type: Boolean, default: true } },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = function (plain) {
    return bcrypt.compare(plain, this.password);
};

userSchema.methods.toSafeObject = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.otp;
    delete obj.otpExpiry;
    return obj;
};

module.exports = mongoose.model('User', userSchema);
