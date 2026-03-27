import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Users, Calendar, ShoppingBag, MessageSquare, TrendingUp, Shield, CheckCircle, X, MoreVertical, Trash2 } from 'lucide-react';

const MOCK_STATS = { totalMembers: 1284, activeEvents: 12, openTickets: 8, marketplaceItems: 347, newMembersThisMonth: 124, groupsCount: 28, mentorCount: 14 };

const MOCK_USERS = [
    { _id: 'demo1', name: 'Member Demo', email: 'member@demo.com', role: 'member', location: 'Mumbai', createdAt: new Date(), isVerified: true },
    { _id: 'demo2', name: 'Admin User', email: 'admin@demo.com', role: 'admin', location: 'Delhi', createdAt: new Date(), isVerified: true },
    { _id: 'demo3', name: 'Sarah Ahmed', email: 'mentor@demo.com', role: 'mentor', location: 'Bangalore', createdAt: new Date(), isVerified: true },
    { _id: 'u4', name: 'Priya Sharma', email: 'priya@example.com', role: 'member', location: 'Jaipur', createdAt: new Date(Date.now() - 86400000), isVerified: true },
    { _id: 'u5', name: 'Aisha Khan', email: 'aisha@example.com', role: 'member', location: 'Kerala', createdAt: new Date(Date.now() - 2 * 86400000), isVerified: false },
];

const MOCK_TICKETS = [
    { _id: 't1', subject: 'Cannot upload product images', user: { name: 'Priya Sharma', email: 'priya@example.com' }, category: 'Technical', priority: 'medium', status: 'in-progress', createdAt: new Date(Date.now() - 2 * 3600000) },
    { _id: 't2', subject: 'Facing harassment in a group', user: { name: 'Aisha Khan', email: 'aisha@example.com' }, category: 'Abuse', priority: 'urgent', status: 'open', createdAt: new Date(Date.now() - 86400000) },
];

const roleColor = { member: 'bg-purple-100 text-purple-700', mentor: 'bg-teal-100 text-teal-700', admin: 'bg-red-100 text-red-700' };
const priorityColor = { low: 'text-slate-500', medium: 'text-blue-600', high: 'text-orange-600', urgent: 'text-red-600 font-bold' };

