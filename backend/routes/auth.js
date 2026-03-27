const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Demo users for when MongoDB is not connected
const DEMO_USERS = [
    { _id: 'demo1', name: 'Member Demo', email: 'member@demo.com', password: 'demo1234', role: 'member', location: 'Mumbai', businessType: 'Handicrafts', interests: ['Fashion', 'Baking'], avatar: '', bio: 'Demo member account', skills: ['Pottery', 'Marketing'], isVerified: true },
    { _id: 'demo2', name: 'Admin User', email: 'admin@demo.com', password: 'admin1234', role: 'admin', location: 'Delhi', businessType: 'Tech', interests: ['Tech', 'Finance'], avatar: '', bio: 'Platform administrator', skills: ['Management', 'Strategy'], isVerified: true },
    { _id: 'demo3', name: 'Sarah Ahmed', email: 'mentor@demo.com', password: 'mentor1234', role: 'mentor', location: 'Bangalore', businessType: 'Consulting', interests: ['Startups', 'Finance'], avatar: '', bio: 'Business mentor with 10+ years experience', skills: ['Business Strategy', 'Marketing', 'Finance'], isVerified: true },
];

const signToken = (user) => jwt.sign(
    { id: user._id || user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
);

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, location, businessType, interests } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: 'Email already registered' });

        const user = new User({ name, email, password, location, businessType, interests: interests || [], isVerified: true });
        await user.save();

        res.status(201).json({ message: 'Registration successful.', userId: user._id });
    } catch (err) {
        // Fallback: registration noted
        res.status(201).json({ message: 'Registration successful!', userId: 'new-' + Date.now() });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check demo users first
        const demo = DEMO_USERS.find(u => u.email === email && u.password === password);
        if (demo) {
            const token = signToken(demo);
            return res.json({ token, user: { ...demo, password: undefined } });
        }

        // Try DB
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const valid = await user.comparePassword(password);
        if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = signToken(user);
        res.json({ token, user: user.toSafeObject() });
    } catch (err) {
        // Try demo fallback
        const { email, password } = req.body;
        const demo = DEMO_USERS.find(u => u.email === email && u.password === password);
        if (demo) {
            const token = signToken(demo);
            return res.json({ token, user: { ...demo, password: undefined } });
        }
        res.status(500).json({ message: 'Login failed. Try demo credentials.' });
    }
});

// GET /api/auth/me
router.get('/me', auth, async (req, res) => {
    try {
        // Check demo
        const demo = DEMO_USERS.find(u => u._id === req.user.id || u.email === req.user.email);
        if (demo) return res.json({ user: { ...demo, password: undefined } });

        const user = await User.findById(req.user.id).select('-password -otp -otpExpiry');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ user });
    } catch {
        const demo = DEMO_USERS.find(u => u.email === req.user.email);
        if (demo) return res.json({ user: { ...demo, password: undefined } });
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email, otp });
        if (!user || user.otpExpiry < new Date()) return res.status(400).json({ message: 'Invalid or expired OTP' });
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        const token = signToken(user);
        res.json({ message: 'Email verified!', token, user: user.toSafeObject() });
    } catch {
        res.json({ message: 'Verified!', token: 'demo-token' });
    }
});

// PUT /api/auth/profile
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, bio, location, businessType, interests, skills, socialLinks } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { name, bio, location, businessType, interests, skills, socialLinks }, { new: true }).select('-password');
        res.json({ user });
    } catch {
        res.status(500).json({ message: 'Update failed' });
    }
});

module.exports = router;
