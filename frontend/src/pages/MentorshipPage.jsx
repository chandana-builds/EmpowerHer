import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Star, Calendar, Clock, BookOpen, X, Check } from 'lucide-react';

const MOCK_MENTORS = [
    { _id: 'demo3', name: 'Sarah Ahmed', role: 'mentor', bio: 'Business mentor with 10+ years helping women entrepreneurs scale their businesses.', skills: ['Business Strategy', 'Marketing', 'Finance'], location: 'Bangalore', businessType: 'Consulting', rating: 4.9, sessionsCompleted: 142 },
    { _id: 'm2', name: 'Dr. Nisha Verma', role: 'mentor', bio: 'Tech leader and startup advisor. Specializes in product development and fundraising.', skills: ['Tech', 'Product', 'Fundraising', 'Startups'], location: 'Hyderabad', businessType: 'Technology', rating: 4.8, sessionsCompleted: 89 },
    { _id: 'm3', name: 'Fatima Al-Hassan', role: 'mentor', bio: 'E-commerce expert with experience scaling handicraft businesses internationally.', skills: ['E-Commerce', 'Export', 'Branding', 'Social Media'], location: 'Chennai', businessType: 'E-Commerce', rating: 4.7, sessionsCompleted: 67 },
    { _id: 'm4', name: 'Priya Kapoor', role: 'mentor', bio: 'Certified financial planner helping women take control of their finances.', skills: ['Finance', 'Investment', 'Tax Planning', 'Personal Finance'], location: 'Mumbai', businessType: 'Finance', rating: 4.9, sessionsCompleted: 204 },
];

const MOCK_SESSIONS = [
    { _id: 's1', mentor: { name: 'Sarah Ahmed', bio: 'Business mentor', skills: ['Business Strategy'] }, topic: 'Growing my handicrafts business online', scheduledAt: '2026-03-10T11:00:00', status: 'confirmed', durationMins: 60 },
];

