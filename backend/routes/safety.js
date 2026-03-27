const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

const SAFETY_TIPS = [
    { id: 1, tip: 'Share your live location with trusted contacts when traveling alone.', icon: '📍' },
    { id: 2, tip: 'Save local police (100), ambulance (108), and women helpline (1091) on speed dial.', icon: '📞' },
    { id: 3, tip: 'Avoid isolated areas at night. Stick to well-lit, populated routes.', icon: '💡' },
    { id: 4, tip: 'Trust your instincts. If something feels wrong, leave immediately.', icon: '🧠' },
    { id: 5, tip: 'Inform someone reliable about your whereabouts and expected return time.', icon: '👥' },
    { id: 6, tip: 'Keep your phone charged when going out, especially at night.', icon: '🔋' },
];

const EMERGENCY_CONTACTS = [
    { name: 'Police Emergency', number: '100', type: 'police' },
    { name: 'Ambulance', number: '108', type: 'ambulance' },
    { name: 'Women Helpline', number: '1091', type: 'helpline' },
    { name: 'National Emergency', number: '112', type: 'national' },
    { name: 'Cyber Crime', number: '1930', type: 'cyber' },
    { name: 'Domestic Violence', number: '181', type: 'helpline' },
];

const sosLogs = [];

// POST SOS alert
router.post('/sos', auth, async (req, res) => {
    const { latitude, longitude, message } = req.body;
    const alert = {
        id: 'sos-' + Date.now(),
        userId: req.user.id,
        userName: req.user.name,
        latitude,
        longitude,
        message: message || 'Emergency! I need help!',
        timestamp: new Date(),
        status: 'sent'
    };
    sosLogs.push(alert);
    console.log('🚨 SOS ALERT:', alert);
    res.json({
        success: true,
        message: 'SOS alert sent! Emergency services notified.',
        alert,
        emergencyNumbers: EMERGENCY_CONTACTS
    });
});

// GET emergency contacts
router.get('/contacts', auth, (req, res) => {
    res.json({ contacts: EMERGENCY_CONTACTS });
});

// GET safety tips
router.get('/tips', auth, (req, res) => {
    res.json({ tips: SAFETY_TIPS });
});

// GET SOS logs (admin)
router.get('/sos-logs', auth, (req, res) => {
    res.json({ logs: sosLogs });
});

module.exports = router;
