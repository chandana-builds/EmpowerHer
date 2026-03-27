import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { Bell, Check, CheckCheck, Filter } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
    { _id: 'n1', message: 'Priya commented on your post in Startups & Entrepreneurs', type: 'group', link: '/groups', read: false, icon: '💬', createdAt: new Date(Date.now() - 5 * 60000) },
    { _id: 'n2', message: 'Reminder: Women Leadership Summit tomorrow at 10:00 AM', type: 'event', link: '/events', read: false, icon: '📅', createdAt: new Date(Date.now() - 3600000) },
    { _id: 'n3', message: 'Your listing "Handmade Earrings" received 3 new inquiries', type: 'marketplace', link: '/marketplace', read: false, icon: '🛍️', createdAt: new Date(Date.now() - 2 * 3600000) },
    { _id: 'n4', message: 'Sarah Ahmed confirmed your mentorship session for March 10', type: 'mentorship', link: '/mentorship', read: true, icon: '🤝', createdAt: new Date(Date.now() - 3 * 3600000) },
    { _id: 'n5', message: 'You earned the "Community Star" badge! 🏆', type: 'achievement', link: '/profile', read: true, icon: '🏆', createdAt: new Date(Date.now() - 86400000) },
    { _id: 'n6', message: 'New member Ritu Verma joined your group Tech Sisters', type: 'group', link: '/groups', read: true, icon: '👋', createdAt: new Date(Date.now() - 2 * 86400000) },
    { _id: 'n7', message: 'Your support ticket has been updated by EmpowerHer team', type: 'support', link: '/support', read: true, icon: '💜', createdAt: new Date(Date.now() - 3 * 86400000) },
];

const typeFilters = ['All', 'group', 'event', 'marketplace', 'mentorship', 'achievement', 'support'];
const typeColor = {
    group: 'bg-purple-100 text-purple-700',
    event: 'bg-teal-100 text-teal-700',
    marketplace: 'bg-orange-100 text-orange-700',
    mentorship: 'bg-blue-100 text-blue-700',
    achievement: 'bg-amber-100 text-amber-700',
    support: 'bg-pink-100 text-pink-700',
    system: 'bg-slate-100 text-slate-600',
};

function timeAgo(date) {
    const secs = Math.floor((new Date() - new Date(date)) / 1000);
    if (secs < 60) return 'just now';
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationsPage() {
    const { dark } = useTheme();
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        axios.get('/api/notifications').then(r => setNotifications(r.data.notifications || MOCK_NOTIFICATIONS)).catch(() => setNotifications(MOCK_NOTIFICATIONS));
    }, []);

    const markRead = async (id) => {
        try { await axios.put(`/api/notifications/${id}/read`); } catch { }
        setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    };

    const markAllRead = async () => {
        try { await axios.put('/api/notifications/read-all'); } catch { }
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const filtered = notifications.filter(n => filter === 'All' || n.type === filter);
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className={`min-h-screen py-8 px-4 ${dark ? 'bg-slate-950' : 'bg-gradient-to-br from-purple-50/30 to-teal-50/30'}`}>
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className={`text-3xl font-extrabold mb-1 flex items-center gap-2 ${dark ? 'text-white' : 'text-slate-800'}`}>
                            <Bell className="text-purple-500" />Notifications
                            {unreadCount > 0 && <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>}
                        </h1>
                    </div>
                    {unreadCount > 0 && (
                        <button onClick={markAllRead} className="flex items-center gap-1.5 text-purple-600 text-sm font-semibold hover:underline">
                            <CheckCheck size={16} />Mark all read
                        </button>
                    )}
                </motion.div>

                {/* Type filters */}
                <div className="flex gap-2 flex-wrap mb-6">
                    {typeFilters.map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${filter === f ? 'gradient-primary text-white shadow-md' : dark ? 'bg-slate-900 text-slate-300 border border-slate-700' : 'bg-white text-slate-600 border border-purple-100 hover:border-purple-300'}`}>
                            {f}
                        </button>
                    ))}
                </div>

                {/* Notifications list */}
                <div className={`rounded-2xl border overflow-hidden ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                    {filtered.length === 0 ? (
                        <div className={`text-center py-16 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                            <Bell size={40} className="mx-auto mb-3 opacity-40" />
                            <p className="font-semibold">No notifications here</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filtered.map((n, i) => (
                                <motion.div key={n._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                                    className={`flex items-start gap-4 p-4 cursor-pointer transition-colors border-b last:border-b-0 ${!n.read ? dark ? 'bg-purple-950/30' : 'bg-purple-50' : ''} ${dark ? 'border-slate-800 hover:bg-slate-800' : 'border-purple-50 hover:bg-slate-50'}`}
                                    onClick={() => !n.read && markRead(n._id)}>
                                    <div className="text-2xl mt-0.5 shrink-0">{n.icon}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm leading-snug ${dark ? 'text-slate-200' : 'text-slate-700'} ${!n.read ? 'font-semibold' : ''}`}>{n.message}</p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${typeColor[n.type] || 'bg-slate-100 text-slate-500'}`}>{n.type}</span>
                                            <span className={`text-xs ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{timeAgo(n.createdAt)}</span>
                                        </div>
                                    </div>
                                    <div className="shrink-0">
                                        {!n.read ? (
                                            <div className="w-2.5 h-2.5 bg-purple-600 rounded-full mt-1" />
                                        ) : (
                                            <Check size={14} className={dark ? 'text-slate-600' : 'text-slate-300'} />
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
}