function StatCard({ icon: Icon, label, value, color, dark }) {
    return (
        <div className={`p-5 rounded-2xl border ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                <Icon size={20} className="text-white" />
            </div>
            <div className={`text-3xl font-black mb-1 ${dark ? 'text-white' : 'text-slate-800'}`}>{typeof value === 'number' ? value.toLocaleString() : value}</div>
            <div className={`text-xs font-medium ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</div>
        </div>
    );
}

export default function AdminPanel() {
    const { dark } = useTheme();
    const [tab, setTab] = useState('overview');
    const [stats, setStats] = useState(MOCK_STATS);
    const [users, setUsers] = useState(MOCK_USERS);
    const [tickets, setTickets] = useState(MOCK_TICKETS);

    useEffect(() => {
        axios.get('/api/admin/stats').then(r => setStats(r.data.stats || MOCK_STATS)).catch(() => setStats(MOCK_STATS));
        axios.get('/api/admin/users').then(r => setUsers(r.data.users || MOCK_USERS)).catch(() => setUsers(MOCK_USERS));
        axios.get('/api/admin/tickets').then(r => setTickets(r.data.tickets || MOCK_TICKETS)).catch(() => setTickets(MOCK_TICKETS));
    }, []);

    const updateRole = async (userId, newRole) => {
        try { await axios.put(`/api/admin/users/${userId}`, { role: newRole }); } catch { }
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
        toast.success('Role updated');
    };

    const deleteUser = async (userId) => {
        if (!confirm('Remove this user?')) return;
        try { await axios.delete(`/api/admin/users/${userId}`); } catch { }
        setUsers(prev => prev.filter(u => u._id !== userId));
        toast.success('User removed');
    };

    const tabs = [
        { id: 'overview', label: '📊 Overview' },
        { id: 'users', label: '👥 Users' },
        { id: 'tickets', label: '🎫 Tickets' },
    ];

    return (
        <div className={`min-h-screen py-8 px-4 ${dark ? 'bg-slate-950' : 'bg-gradient-to-br from-red-50/20 to-purple-50/30'}`}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                            <Shield size={20} className="text-white" />
                        </div>
                        <h1 className={`text-3xl font-extrabold ${dark ? 'text-white' : 'text-slate-800'}`}>Admin Panel</h1>
                    </div>
                    <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Manage users, monitor platform health, and handle support tickets.</p>
                </motion.div>

                {/* Tabs */}
                <div className={`flex rounded-2xl p-1 mb-6 w-fit border ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                    {tabs.map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)}
                            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${tab === t.id ? 'gradient-primary text-white shadow-md' : dark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Overview */}
                {tab === 'overview' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard icon={Users} label="Total Members" value={stats.totalMembers} color="from-purple-500 to-violet-600" dark={dark} />
                            <StatCard icon={Calendar} label="Active Events" value={stats.activeEvents} color="from-teal-500 to-cyan-600" dark={dark} />
                            <StatCard icon={MessageSquare} label="Open Tickets" value={stats.openTickets} color="from-red-400 to-rose-600" dark={dark} />
                            <StatCard icon={ShoppingBag} label="Marketplace Items" value={stats.marketplaceItems} color="from-orange-400 to-pink-500" dark={dark} />
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            <StatCard icon={TrendingUp} label="New This Month" value={stats.newMembersThisMonth} color="from-green-400 to-emerald-600" dark={dark} />
                            <StatCard icon={Users} label="Groups" value={stats.groupsCount} color="from-blue-400 to-indigo-600" dark={dark} />
                            <StatCard icon={CheckCircle} label="Mentors" value={stats.mentorCount} color="from-amber-400 to-orange-500" dark={dark} />
                        </div>
                        {/* Activity log */}
                        <div className={`rounded-2xl border p-5 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                            <h3 className={`font-bold mb-4 ${dark ? 'text-white' : 'text-slate-800'}`}>Recent Platform Activity</h3>
                            <div className="space-y-3">
                                {[
                                    { icon: '👤', text: 'Aisha Khan registered and verified her email', time: '5m ago' },
                                    { icon: '🎫', text: 'New urgent ticket: "Facing harassment in a group"', time: '1h ago' },
                                    { icon: '📅', text: '"Women Leadership Summit 2026" has 150+ RSVPs', time: '2h ago' },
                                    { icon: '🛍️', text: 'New listing: "Handloom Saree" posted by Lakshmi Iyer', time: '3h ago' },
                                ].map((a, i) => (
                                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${dark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                                        <span className="text-xl">{a.icon}</span>
                                        <p className={`flex-1 text-sm ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{a.text}</p>
                                        <span className={`text-xs ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{a.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Users */}
                {tab === 'users' && (
                    <div className={`rounded-2xl border overflow-hidden ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                        <div className={`p-4 border-b ${dark ? 'border-slate-800' : 'border-purple-50'} flex items-center justify-between`}>
                            <h2 className={`font-bold ${dark ? 'text-white' : 'text-slate-800'}`}>All Users ({users.length})</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className={`text-xs uppercase tracking-wider ${dark ? 'bg-slate-800 text-slate-400' : 'bg-purple-50 text-slate-500'}`}>
                                    <tr>
                                        {['User', 'Role', 'Location', 'Joined', 'Actions'].map(h => (
                                            <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${dark ? 'divide-slate-800' : 'divide-purple-50'}`}>
                                    {users.map(u => (
                                        <tr key={u._id} className={`transition-colors ${dark ? 'hover:bg-slate-800' : 'hover:bg-purple-50/30'}`}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white text-xs font-bold">{u.name[0]}</div>
                                                    <div>
                                                        <p className={`font-semibold text-sm ${dark ? 'text-white' : 'text-slate-800'}`}>{u.name}</p>
                                                        <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{u.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <select value={u.role} onChange={e => updateRole(u._id, e.target.value)}
                                                    className={`text-xs font-semibold px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${roleColor[u.role]}`}>
                                                    {['member', 'mentor', 'admin'].map(r => <option key={r} value={r}>{r}</option>)}
                                                </select>
                                            </td>
                                            <td className={`px-4 py-3 text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{u.location || '—'}</td>
                                            <td className={`px-4 py-3 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                                            <td className="px-4 py-3">
                                                <button onClick={() => deleteUser(u._id)} className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors">
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Tickets */}
                {tab === 'tickets' && (
                    <div className={`rounded-2xl border overflow-hidden ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                        <div className={`p-4 border-b ${dark ? 'border-slate-800' : 'border-purple-50'}`}>
                            <h2 className={`font-bold ${dark ? 'text-white' : 'text-slate-800'}`}>Support Tickets ({tickets.length})</h2>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {tickets.map(t => (
                                <div key={t._id} className={`p-4 ${dark ? 'hover:bg-slate-800' : 'hover:bg-purple-50/30'} transition-colors`}>
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                                <span className={`text-xs font-bold uppercase ${priorityColor[t.priority]}`}>⚡ {t.priority}</span>
                                                <span className={`text-xs ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{t.category}</span>
                                            </div>
                                            <p className={`font-semibold text-sm ${dark ? 'text-white' : 'text-slate-800'}`}>{t.subject}</p>
                                            <p className={`text-xs mt-0.5 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>From: {t.user?.name} ({t.user?.email}) · {new Date(t.createdAt).toLocaleDateString('en-IN')}</p>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${t.status === 'open' ? 'bg-blue-100 text-blue-700' : t.status === 'in-progress' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                                            {t.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
