import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Eye, MessageCircle, ShoppingBag, Zap, Star } from 'lucide-react';

const MOCK_STATS = {
    revenue: [
        { month: 'Oct', revenue: 12400 }, { month: 'Nov', revenue: 18900 }, { month: 'Dec', revenue: 22100 },
        { month: 'Jan', revenue: 19800 }, { month: 'Feb', revenue: 27500 }, { month: 'Mar', revenue: 31200 },
    ],
    inquiries: 24, views: 1284, sales: 18, networkingScore: 78, growth: '+23%', topCategory: 'Handicrafts',
};

const MOCK_TIPS = [
    { id: 1, category: 'Marketing', tip: 'Use Instagram Reels to showcase your products — short videos get 3x more reach than photos.', icon: '📱' },
    { id: 2, category: 'Finance', tip: 'Keep personal and business finances separate. Open a dedicated business account today.', icon: '💰' },
    { id: 3, category: 'Networking', tip: 'Attend at least 2 networking events per month. 80% of opportunities come through connections.', icon: '🤝' },
    { id: 4, category: 'E-Commerce', tip: 'High-quality photos increase sales by 40%. Use natural light and clean backgrounds.', icon: '📸' },
    { id: 5, category: 'Productivity', tip: 'Batch similar tasks together to avoid context switching and improve efficiency.', icon: '⚡' },
    { id: 6, category: 'Legal', tip: 'Register your business to access government schemes for women entrepreneurs (Mudra Loan, PMEGP).', icon: '📋' },
];

const CustomTooltip = ({ active, payload, label, dark }) => {
    if (active && payload?.length) {
        return (
            <div className={`px-3 py-2 rounded-xl shadow-xl border ${dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-purple-100 text-slate-800'}`}>
                <p className="text-xs font-semibold">{label}</p>
                <p className="text-sm font-black text-purple-600">₹{payload[0].value.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

export default function BusinessDashboard() {
    const { dark } = useTheme();
    const { user } = useAuth();
    const [stats, setStats] = useState(MOCK_STATS);
    const [tips, setTips] = useState(MOCK_TIPS);

    useEffect(() => {
        axios.get('/api/business/stats').then(r => setStats(r.data.stats || MOCK_STATS)).catch(() => setStats(MOCK_STATS));
        axios.get('/api/business/tips').then(r => setTips(r.data.tips || MOCK_TIPS)).catch(() => setTips(MOCK_TIPS));
    }, []);

    const metricCards = [
        { icon: Eye, label: 'Profile Views', value: stats.views?.toLocaleString() || '1,284', color: 'from-blue-500 to-indigo-600', trend: '+12%' },
        { icon: MessageCircle, label: 'Inquiries', value: stats.inquiries || 24, color: 'from-teal-500 to-cyan-600', trend: '+8%' },
        { icon: ShoppingBag, label: 'Sales', value: stats.sales || 18, color: 'from-orange-400 to-pink-500', trend: '+23%' },
        { icon: Star, label: 'Network Score', value: `${stats.networkingScore || 78}/100`, color: 'from-amber-400 to-yellow-500', trend: '+5pts' },
    ];

    return (
        <div className={`min-h-screen py-8 px-4 ${dark ? 'bg-slate-950' : 'bg-gradient-to-br from-indigo-50/30 to-purple-50/40'}`}>
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className={`text-3xl font-extrabold mb-1 ${dark ? 'text-white' : 'text-slate-800'}`}>
                        Business Dashboard <span>📈</span>
                    </h1>
                    <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Track your growth and discover opportunities. <span className="text-green-600 font-bold">{stats.growth || '+23%'}</span> growth this month!
                    </p>
                </motion.div>

                {/* Metric cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {metricCards.map(({ icon: Icon, label, value, color, trend }, i) => (
                        <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                            className={`p-5 rounded-2xl border ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>
                                <Icon size={20} className="text-white" />
                            </div>
                            <div className={`text-2xl font-black mb-0.5 ${dark ? 'text-white' : 'text-slate-800'}`}>{value}</div>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</span>
                                <span className="text-xs text-green-500 font-semibold">{trend}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Revenue chart */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className={`rounded-2xl border p-5 mb-8 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className={`font-bold text-lg flex items-center gap-2 ${dark ? 'text-white' : 'text-slate-800'}`}>
                            <TrendingUp size={20} className="text-purple-500" />Revenue Trend (₹)
                        </h2>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">↑ {stats.growth || '+23%'} vs last month</span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={stats.revenue || MOCK_STATS.revenue}>
                            <defs>
                                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.02} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#334155' : '#f1f5f9'} />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: dark ? '#94a3b8' : '#64748b' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: dark ? '#94a3b8' : '#64748b' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                            <Tooltip content={<CustomTooltip dark={dark} />} />
                            <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={3} fill="url(#revenueGradient)" dot={{ fill: '#7c3aed', strokeWidth: 2, r: 5 }} activeDot={{ r: 7 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Growth tips */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className={`rounded-2xl border p-5 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                    <h2 className={`font-bold text-lg mb-4 flex items-center gap-2 ${dark ? 'text-white' : 'text-slate-800'}`}>
                        <Zap size={20} className="text-amber-500" />Growth Tips for You
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tips.map((tip, i) => (
                            <motion.div key={tip.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }} whileHover={{ x: 4 }}
                                className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer ${dark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gradient-to-r from-purple-50 to-teal-50 hover:from-purple-100 hover:to-teal-100'}`}>
                                <span className="text-2xl">{tip.icon}</span>
                                <div>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full mb-1 inline-block ${dark ? 'bg-slate-700 text-purple-400' : 'bg-white text-purple-600'}`}>{tip.category}</span>
                                    <p className={`text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{tip.tip}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
