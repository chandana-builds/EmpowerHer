const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Workshop', 'Networking', 'Webinar', 'Summit', 'Training', 'Social', 'Other'], default: 'Other' },
    date: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String, default: '' },
    isOnline: { type: Boolean, default: false },
    meetingLink: { type: String, default: '' },
    image: { type: String, default: '' },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    maxAttendees: { type: Number, default: 100 },
    isFree: { type: Boolean, default: true },
    price: { type: Number, default: 0 },
    tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
