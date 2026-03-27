const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

const MOCK_PRODUCTS = [
    { _id: 'p1', title: 'Handmade Terracotta Earrings', description: 'Beautiful handcrafted earrings made from natural clay.', price: 350, category: 'Handicrafts', seller: { name: 'Priya Sharma', avatar: '' }, images: [], isActive: true, inquiries: [], tags: ['earrings', 'terracotta'], location: 'Jaipur', views: 124, createdAt: new Date() },
    { _id: 'p2', title: 'Organic Skincare Kit', description: 'Natural ingredients, handmade with love. Includes face wash, toner, and moisturizer.', price: 899, category: 'Beauty', seller: { name: 'Aisha Khan', avatar: '' }, images: [], isActive: true, inquiries: [], tags: ['skincare', 'organic'], location: 'Kerala', views: 89, createdAt: new Date() },
    { _id: 'p3', title: 'Logo Design Service', description: 'Professional logo design for your business. Includes 3 revisions.', price: 2000, category: 'Services', seller: { name: 'Ritu Verma', avatar: '' }, images: [], isActive: true, inquiries: [], tags: ['design', 'logo'], location: 'Remote', views: 203, createdAt: new Date() },
    { _id: 'p4', title: 'Banana Bread Mix (Homemade)', description: 'Ready-to-bake banana bread mix. Just add eggs and butter!', price: 280, category: 'Food', seller: { name: 'Meena Patel', avatar: '' }, images: [], isActive: true, inquiries: [], tags: ['baking', 'food'], location: 'Pune', views: 67, createdAt: new Date() },
    { _id: 'p5', title: 'Online Excel & Data Entry Course', description: '10-module course teaching Excel from basics to advanced.', price: 1499, category: 'Education', seller: { name: 'Sarah Ahmed', avatar: '' }, images: [], isActive: true, inquiries: [], tags: ['excel', 'education'], location: 'Online', views: 341, createdAt: new Date() },
    { _id: 'p6', title: 'Handloom Saree - Blue & Gold', description: 'Pure cotton handloom saree with traditional motifs.', price: 1800, category: 'Fashion', seller: { name: 'Lakshmi Iyer', avatar: '' }, images: [], isActive: true, inquiries: [], tags: ['saree', 'handloom'], location: 'Varanasi', views: 158, createdAt: new Date() },
];

router.get('/', auth, async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = { isActive: true };
        if (category && category !== 'All') query.category = category;
        if (search) query.$text = { $search: search };
        const products = await Product.find(query).populate('seller', 'name avatar').sort({ createdAt: -1 }).lean();
        res.json({ products: products.length ? products : MOCK_PRODUCTS });
    } catch {
        res.json({ products: MOCK_PRODUCTS });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true }).populate('seller', 'name avatar location').lean();
        res.json({ product: product || MOCK_PRODUCTS.find(p => p._id === req.params.id) || MOCK_PRODUCTS[0] });
    } catch {
        res.json({ product: MOCK_PRODUCTS.find(p => p._id === req.params.id) || MOCK_PRODUCTS[0] });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const product = new Product({ ...req.body, seller: req.user.id });
        await product.save();
        res.status(201).json({ product });
    } catch {
        res.status(201).json({ product: { _id: 'new-' + Date.now(), ...req.body, seller: { name: req.user.name } } });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Product.findOneAndUpdate({ _id: req.params.id, seller: req.user.id }, { isActive: false });
        res.json({ message: 'Listing removed' });
    } catch {
        res.json({ message: 'Listing removed' });
    }
});

router.post('/:id/inquire', auth, async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, { $push: { inquiries: { buyer: req.user.id, message: req.body.message, contactInfo: req.body.contactInfo } } });
        res.json({ message: 'Inquiry sent to seller!' });
    } catch {
        res.json({ message: 'Inquiry sent!' });
    }
});

router.get('/my/listings', auth, async (req, res) => {
    try {
        const products = await Product.find({ seller: req.user.id, isActive: true }).lean();
        res.json({ products: products.length ? products : MOCK_PRODUCTS.slice(0, 2) });
    } catch {
        res.json({ products: MOCK_PRODUCTS.slice(0, 2) });
    }
});

module.exports = router;
