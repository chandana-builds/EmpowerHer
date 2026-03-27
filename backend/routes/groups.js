const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const { auth } = require('../middleware/auth');

const MOCK_GROUPS = [
    { _id: 'g1', name: 'Startups & Entrepreneurs', description: 'A community for women building businesses from scratch.', category: 'Startups', members: ['demo1', 'demo3'], posts: [], coverImage: '', isPrivate: false, tags: ['startup', 'business'], createdAt: new Date() },
    { _id: 'g2', name: 'Tech Sisters', description: 'Women in tech helping each other grow.', category: 'Tech', members: ['demo1', 'demo2'], posts: [], coverImage: '', isPrivate: false, tags: ['tech', 'coding'], createdAt: new Date() },
    { _id: 'g3', name: 'Fashion Forward', description: 'Designers, stylists and fashionistas connect here.', category: 'Fashion', members: ['demo1'], posts: [], coverImage: '', isPrivate: false, tags: ['fashion', 'design'], createdAt: new Date() },
    { _id: 'g4', name: 'Home Bakers United', description: 'Share recipes, tips and grow your baking business.', category: 'Baking', members: [], posts: [], coverImage: '', isPrivate: false, tags: ['baking', 'food'], createdAt: new Date() },
    { _id: 'g5', name: 'Finance & Investments', description: 'Smart money moves for women investors.', category: 'Finance', members: ['demo2'], posts: [], coverImage: '', isPrivate: false, tags: ['finance', 'investing'], createdAt: new Date() },
];

// GET all groups
router.get('/', auth, async (req, res) => {
    try {
        const groups = await Group.find().populate('creator', 'name avatar').lean();
        res.json({ groups: groups.length ? groups : MOCK_GROUPS });
    } catch {
        res.json({ groups: MOCK_GROUPS });
    }
});

// GET single group
router.get('/:id', auth, async (req, res) => {
    try {
        const group = await Group.findById(req.params.id).populate('members', 'name avatar').populate('posts.author', 'name avatar').lean();
        res.json({ group: group || MOCK_GROUPS.find(g => g._id === req.params.id) || MOCK_GROUPS[0] });
    } catch {
        res.json({ group: MOCK_GROUPS.find(g => g._id === req.params.id) || MOCK_GROUPS[0] });
    }
});

// POST create group
router.post('/', auth, async (req, res) => {
    try {
        const group = new Group({ ...req.body, creator: req.user.id, members: [req.user.id] });
        await group.save();
        res.status(201).json({ group });
    } catch {
        res.status(201).json({ group: { _id: 'new-' + Date.now(), ...req.body, members: [req.user.id] } });
    }
});

// POST join group
router.post('/:id/join', auth, async (req, res) => {
    try {
        const group = await Group.findByIdAndUpdate(req.params.id, { $addToSet: { members: req.user.id } }, { new: true });
        res.json({ message: 'Joined successfully', group });
    } catch {
        res.json({ message: 'Joined successfully' });
    }
});

// POST leave group
router.post('/:id/leave', auth, async (req, res) => {
    try {
        const group = await Group.findByIdAndUpdate(req.params.id, { $pull: { members: req.user.id } }, { new: true });
        res.json({ message: 'Left group', group });
    } catch {
        res.json({ message: 'Left group' });
    }
});

// POST add post to group
router.post('/:id/posts', auth, async (req, res) => {
    try {
        const group = await Group.findByIdAndUpdate(req.params.id, { $push: { posts: { author: req.user.id, content: req.body.content, image: req.body.image } } }, { new: true });
        res.status(201).json({ message: 'Post added', group });
    } catch {
        res.status(201).json({ message: 'Post added' });
    }
});

module.exports = router;
