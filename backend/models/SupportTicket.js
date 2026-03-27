const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    isStaff: { type: Boolean, default: false },
}, { timestamps: true });

const supportTicketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    category: { type: String, enum: ['Safety', 'Technical', 'Billing', 'Abuse', 'Mental Health', 'Legal', 'Other'], default: 'Other' },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    status: { type: String, enum: ['open', 'in-progress', 'resolved', 'closed'], default: 'open' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    responses: [responseSchema],
    isConfidential: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
