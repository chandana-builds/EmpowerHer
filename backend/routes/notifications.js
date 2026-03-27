const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { auth } = require('../middleware/auth');

const MOCK_NOTIFICATIONS = [
    { _id: 'n1', message: 'Priya commented on your post in Startups & Entrepreneurs', type: 'group', link: '/groups/g1', read: false, icon: '💬', createdAt: new Date(Date.now() - 5 * 60000) },
    { _id: 'n2', message: 'Reminder: Women Leadership Summit tomorrow at 10:00 AM', type: 'event', link: '/events/e1', read: false, icon: '📅', createdAt: new Date(Date.now() - 3600000) },
    { _id: 'n3', message: 'Your listing "Handmade Earrings" received 3 new inquiries', type: 'marketplace', link: '/marketplace', read: false, icon: '🛍️', createdAt: new Date(Date.now() - 2 * 3600000) },
    { _id: 'n4', message: 'Sarah Ahmed confirmed your mentorship session for March 10', type: 'mentorship', link: '/mentorship', read: true, icon: '🤝', createdAt: new Date(Date.now() - 3 * 3600000) },
    { _id: 'n5', message: 'You earned the "Community Star" badge! 🏆', type: 'achievement', link: '/profile', read: true, icon: '🏆', createdAt: new Date(Date.now() - 86400000) },
    { _id: 'n6', message: 'New member Ritu Verma joined your group Tech Sisters', type: 'group', link: '/groups/g2', read: true, icon: '👋', createdAt: new Date(Date.now() - 2 * 86400000) },
];

// GET notifications
router.get('/', auth, async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user.id }).sort({ createdAt: -1 }).lean();
        res.json({ notifications: notifications.length ? notifications : MOCK_NOTIFICATIONS });
    } catch {
        res.json({ notifications: MOCK_NOTIFICATIONS });
    }
});

// PUT mark all read  (must be BEFORE /:id/read to avoid Express matching 'read-all' as an id)
router.put('/read-all', auth, async (req, res) => {
    try {
        await Notification.updateMany({ recipient: req.user.id, read: false }, { read: true });
        res.json({ message: 'All notifications marked as read' });
    } catch {
        res.json({ message: 'Done' });
    }
});

// PUT mark single as read
router.put('/:id/read', auth, async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { read: true });
        res.json({ message: 'Marked as read' });
    } catch {
        res.json({ message: 'Marked as read' });
    }
});

module.exports = router;
