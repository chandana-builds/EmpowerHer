const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    contactInfo: { type: String, default: '' },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, enum: ['Handicrafts', 'Fashion', 'Food', 'Beauty', 'Tech', 'Services', 'Education', 'Other'], default: 'Other' },
    images: [{ type: String }],
    isActive: { type: Boolean, default: true },
    inquiries: [inquirySchema],
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    location: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
