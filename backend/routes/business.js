const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

const MOCK_STATS = {
    revenue: [
        { month: 'Oct', revenue: 12400 }, { month: 'Nov', revenue: 18900 }, { month: 'Dec', revenue: 22100 },
        { month: 'Jan', revenue: 19800 }, { month: 'Feb', revenue: 27500 }, { month: 'Mar', revenue: 31200 },
    ],
    inquiries: 24,
    views: 1284,
    sales: 18,
    networkingScore: 78,
    growth: '+23%',
    topCategory: 'Handicrafts',
};

const MOCK_TIPS = [
    { id: 1, category: 'Marketing', tip: 'Use Instagram Reels to showcase your products — short videos get 3x more reach than photos.', icon: '📱' },
    { id: 2, category: 'Finance', tip: 'Keep personal and business finances separate. Open a dedicated business account today.', icon: '💰' },
    { id: 3, category: 'Networking', tip: 'Attend at least 2 networking events per month. 80% of opportunities come through connections.', icon: '🤝' },
    { id: 4, category: 'E-Commerce', tip: 'High-quality photos increase sales by 40%. Use natural light and clean backgrounds.', icon: '📸' },
    { id: 5, category: 'Productivity', tip: 'Batch similar tasks together. Reply to all inquiries in one sitting instead of throughout the day.', icon: '⚡' },
    { id: 6, category: 'Legal', tip: 'Register your business to access government schemes for women entrepreneurs (Mudra Loan, PMEGP).', icon: '📋' },
];

// GET stats
router.get('/stats', auth, (req, res) => {
    res.json({ stats: MOCK_STATS });
});

// GET tips
router.get('/tips', auth, (req, res) => {
    res.json({ tips: MOCK_TIPS });
});

module.exports = router;
