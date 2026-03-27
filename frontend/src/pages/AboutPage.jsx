import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Heart, Users, Shield, Star, Zap, Globe, Award, TrendingUp } from 'lucide-react';

const stats = [
    { value: '50,000+', label: 'Women Empowered', icon: '👩' },
    { value: '120+', label: 'Cities Covered', icon: '🌍' },
    { value: '2,400+', label: 'Mentorship Sessions', icon: '🤝' },
    { value: '98%', label: 'Success Rate', icon: '⭐' },
];

const values = [
    { icon: Shield, title: 'Safety First', desc: 'Your security is our priority. SOS alerts, emergency contacts, and 24/7 support.', color: 'from-red-400 to-rose-600' },
    { icon: Users, title: 'Community', desc: 'A vibrant network of women supporting women across industries and cities.', color: 'from-purple-500 to-violet-600' },
    { icon: TrendingUp, title: 'Growth', desc: 'Tools, mentorship, and resources to help you scale your business and career.', color: 'from-teal-500 to-cyan-600' },
    { icon: Heart, title: 'Wellbeing', desc: 'Confidential support, mental health resources, and a judgment-free community.', color: 'from-pink-400 to-rose-500' },
    { icon: Zap, title: 'AI-Powered', desc: 'Our AI assistant gives instant answers on business, legal, and personal challenges.', color: 'from-amber-400 to-orange-500' },
    { icon: Globe, title: 'Inclusive', desc: 'Women of all backgrounds, professions, and experience levels are welcome here.', color: 'from-indigo-500 to-blue-600' },
];

const team = [
    { name: 'Priya Menon', role: 'Founder & CEO', emoji: '👩‍💼' },
    { name: 'Aisha Siddiqui', role: 'Head of Community', emoji: '👩‍🤝‍👩' },
    { name: 'Ritu Kapoor', role: 'Chief Safety Officer', emoji: '🛡️' },
    { name: 'Nisha Verma', role: 'Head of Technology', emoji: '💻' },
];

export default function AboutPage() {
    const { dark } = useTheme();

    return (
        <div className={`min-h-screen ${dark ? 'bg-slate-950' : 'bg-white'}`}>
            {/* Hero */}
            <div className="gradient-hero py-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMDgiLz48L3N2Zz4=')] opacity-40" />
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-3xl mx-auto">
                    <div className="text-6xl mb-6">🌸</div>
                    <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">About EmpowerHer</h1>
                    <p className="text-xl text-purple-100 leading-relaxed">We believe every woman deserves the tools, community, and courage to build the life she imagines. EmpowerHer is where that journey begins.</p>
                </motion.div>
            </div>

            {/* Mission */}
            <div className={`py-16 px-6 ${dark ? 'bg-slate-900' : 'bg-purple-50'}`}>
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className={`text-3xl font-extrabold mb-6 ${dark ? 'text-white' : 'text-slate-800'}`}>Our Mission</h2>
                        <p className={`text-lg leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                            EmpowerHer was founded in 2024 by a group of women who experienced firsthand the barriers — funding gaps, safety concerns, lack of networks — that hold women back. We built this platform to tear down those barriers, one feature at a time.
                        </p>
                        <p className={`text-lg leading-relaxed mt-4 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                            From an SOS button to a marketplace, from AI mentorship to a supportive community — every feature exists because a real woman asked for it.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Stats */}
            <div className={`py-16 px-6 ${dark ? 'bg-slate-950' : 'bg-white'}`}>
                <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className={`text-center p-6 rounded-2xl border ${dark ? 'bg-slate-900 border-slate-800' : 'bg-purple-50 border-purple-100'}`}>
                            <div className="text-4xl mb-3">{s.icon}</div>
                            <div className="text-3xl font-black text-gradient mb-1">{s.value}</div>
                            <div className={`text-sm font-medium ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{s.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Values */}
            <div className={`py-16 px-6 ${dark ? 'bg-slate-900' : 'bg-gradient-to-br from-purple-50 to-teal-50'}`}>
                <div className="max-w-5xl mx-auto">
                    <h2 className={`text-3xl font-extrabold text-center mb-12 ${dark ? 'text-white' : 'text-slate-800'}`}>Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((v, i) => (
                            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                className={`p-6 rounded-2xl border ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-purple-100'}`}>
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4 shadow-lg`}>
                                    <v.icon size={22} className="text-white" />
                                </div>
                                <h3 className={`font-bold text-lg mb-2 ${dark ? 'text-white' : 'text-slate-800'}`}>{v.title}</h3>
                                <p className={`text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team */}
            <div className={`py-16 px-6 ${dark ? 'bg-slate-950' : 'bg-white'}`}>
                <div className="max-w-4xl mx-auto">
                    <h2 className={`text-3xl font-extrabold text-center mb-12 ${dark ? 'text-white' : 'text-slate-800'}`}>Meet the Team</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, i) => (
                            <motion.div key={member.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className={`text-center p-6 rounded-2xl border ${dark ? 'bg-slate-900 border-slate-800' : 'bg-purple-50 border-purple-100'}`}>
                                <div className="text-5xl mb-3">{member.emoji}</div>
                                <div className={`font-bold ${dark ? 'text-white' : 'text-slate-800'}`}>{member.name}</div>
                                <div className={`text-xs mt-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{member.role}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="gradient-hero py-16 px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <Award size={48} className="text-yellow-300 mx-auto mb-4" />
                    <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Join the Movement?</h2>
                    <p className="text-purple-200 mb-8 text-lg">50,000+ women already transformed their lives. Your story starts today.</p>
                    <Link to="/auth" className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-all shadow-xl">
                        Join EmpowerHer Free 🌸
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
