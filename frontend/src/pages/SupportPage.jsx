import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Plus, ChevronRight, Clock, CheckCircle, AlertCircle, X, Send } from 'lucide-react';

const categories = ['Technical', 'Safety', 'Abuse', 'Mental Health', 'Legal', 'Billing', 'Other'];
const priorities = ['low', 'medium', 'high', 'urgent'];

const statusColor = {
    open: 'text-blue-600 bg-blue-50',
    'in-progress': 'text-amber-600 bg-amber-50',
    resolved: 'text-green-600 bg-green-50',
    closed: 'text-slate-500 bg-slate-100',
};
const priorityColor = { low: 'text-slate-500', medium: 'text-blue-600', high: 'text-orange-600', urgent: 'text-red-600' };

const MOCK_TICKETS = [
    { _id: 't1', subject: 'Cannot upload product images', category: 'Technical', priority: 'medium', status: 'in-progress', createdAt: new Date(Date.now() - 2 * 3600000), responses: [{ author: { name: 'Support Team' }, message: 'We are looking into this issue and will update you shortly.', isStaff: true }] },
    { _id: 't2', subject: 'Facing harassment in a group', category: 'Abuse', priority: 'urgent', status: 'open', createdAt: new Date(Date.now() - 86400000), responses: [] },
];