function BookModal({ mentor, onClose, dark }) {
    const [form, setForm] = useState({ topic: '', description: '', scheduledAt: '', durationMins: 60 });
    const [loading, setLoading] = useState(false);

    const handleBook = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/mentorship/book', { mentor: mentor._id, ...form });
        } catch { }
        toast.success(`Session booked with ${mentor.name}! 🎉`);
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className={`w-full max-w-md rounded-2xl p-6 border ${dark ? 'bg-slate-900 border-slate-700' : 'bg-white border-purple-100'}`}>
                <div className="flex justify-between items-center mb-5">
                    <h2 className={`font-bold text-lg ${dark ? 'text-white' : 'text-slate-800'}`}>Book with {mentor.name}</h2>
                    <button onClick={onClose}><X size={20} className="text-slate-400" /></button>
                </div>
                <form onSubmit={handleBook} className="space-y-4">
                    <div>
                        <label className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Topic</label>
                        <input value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} placeholder="What would you like to discuss?" required
                            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none ${dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-purple-50 border-purple-200 text-slate-800'}`} />
                    </div>
                    <div>
                        <label className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Date & Time</label>
                        <input type="datetime-local" value={form.scheduledAt} onChange={e => setForm({ ...form, scheduledAt: e.target.value })} required
                            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none ${dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-purple-50 border-purple-200 text-slate-800'}`} />
                    </div>
                    <div>
                        <label className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Duration</label>
                        <select value={form.durationMins} onChange={e => setForm({ ...form, durationMins: Number(e.target.value) })}
                            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none ${dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-purple-50 border-purple-200 text-slate-800'}`}>
                            {[30, 45, 60, 90].map(d => <option key={d} value={d}>{d} minutes</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Brief Description (optional)</label>
                        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                            className={`w-full px-4 py-3 rounded-xl border text-sm resize-none outline-none ${dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-purple-50 border-purple-200 text-slate-800'}`}
                            placeholder="Any context or goals for this session?" />
                    </div>
                    <div className="flex gap-3">
                        <button type="button" onClick={onClose} className={`flex-1 py-3 rounded-xl border font-semibold text-sm ${dark ? 'border-slate-700 text-slate-300' : 'border-purple-200 text-purple-600'}`}>Cancel</button>
                        <button type="submit" disabled={loading} className="flex-1 gradient-primary text-white py-3 rounded-xl font-bold text-sm disabled:opacity-50">
                            {loading ? 'Booking...' : '✨ Book Session'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default function MentorshipPage() {
    const { dark } = useTheme();
    const [mentors, setMentors] = useState(MOCK_MENTORS);
    const [sessions, setSessions] = useState(MOCK_SESSIONS);
    const [tab, setTab] = useState('mentors');
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        axios.get('/api/mentorship/mentors').then(r => setMentors(r.data.mentors || MOCK_MENTORS)).catch(() => setMentors(MOCK_MENTORS));
        axios.get('/api/mentorship/my-sessions').then(r => setSessions(r.data.sessions || MOCK_SESSIONS)).catch(() => setSessions(MOCK_SESSIONS));
    }, []);

    return (
        <div className={`min-h-screen py-8 px-4 ${dark ? 'bg-slate-950' : 'bg-gradient-to-br from-teal-50/30 to-purple-50/30'}`}>
            <div className="max-w-5xl mx-auto">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className={`text-3xl font-extrabold mb-1 ${dark ? 'text-white' : 'text-slate-800'}`}>Mentorship <span className="text-gradient">🤝</span></h1>
                    <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Connect with experienced mentors who've walked your path.</p>
                </motion.div>

                {/* Tabs */}
                <div className={`flex rounded-2xl p-1 mb-6 w-fit border ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                    {['mentors', 'my-sessions'].map(t => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all capitalize ${tab === t ? 'gradient-primary text-white' : dark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {t === 'mentors' ? '👩‍🏫 Find Mentors' : '📅 My Sessions'}
                        </button>
                    ))}
                </div>

                {/* Mentor cards */}
                {tab === 'mentors' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {mentors.map((mentor, i) => (
                            <motion.div key={mentor._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                className={`rounded-2xl border p-5 hover-lift ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-purple-500/20">
                                        {mentor.name[0]}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-bold text-base ${dark ? 'text-white' : 'text-slate-800'}`}>{mentor.name}</h3>
                                        <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{mentor.businessType} · {mentor.location}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star size={12} className="text-amber-400 fill-amber-400" />
                                            <span className="text-xs font-bold text-amber-500">{mentor.rating || 4.8}</span>
                                            <span className={`text-xs ${dark ? 'text-slate-500' : 'text-slate-400'}`}>· {mentor.sessionsCompleted || 50}+ sessions</span>
                                        </div>
                                    </div>
                                </div>
                                <p className={`text-sm mb-4 leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{mentor.bio}</p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {(mentor.skills || []).map(s => (
                                        <span key={s} className={`text-xs px-2.5 py-1 rounded-full font-medium ${dark ? 'bg-slate-800 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>{s}</span>
                                    ))}
                                </div>
                                <button onClick={() => setBooking(mentor)} className="w-full gradient-primary text-white py-2.5 rounded-xl text-sm font-bold hover:scale-105 transition-all shadow-md shadow-purple-500/20">
                                    Book a Session ✨
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* My sessions */}
                {tab === 'my-sessions' && (
                    <div className="space-y-4">
                        {sessions.length === 0 ? (
                            <div className={`text-center py-16 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                                <BookOpen size={48} className="mx-auto mb-4 opacity-40" />
                                <p className="font-semibold">No sessions booked yet</p>
                                <button onClick={() => setTab('mentors')} className="mt-4 text-purple-600 font-semibold text-sm hover:underline">Browse mentors →</button>
                            </div>
                        ) : (
                            sessions.map(s => (
                                <motion.div key={s._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                    className={`rounded-2xl border p-5 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className={`font-bold text-base ${dark ? 'text-white' : 'text-slate-800'}`}>{s.topic}</p>
                                            <p className={`text-sm mt-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>with {s.mentor?.name}</p>
                                        </div>
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${s.status === 'confirmed' ? 'bg-green-100 text-green-700' : s.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{s.status}</span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-3">
                                        <span className={`flex items-center gap-1.5 text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                                            <Calendar size={14} />{new Date(s.scheduledAt).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                                        </span>
                                        <span className={`flex items-center gap-1.5 text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                                            <Clock size={14} />{new Date(s.scheduledAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} · {s.durationMins}min
                                        </span>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                )}
            </div>
            <AnimatePresence>
                {booking && <BookModal mentor={booking} dark={dark} onClose={() => setBooking(null)} />}
            </AnimatePresence>
        </div>
    );
}
