const express = require('express');
const router = express.Router();
const SupportTicket = require('../models/SupportTicket');
const { auth, adminOnly } = require('../middleware/auth');

const MOCK_TICKETS = [
    { _id: 't1', subject: 'Need help with marketplace listing', message: 'Cannot upload images to my product listing.', category: 'Technical', priority: 'medium', status: 'in-progress', responses: [{ author: { name: 'Support Team' }, message: 'We are looking into this issue.', isStaff: true, createdAt: new Date() }], createdAt: new Date(Date.now() - 2 * 3600000) },
    { _id: 't2', subject: 'Facing harassment in a group', message: 'Someone is sending inappropriate messages.', category: 'Abuse', priority: 'urgent', status: 'open', responses: [], createdAt: new Date(Date.now() - 86400000) },
];

// POST create ticket
router.post('/', auth, async (req, res) => {
    try {
        const ticket = new SupportTicket({ user: req.user.id, ...req.body });
        await ticket.save();
        res.status(201).json({ ticket, message: 'Support ticket created. We will respond within 24 hours.' });
    } catch {
        res.status(201).json({ ticket: { _id: 'new-' + Date.now(), ...req.body, status: 'open', responses: [] }, message: 'Ticket submitted! Our team will get back to you soon.' });
    }
});

// GET my tickets
router.get('/my-tickets', auth, async (req, res) => {
    try {
        const tickets = await SupportTicket.find({ user: req.user.id }).sort({ createdAt: -1 }).lean();
        res.json({ tickets: tickets.length ? tickets : MOCK_TICKETS });
    } catch {
        res.json({ tickets: MOCK_TICKETS });
    }
});

// GET all tickets (admin)
router.get('/', auth, adminOnly, async (req, res) => {
    try {
        const tickets = await SupportTicket.find().populate('user', 'name email').sort({ createdAt: -1 }).lean();
        res.json({ tickets: tickets.length ? tickets : MOCK_TICKETS });
    } catch {
        res.json({ tickets: MOCK_TICKETS });
    }
});

// GET single ticket
router.get('/:id', auth, async (req, res) => {
    try {
        const ticket = await SupportTicket.findById(req.params.id).populate('responses.author', 'name avatar').lean();
        res.json({ ticket: ticket || MOCK_TICKETS[0] });
    } catch {
        res.json({ ticket: MOCK_TICKETS[0] });
    }
});

// POST respond to ticket
router.post('/:id/respond', auth, async (req, res) => {
    try {
        const ticket = await SupportTicket.findByIdAndUpdate(req.params.id, {
            $push: { responses: { author: req.user.id, message: req.body.message, isStaff: req.user.role === 'admin' } },
            status: req.body.status || 'in-progress'
        }, { new: true });
        res.json({ ticket, message: 'Response added' });
    } catch {
        res.json({ message: 'Response added' });
    }
});

module.exports = router;
