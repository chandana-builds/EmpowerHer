const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['group', 'event', 'marketplace', 'safety', 'mentorship', 'support', 'system', 'achievement'], default: 'system' },
    link: { type: String, default: '' },
    read: { type: Boolean, default: false },
    icon: { type: String, default: '🔔' },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
