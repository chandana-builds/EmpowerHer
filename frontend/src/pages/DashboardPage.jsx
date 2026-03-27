import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
    Users, Calendar, ShoppingBag, Shield, MessageCircle, Bot,
    Star, TrendingUp, Bell, ArrowRight, Award, Zap, Heart
} from 'lucide-react';

const memberCards = [
    { icon: Users, label: 'Groups Joined', value: '5', color: 'from-purple-500 to-violet-600', link: '/groups' },
    { icon: Calendar, label: 'Upcoming Events', value: '3', color: 'from-teal-500 to-cyan-600', link: '/events' },
    { icon: ShoppingBag, label: 'My Listings', value: '8', color: 'from-orange-400 to-pink-500', link: '/marketplace' },
    { icon: Star, label: 'Mentor Sessions', value: '2', color: 'from-amber-400 to-yellow-500', link: '/mentorship' },
];

const quickActions = [
    { icon: Shield, label: 'SOS Emergency', link: '/safety', color: 'bg-red-500', urgent: true },
    { icon: Bot, label: 'AI Assistant', link: '/ai-assistant', color: 'bg-purple-600' },
    { icon: MessageCircle, label: 'Get Support', link: '/support', color: 'bg-teal-600' },
    { icon: TrendingUp, label: 'Business Growth', link: '/business', color: 'bg-indigo-600' },
];

const recentActivity = [
    { icon: '💬', text: 'Priya commented on your post in Startups & Entrepreneurs', time: '5m ago' },
    { icon: '📅', text: 'Reminder: Women Leadership Summit tomorrow at 10:00 AM', time: '1h ago' },
    { icon: '🛍️', text: 'Your product "Handmade Earrings" got 3 new inquiries', time: '2h ago' },
    { icon: '🤝', text: 'Mentor Sarah Ahmed accepted your session request', time: '3h ago' },
    { icon: '🏆', text: 'You earned the "Community Star" badge!', time: '1d ago' },
];

const adminCards = [
    { icon: Users, label: 'Total Members', value: '1,284', color: 'from-purple-500 to-violet-600' },
    { icon: Calendar, label: 'Active Events', value: '12', color: 'from-teal-500 to-cyan-600' },
    { icon: MessageCircle, label: 'Open Tickets', value: '8', color: 'from-red-400 to-rose-600' },
    { icon: ShoppingBag, label: 'Marketplace Items', value: '347', color: 'from-orange-400 to-pink-500' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function DashboardPage() {
    const { user } = useAuth();
    const { dark } = useTheme();
    const isAdmin = user?.role === 'admin';
    const isMentor = user?.role === 'mentor';
    const cards = isAdmin ? adminCards : memberCards;

    return (
        <div className={`min-h-screen py-8 px-4 ${dark ? 'bg-slate-950' : 'bg-gradient-to-br from-purple-50/50 to-teal-50/50'}`}>
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">👋</span>
                            <h1 className={`text-2xl lg:text-3xl font-extrabold ${dark ? 'text-white' : 'text-slate-800'}`}>
                                Welcome back, <span className="text-gradient">{user?.name?.split(' ')[0] || 'Friend'}!</span>
                            </h1>
                        </div>
                        <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            {' · '}
                            <span className={`capitalize font-medium ${isAdmin ? 'text-red-500' : isMentor ? 'text-teal-600' : 'text-purple-600'}`}>
                                {user?.role || 'Member'}
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {isAdmin && (
                            <Link to="/admin"
                                className="flex items-center gap-2 gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-purple-500/30 hover:scale-105 transition-all">
                                <Award size={16} />Admin Panel
                            </Link>
                        )}
                        <Link to="/profile"
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:scale-105
                ${dark ? 'border-purple-700 text-purple-300 hover:bg-purple-900/30' : 'border-purple-200 text-purple-600 hover:bg-purple-50'}`}>
                            Edit Profile
                        </Link>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div variants={containerVariants} initial="hidden" animate="visible"
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {cards.map(({ icon: Icon, label, value, color, link }) => (
                        <motion.div key={label} variants={itemVariants}>
                            <Link to={link || '#'}
                                className={`block p-5 rounded-2xl border hover-lift group transition-all
                  ${dark ? 'bg-slate-900 border-slate-800 hover:border-purple-700' : 'bg-white border-purple-100 hover:border-purple-300'}`}>
                                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={20} className="text-white" />
                                </div>
                                <div className={`text-3xl font-black mb-1 ${dark ? 'text-white' : 'text-slate-800'}`}>{value}</div>
                                <div className={`text-xs font-medium ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Quick Actions */}
                    <motion.div variants={containerVariants} initial="hidden" animate="visible"
                        className={`p-6 rounded-2xl border ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                        <h2 className={`font-bold text-lg mb-4 flex items-center gap-2 ${dark ? 'text-white' : 'text-slate-800'}`}>
                            <Zap size={20} className="text-yellow-500" />Quick Actions
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {quickActions.map(({ icon: Icon, label, link, color, urgent }) => (
                                <motion.div key={label} variants={itemVariants}>
                                    <Link to={link}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl ${color} text-white transition-all hover:scale-105 hover:shadow-lg ${urgent ? 'col-span-2 flex-row justify-center ring-2 ring-red-300 ring-offset-2' : ''}`}>
                                        <Icon size={urgent ? 22 : 20} />
                                        <span className="text-xs font-semibold text-center">{label}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className={`lg:col-span-2 p-6 rounded-2xl border ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                        <h2 className={`font-bold text-lg mb-4 flex items-center gap-2 ${dark ? 'text-white' : 'text-slate-800'}`}>
                            <Bell size={20} className="text-purple-500" />Recent Activity
                        </h2>
                        <div className="space-y-3">
                            {recentActivity.map(({ icon, text, time }, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
                                    className={`flex items-start gap-3 p-3 rounded-xl transition-colors cursor-pointer
                    ${dark ? 'hover:bg-slate-800' : 'hover:bg-purple-50'}`}>
                                    <span className="text-xl flex-shrink-0">{icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm leading-snug ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{text}</p>
                                        <p className={`text-xs mt-1 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{time}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <Link to="/notifications"
                            className="flex items-center gap-2 text-purple-600 text-sm font-semibold mt-4 hover:underline">
                            View all notifications <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                </div>

                {/* Motivation Banner */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="mt-6 rounded-2xl gradient-hero p-6 flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMDgiLz48L3N2Zz4=')] opacity-40" />
                    <Heart size={36} className="text-white/80 animate-pulse flex-shrink-0 relative" />
                    <div className="relative text-center sm:text-left">
                        <p className="text-white font-bold text-lg">"She believed she could, so she did."</p>
                        <p className="text-purple-200 text-sm">Keep pushing, {user?.name?.split(' ')[0] || 'Champion'}. Your community believes in you!</p>
                    </div>
                    <Link to="/ai-assistant"
                        className="relative ml-auto flex-shrink-0 bg-white text-purple-700 font-bold px-6 py-3 rounded-xl text-sm hover:scale-105 transition-all shadow-lg">
                        Chat with AI ✨
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
