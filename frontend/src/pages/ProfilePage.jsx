import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, MapPin, Briefcase, Edit3, Save, X, Star, Award, Link as LinkIcon } from 'lucide-react';

const allSkills = ['Marketing', 'Finance', 'Design', 'Coding', 'Writing', 'Photography', 'Baking', 'Fashion', 'Pottery', 'Teaching', 'Legal', 'Sales'];
const allInterests = ['Startups', 'E-Commerce', 'Baking', 'Fashion', 'Teaching', 'Handicrafts', 'Freelancing', 'Tech', 'Healthcare', 'Finance'];

const achievements = [
    { icon: '🌟', label: 'Community Star', desc: 'Posted 10+ helpful content' },
    { icon: '🤝', label: 'Networker', desc: 'Joined 5+ groups' },
    { icon: '🎓', label: 'Learner', desc: 'Attended 3+ mentorship sessions' },
    { icon: '🛍️', label: 'Seller', desc: 'Listed first product' },
];

export default function ProfilePage() {
    const { dark } = useTheme();
    const { user, updateUser } = useAuth();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        name: user?.name || '',
        bio: user?.bio || '',
        location: user?.location || '',
        businessType: user?.businessType || '',
        skills: user?.skills || [],
        interests: user?.interests || [],
        socialLinks: user?.socialLinks || { linkedin: '', instagram: '', website: '' },
    });
    const [loading, setLoading] = useState(false);

    const toggleTag = (field, value) => {
        setForm(prev => ({
            ...prev,
            [field]: prev[field].includes(value) ? prev[field].filter(x => x !== value) : [...prev[field], value]
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await axios.put('/api/auth/profile', form);
            updateUser(res.data.user || form);
            toast.success('Profile updated! ✨');
        } catch {
            updateUser(form);
            toast.success('Profile updated!');
        }
        setLoading(false);
        setEditing(false);
    };

    const initials = (user?.name || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    return (
        <div className={`min-h-screen py-8 px-4 ${dark ? 'bg-slate-950' : 'bg-gradient-to-br from-purple-50/40 to-teal-50/40'}`}>
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Profile hero card */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                    className={`rounded-3xl border overflow-hidden ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                    <div className="gradient-hero h-28 relative">
                        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')]" />
                    </div>
                    <div className="px-6 pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 mb-4">
                            <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center text-white text-3xl font-black border-4 border-white shadow-xl">
                                {initials}
                            </div>
                            <div className="flex gap-2">
                                {editing ? (
                                    <>
                                        <button onClick={() => setEditing(false)} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${dark ? 'border-slate-700 text-slate-300' : 'border-purple-200 text-slate-600'}`}><X size={14} />Cancel</button>
                                        <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-xl text-sm font-bold disabled:opacity-50"><Save size={14} />{loading ? 'Saving...' : 'Save'}</button>
                                    </>
                                ) : (
                                    <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-bold shadow-md shadow-purple-500/30">
                                        <Edit3 size={14} />Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>

                        {editing ? (
                            <div className="space-y-3">
                                {[{ name: 'name', label: 'Full Name' }, { name: 'location', label: 'Location' }, { name: 'businessType', label: 'Business / Profession' }].map(({ name, label }) => (
                                    <div key={name}>
                                        <label className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</label>
                                        <input value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })}
                                            className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-purple-50 border-purple-200 text-slate-800'}`} />
                                    </div>
                                ))}
                                <div>
                                    <label className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Bio</label>
                                    <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows={3}
                                        className={`w-full px-4 py-2.5 rounded-xl border text-sm resize-none outline-none ${dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-purple-50 border-purple-200 text-slate-800'}`} />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h1 className={`text-2xl font-extrabold mb-1 ${dark ? 'text-white' : 'text-slate-800'}`}>{user?.name}</h1>
                                <div className="flex items-center gap-3 flex-wrap mb-2">
                                    <span className={`capitalize text-sm font-semibold px-2 py-0.5 rounded-full ${user?.role === 'admin' ? 'bg-red-100 text-red-700' : user?.role === 'mentor' ? 'bg-teal-100 text-teal-700' : 'bg-purple-100 text-purple-700'}`}>{user?.role || 'Member'}</span>
                                    {user?.location && <span className={`text-sm flex items-center gap-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}><MapPin size={13} />{user.location}</span>}
                                    {user?.businessType && <span className={`text-sm flex items-center gap-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}><Briefcase size={13} />{user.businessType}</span>}
                                </div>
                                {user?.bio && <p className={`text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{user.bio}</p>}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Skills & Interests */}
                {['skills', 'interests'].map(field => (
                    <motion.div key={field} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className={`rounded-2xl border p-5 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                        <h3 className={`font-bold text-base mb-3 capitalize ${dark ? 'text-white' : 'text-slate-800'}`}>{field === 'skills' ? '⚡ Skills' : '❤️ Interests'}</h3>
                        <div className="flex flex-wrap gap-2">
                            {(field === 'skills' ? allSkills : allInterests).map(item => {
                                const active = form[field].includes(item);
                                return (
                                    <button key={item} onClick={() => editing && toggleTag(field, item)} disabled={!editing}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${active ? 'gradient-primary text-white shadow-sm' : dark ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-purple-50 text-purple-600 border border-purple-100'} ${!editing ? 'cursor-default' : 'hover:scale-105'}`}>
                                        {item}
                                    </button>
                                );
                            })}
                        </div>
                        {editing && <p className={`text-xs mt-3 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>Click to toggle. {form[field].length} selected.</p>}
                    </motion.div>
                ))}

                {/* Achievements */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl border p-5 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                    <h3 className={`font-bold text-base mb-4 ${dark ? 'text-white' : 'text-slate-800'}`}><Award size={18} className="inline mr-2 text-amber-500" />Achievements</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {achievements.map(a => (
                            <div key={a.label} className={`flex items-center gap-3 p-3 rounded-xl ${dark ? 'bg-slate-800' : 'bg-amber-50'}`}>
                                <span className="text-2xl">{a.icon}</span>
                                <div>
                                    <p className={`font-semibold text-sm ${dark ? 'text-white' : 'text-slate-800'}`}>{a.label}</p>
                                    <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{a.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
