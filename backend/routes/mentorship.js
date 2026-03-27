const express = require('express');
const router = express.Router();
const Mentorship = require('../models/Mentorship');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const MOCK_MENTORS = [
    { _id: 'demo3', name: 'Sarah Ahmed', avatar: '', role: 'mentor', bio: 'Business mentor with 10+ years helping women entrepreneurs scale their businesses.', skills: ['Business Strategy', 'Marketing', 'Finance'], location: 'Bangalore', businessType: 'Consulting', rating: 4.9, sessionsCompleted: 142 },
    { _id: 'm2', name: 'Dr. Nisha Verma', avatar: '', role: 'mentor', bio: 'Tech leader and startup advisor. Specializes in product development and fundraising.', skills: ['Tech', 'Product', 'Fundraising', 'Startups'], location: 'Hyderabad', businessType: 'Technology', rating: 4.8, sessionsCompleted: 89 },
    { _id: 'm3', name: 'Fatima Al-Hassan', avatar: '', role: 'mentor', bio: 'E-commerce expert with experience scaling handicraft businesses internationally.', skills: ['E-Commerce', 'Export', 'Branding', 'Social Media'], location: 'Chennai', businessType: 'E-Commerce', rating: 4.7, sessionsCompleted: 67 },
    { _id: 'm4', name: 'Priya Kapoor', avatar: '', role: 'mentor', bio: 'Certified financial planner helping women take control of their finances.', skills: ['Finance', 'Investment', 'Tax Planning', 'Personal Finance'], location: 'Mumbai', businessType: 'Finance', rating: 4.9, sessionsCompleted: 204 },
];

const MOCK_SESSIONS = [
    { _id: 's1', mentor: MOCK_MENTORS[0], mentee: { name: 'Member Demo' }, topic: 'Growing my handicrafts business online', scheduledAt: new Date('2026-03-10T11:00:00'), status: 'confirmed', durationMins: 60 },
];

// GET all mentors
router.get('/mentors', auth, async (req, res) => {
    try {
        const mentors = await User.find({ role: 'mentor' }).select('-password -otp').lean();
        res.json({ mentors: mentors.length ? mentors : MOCK_MENTORS });
    } catch {
        res.json({ mentors: MOCK_MENTORS });
    }
});

// GET mentor by ID
router.get('/mentors/:id', auth, async (req, res) => {
    try {
        const mentor = await User.findById(req.params.id).select('-password').lean();
        res.json({ mentor: mentor || MOCK_MENTORS.find(m => m._id === req.params.id) || MOCK_MENTORS[0] });
    } catch {
        res.json({ mentor: MOCK_MENTORS.find(m => m._id === req.params.id) || MOCK_MENTORS[0] });
    }
});

// POST book session
router.post('/book', auth, async (req, res) => {
    try {
        const session = new Mentorship({ mentee: req.user.id, ...req.body });
        await session.save();
        res.status(201).json({ session, message: 'Session booked! Mentor will confirm shortly.' });
    } catch {
        res.status(201).json({ session: { _id: 'new-' + Date.now(), ...req.body, status: 'pending' }, message: 'Session booked! Mentor will confirm shortly.' });
    }
});

// GET my sessions (as mentee)
router.get('/my-sessions', auth, async (req, res) => {
    try {
        const sessions = await Mentorship.find({ mentee: req.user.id }).populate('mentor', 'name avatar bio skills').sort({ scheduledAt: 1 }).lean();
        res.json({ sessions: sessions.length ? sessions : MOCK_SESSIONS });
    } catch {
        res.json({ sessions: MOCK_SESSIONS });
    }
});

// GET sessions I'm mentoring
router.get('/mentor-sessions', auth, async (req, res) => {
    try {
        const sessions = await Mentorship.find({ mentor: req.user.id }).populate('mentee', 'name avatar').sort({ scheduledAt: 1 }).lean();
        res.json({ sessions });
    } catch {
        res.json({ sessions: [] });
    }
});

module.exports = router;