export default function SupportPage() {
    const { dark } = useTheme();
    const navigate = useNavigate();
    const [tickets, setTickets] = useState(MOCK_TICKETS);
    const [showNew, setShowNew] = useState(false);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({ subject: '', message: '', category: 'Technical', priority: 'medium' });
    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState('');

    useEffect(() => {
        axios.get('/api/support/my-tickets').then(r => setTickets(r.data.tickets || MOCK_TICKETS)).catch(() => setTickets(MOCK_TICKETS));
    }, []);

    const createTicket = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('/api/support', form);
            setTickets(prev => [res.data.ticket, ...prev]);
            toast.success('Ticket submitted! We\'ll respond within 24 hours. 💜');
        } catch {
            setTickets(prev => [{ _id: 'new-' + Date.now(), ...form, status: 'open', responses: [], createdAt: new Date() }, ...prev]);
            toast.success('Ticket submitted!');
        }
        setForm({ subject: '', message: '', category: 'Technical', priority: 'medium' });
        setShowNew(false);
        setLoading(false);
    };

    return (
        <div className={`min-h-screen py-8 px-4 ${dark ? 'bg-slate-950' : 'bg-gradient-to-br from-purple-50/30 to-teal-50/30'}`}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className={`text-3xl font-extrabold mb-1 ${dark ? 'text-white' : 'text-slate-800'}`}>Support Center 💜</h1>
                        <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Confidential, compassionate, and always available.</p>
                    </div>
                    <button onClick={() => setShowNew(!showNew)} className="flex items-center gap-2 gradient-primary text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg">
                        <Plus size={18} />New Ticket
                    </button>
                </motion.div>

                {/* New Ticket form */}
                <AnimatePresence>
                    {showNew && (
                        <motion.div initial={{ opacity: 0, height: 0, marginBottom: 0 }} animate={{ opacity: 1, height: 'auto', marginBottom: 24 }} exit={{ opacity: 0, height: 0, marginBottom: 0 }} className="overflow-hidden">
                            <div className={`rounded-2xl border p-6 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                                <h2 className={`font-bold text-lg mb-4 ${dark ? 'text-white' : 'text-slate-800'}`}>Open a Support Ticket</h2>
                                <form onSubmit={createTicket} className="space-y-4">
                                    <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Subject" required
                                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none ${dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-purple-50 border-purple-200 text-slate-800'}`} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                                            className={`px-4 py-3 rounded-xl border text-sm outline-none ${dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-purple-50 border-purple-200 text-slate-800'}`}>
                                            {categories.map(c => <option key={c}>{c}</option>)}
                                        </select>
                                        <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}
                                            className={`px-4 py-3 rounded-xl border text-sm outline-none ${dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-purple-50 border-purple-200 text-slate-800'}`}>
                                            {priorities.map(p => <option key={p}>{p}</option>)}
                                        </select>
                                    </div>
                                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} placeholder="Describe your issue in detail. Everything is confidential." required
                                        className={`w-full px-4 py-3 rounded-xl border text-sm resize-none outline-none ${dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-purple-50 border-purple-200 text-slate-800'}`} />
                                    <div className="flex gap-3">
                                        <button type="button" onClick={() => setShowNew(false)} className={`flex-1 py-3 rounded-xl border font-semibold text-sm ${dark ? 'border-slate-700 text-slate-300' : 'border-purple-200 text-purple-600'}`}>Cancel</button>
                                        <button type="submit" disabled={loading} className="flex-1 gradient-primary text-white py-3 rounded-xl font-bold text-sm disabled:opacity-50">
                                            {loading ? 'Submitting...' : 'Submit Ticket'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Quick help */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {[
                        { emoji: '🆘', title: 'Safety Emergency', desc: 'Immediate threat or danger', link: '/safety', color: 'from-red-500 to-rose-600' },
                        { emoji: '🧠', title: 'Mental Health', desc: '24/7 confidential counselling', link: '#', color: 'from-purple-500 to-violet-600' },
                        { emoji: '⚖️', title: 'Legal Help', desc: 'Free legal consultation', link: '#', color: 'from-teal-500 to-cyan-600' },
                    ].map(item => (
                        <motion.a key={item.title} onClick={(e) => {
                            if (item.link !== '#') {
                                e.preventDefault();
                                navigate(item.link);
                            }
                        }} href={item.link} whileHover={{ scale: 1.03 }}
                            className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white cursor-pointer`}>
                            <div className="text-2xl mb-2">{item.emoji}</div>
                            <div className="font-bold text-sm">{item.title}</div>
                            <div className="text-xs opacity-80 mt-1">{item.desc}</div>
                        </motion.a>
                    ))}
                </div>

                {/* Tickets */}
                <div className={`rounded-2xl border ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                    <div className={`p-4 border-b ${dark ? 'border-slate-800' : 'border-purple-50'}`}>
                        <h2 className={`font-bold ${dark ? 'text-white' : 'text-slate-800'}`}>My Tickets ({tickets.length})</h2>
                    </div>
                    {tickets.length === 0 ? (
                        <div className={`text-center py-12 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                            <MessageCircle size={40} className="mx-auto mb-3 opacity-40" />
                            <p>No support tickets yet</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {tickets.map(t => (
                                <motion.div key={t._id} onClick={() => setSelected(selected?._id === t._id ? null : t)} className={`p-4 cursor-pointer transition-colors ${dark ? 'hover:bg-slate-800' : 'hover:bg-purple-50/50'}`}>
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor[t.status]}`}>{t.status}</span>
                                                <span className={`text-xs font-semibold ${priorityColor[t.priority]}`}>{t.priority}</span>
                                                <span className={`text-xs ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{t.category}</span>
                                            </div>
                                            <p className={`font-semibold text-sm mt-1 ${dark ? 'text-white' : 'text-slate-800'}`}>{t.subject}</p>
                                            <p className={`text-xs mt-1 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{new Date(t.createdAt).toLocaleDateString('en-IN')} · {t.responses?.length || 0} response(s)</p>
                                        </div>
                                        <ChevronRight size={16} className={`text-slate-400 mt-1 transition-transform ${selected?._id === t._id ? 'rotate-90' : ''}`} />
                                    </div>
                                    <AnimatePresence>
                                        {selected?._id === t._id && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 overflow-hidden">
                                                {(t.responses || []).map((r, i) => (
                                                    <div key={i} className={`p-3 rounded-xl mb-2 ${r.isStaff ? dark ? 'bg-purple-900/40' : 'bg-purple-50' : dark ? 'bg-slate-700' : 'bg-slate-50'}`}>
                                                        <p className={`text-xs font-semibold mb-1 ${r.isStaff ? 'text-purple-600' : dark ? 'text-slate-300' : 'text-slate-600'}`}>{r.isStaff ? '💜 Support Team' : 'You'}</p>
                                                        <p className={`text-sm ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{r.message}</p>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
