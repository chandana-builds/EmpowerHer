const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    image: { type: String, default: '' },
}, { timestamps: true });

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Startups', 'E-Commerce', 'Baking', 'Fashion', 'Teaching', 'Handicrafts', 'Freelancing', 'Tech', 'Healthcare', 'Finance', 'General'], default: 'General' },
    coverImage: { type: String, default: '' },
    isPrivate: { type: Boolean, default: false },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [postSchema],
    tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
