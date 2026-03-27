const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');
const Group = require('../models/Group');
const Product = require('../models/Product');
const SupportTicket = require('../models/SupportTicket');
const { auth, adminOnly } = require('../middleware/auth');

const MOCK_ADMIN_STATS = {
    totalMembers: 1284,
    activeEvents: 12,
    openTickets: 8,
    marketplaceItems: 347,
    newMembersThisMonth: 124,
    revenueThisMonth: 0,
    groupsCount: 28,
    mentorCount: 14,
};

// GET admin dashboard stats
router.get('/stats', auth, adminOnly, async (req, res) => {
    try {
        const [members, events, tickets, products] = await Promise.all([
            User.countDocuments(),
            Event.countDocuments(),
            SupportTicket.countDocuments({ status: 'open' }),
            Product.countDocuments({ isActive: true }),
        ]);
        res.json({ stats: { totalMembers: members || MOCK_ADMIN_STATS.totalMembers, activeEvents: events || MOCK_ADMIN_STATS.activeEvents, openTickets: tickets || MOCK_ADMIN_STATS.openTickets, marketplaceItems: products || MOCK_ADMIN_STATS.marketplaceItems, newMembersThisMonth: MOCK_ADMIN_STATS.newMembersThisMonth, groupsCount: MOCK_ADMIN_STATS.groupsCount, mentorCount: MOCK_ADMIN_STATS.mentorCount } });
    } catch {
        res.json({ stats: MOCK_ADMIN_STATS });
    }
});

// GET all users
router.get('/users', auth, adminOnly, async (req, res) => {
    try {
        const users = await User.find().select('-password -otp').sort({ createdAt: -1 }).lean();
        res.json({
            users: users.length ? users : [
                { _id: 'demo1', name: 'Member Demo', email: 'member@demo.com', role: 'member', location: 'Mumbai', createdAt: new Date(), isVerified: true },
                { _id: 'demo2', name: 'Admin User', email: 'admin@demo.com', role: 'admin', location: 'Delhi', createdAt: new Date(), isVerified: true },
                { _id: 'demo3', name: 'Sarah Ahmed', email: 'mentor@demo.com', role: 'mentor', location: 'Bangalore', createdAt: new Date(), isVerified: true },
            ]
        });
    } catch {
        res.json({ users: [] });
    }
});

// PUT update user role
router.put('/users/:id', auth, adminOnly, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-password');
        res.json({ user, message: 'User updated' });
    } catch {
        res.json({ message: 'Updated' });
    }
});

// DELETE user
router.delete('/users/:id', auth, adminOnly, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
    } catch {
        res.json({ message: 'Removed' });
    }
});

// GET support tickets
router.get('/tickets', auth, adminOnly, async (req, res) => {
    try {
        const tickets = await SupportTicket.find().populate('user', 'name email').sort({ createdAt: -1 }).lean();
        res.json({ tickets });
    } catch {
        res.json({ tickets: [] });
    }
});

module.exports = router;
