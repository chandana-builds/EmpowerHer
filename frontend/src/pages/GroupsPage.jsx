import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Users, Search, Plus, TrendingUp, Lock, Globe } from 'lucide-react';

const categories = [
    { id: 1, name: 'Startups & Entrepreneurs', icon: '🚀', members: 1240, posts: 430, color: 'from-purple-500 to-violet-600', desc: 'Connect with fellow founders, share insights and scale together.' },
    { id: 2, name: 'Small & Medium Businesses', icon: '🏪', members: 980, posts: 310, color: 'from-teal-500 to-cyan-600', desc: 'Tips, resources and networking for growing SMB owners.' },
    { id: 3, name: 'Home Bakery & Cooking', icon: '🍰', members: 762, posts: 520, color: 'from-orange-400 to-pink-500', desc: 'Share recipes, market your baked goods, and grow your food business.' },
    { id: 4, name: 'Tailoring & Fashion', icon: '👗', members: 654, posts: 280, color: 'from-rose-400 to-pink-600', desc: 'Fashion designers, tailors and stylists collaborate here.' },
    { id: 5, name: 'Teaching & Tutoring', icon: '📚', members: 890, posts: 390, color: 'from-blue-500 to-indigo-600', desc: 'Educators sharing curriculum, platforms and teaching strategies.' },
    { id: 6, name: 'Handicrafts & Art', icon: '🎨', members: 543, posts: 476, color: 'from-amber-400 to-orange-500', desc: 'Artisans, painters and crafters showcasing their masterpieces.' },
    { id: 7, name: 'Freelancers & Digital Creators', icon: '💻', members: 1102, posts: 612, color: 'from-emerald-500 to-green-600', desc: 'Writers, designers, developers and content creators unite.' },
];

export default function GroupsPage() {
    const { dark } = useTheme();
    const [search, setSearch] = useState('');
    const [joined, setJoined] = useState([1, 3]);

    const filtered = categories.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className={`min-h-screen py-8 px-4 ${dark ? 'bg-slate-950' : 'bg-gradient-to-br from-purple-50/50 to-teal-50/50'}`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className={`text-3xl font-extrabold mb-2 ${dark ? 'text-white' : 'text-slate-800'}`}>
                        Interest <span className="text-gradient">Groups</span>
                    </h1>
                    <p className={`${dark ? 'text-slate-400' : 'text-slate-500'}`}>Find your tribe, share your story, grow together.</p>
                </motion.div>

                {/* Search */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                    className="flex gap-3 mb-8">
                    <div className={`flex-1 relative rounded-2xl border overflow-hidden ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
                        <input value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search groups..."
                            className={`w-full pl-10 pr-4 py-3.5 text-sm outline-none bg-transparent ${dark ? 'text-white placeholder-slate-500' : 'text-slate-700 placeholder-slate-400'}`} />
                    </div>
                </motion.div>

                {/* Groups Grid */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((g, i) => (
                        <motion.div key={g.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                            className={`rounded-2xl border overflow-hidden hover-lift group ${dark ? 'bg-slate-900 border-slate-800 hover:border-purple-700' : 'bg-white border-purple-100 hover:border-purple-300'}`}>
                            {/* Card Header */}
                            <div className={`bg-gradient-to-br ${g.color} p-5 relative`}>
                                <span className="text-5xl filter drop-shadow-lg">{g.icon}</span>
                                <div className="absolute top-3 right-3">
                                    <Globe size={16} className="text-white/60" />
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className={`font-bold text-base mb-2 ${dark ? 'text-white' : 'text-slate-800'}`}>{g.name}</h3>
                                <p className={`text-sm leading-relaxed mb-4 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{g.desc}</p>
                                <div className={`flex items-center gap-4 text-xs mb-4 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                                    <span className="flex items-center gap-1"><Users size={13} />{g.members.toLocaleString()} members</span>
                                    <span className="flex items-center gap-1"><TrendingUp size={13} />{g.posts} posts</span>
                                </div>
                                <div className="flex gap-2">
                                    <Link to={`/groups/${g.id}`}
                                        className={`flex-1 text-center py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105
                      ${dark ? 'bg-slate-800 text-purple-300 hover:bg-slate-700' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'}`}>
                                        View Group
                                    </Link>
                                    <button onClick={() => setJoined(prev => prev.includes(g.id) ? prev.filter(x => x !== g.id) : [...prev, g.id])}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105
                      ${joined.includes(g.id) ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'gradient-primary text-white shadow-md shadow-purple-500/30'}`}>
                                        {joined.includes(g.id) ? '✓ Joined' : '+ Join'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
