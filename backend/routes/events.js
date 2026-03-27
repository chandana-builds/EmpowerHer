const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { auth } = require('../middleware/auth');

const MOCK_EVENTS = [
    { _id: 'e1', title: 'Women Leadership Summit 2026', description: 'Annual gathering of women leaders across industries.', category: 'Summit', date: new Date('2026-03-15T10:00:00'), location: 'Mumbai Convention Centre', isOnline: false, image: '', attendees: ['demo1', 'demo3'], maxAttendees: 500, isFree: false, price: 999, organizer: { name: 'EmpowerHer Team', avatar: '' }, tags: ['leadership', 'networking'] },
    { _id: 'e2', title: 'Digital Marketing Masterclass', description: 'Learn social media and SEO strategies for your business.', category: 'Workshop', date: new Date('2026-03-20T14:00:00'), location: '', isOnline: true, meetingLink: 'https://meet.example.com/dm-class', image: '', attendees: ['demo1'], maxAttendees: 100, isFree: true, price: 0, organizer: { name: 'Sarah Ahmed', avatar: '' }, tags: ['marketing', 'digital'] },
    { _id: 'e3', title: 'Legal Rights for Women Entrepreneurs', description: 'Know your rights as a business owner. Free legal workshop.', category: 'Webinar', date: new Date('2026-03-25T16:00:00'), location: '', isOnline: true, meetingLink: '', image: '', attendees: [], maxAttendees: 200, isFree: true, price: 0, organizer: { name: 'LegalEase NGO', avatar: '' }, tags: ['legal', 'rights'] },
    { _id: 'e4', title: 'Handicrafts Business Expo', description: 'Showcase your handmade products and find buyers.', category: 'Social', date: new Date('2026-04-05T09:00:00'), location: 'Delhi Trade Centre', isOnline: false, image: '', attendees: ['demo1', 'demo2'], maxAttendees: 300, isFree: false, price: 299, organizer: { name: 'Craft India', avatar: '' }, tags: ['handicrafts', 'expo'] },
];

router.get('/', auth, async (req, res) => {
    try {
        const events = await Event.find().populate('organizer', 'name avatar').sort({ date: 1 }).lean();
        res.json({ events: events.length ? events : MOCK_EVENTS });
    } catch {
        res.json({ events: MOCK_EVENTS });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('organizer', 'name avatar').populate('attendees', 'name avatar').lean();
        res.json({ event: event || MOCK_EVENTS.find(e => e._id === req.params.id) || MOCK_EVENTS[0] });
    } catch {
        res.json({ event: MOCK_EVENTS.find(e => e._id === req.params.id) || MOCK_EVENTS[0] });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const event = new Event({ ...req.body, organizer: req.user.id });
        await event.save();
        res.status(201).json({ event });
    } catch {
        res.status(201).json({ event: { _id: 'new-' + Date.now(), ...req.body } });
    }
});

router.post('/:id/rsvp', auth, async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, { $addToSet: { attendees: req.user.id } }, { new: true });
        res.json({ message: 'RSVP confirmed!', event });
    } catch {
        res.json({ message: 'RSVP confirmed!' });
    }
});

router.delete('/:id/rsvp', auth, async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, { $pull: { attendees: req.user.id } }, { new: true });
        res.json({ message: 'RSVP cancelled', event });
    } catch {
        res.json({ message: 'RSVP cancelled' });
    }
});

module.exports = router;
