import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    Users, Calendar, ShoppingBag, Shield, MessageCircle, Bot,
    Star, TrendingUp, ArrowRight, Sparkles, Globe, Award, Heart
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const features = [
    { icon: Users, title: 'Interest Groups', desc: 'Join communities of entrepreneurs, creators, and professionals', color: 'from-purple-500 to-violet-600', path: '/groups' },
    { icon: Calendar, title: 'Smart Events', desc: 'Discover and register for empowering events on an interactive calendar', color: 'from-teal-500 to-cyan-600', path: '/events' },
    { icon: ShoppingBag, title: 'Women Marketplace', desc: 'Buy, sell, and showcase your products and services', color: 'from-orange-400 to-pink-500', path: '/marketplace' },
    { icon: Shield, title: 'Safety Module', desc: 'One-tap SOS, live location sharing & emergency contacts', color: 'from-red-400 to-rose-600', path: '/safety' },
    { icon: MessageCircle, title: 'Confidential Support', desc: 'Private, encrypted channels to seek admin guidance', color: 'from-blue-500 to-indigo-600', path: '/support' },
    { icon: Bot, title: 'AI Assistant', desc: 'Smart chatbot for business advice, schemes & motivation', color: 'from-emerald-500 to-green-600', path: '/ai-assistant' },
    { icon: Star, title: 'Mentorship', desc: 'Get matched with experienced mentors in your field', color: 'from-amber-400 to-yellow-500', path: '/mentorship' },
    { icon: TrendingUp, title: 'Business Growth', desc: 'Track revenue, set goals and visualize your progress', color: 'from-fuchsia-500 to-purple-600', path: '/business' },
];

const stats = [
    { value: '50K+', label: 'Women Members' },
    { value: '1,200+', label: 'Mentors Available' },
    { value: '800+', label: 'Events Hosted' },
    { value: '95%', label: 'Success Rate' },
];

const testimonials = [
    { name: 'Priya Sharma', role: 'Startup Founder', text: 'EmpowerHer transformed my business journey. The mentorship program is incredible!', avatar: 'P', bg: 'from-purple-500 to-violet-500' },
    { name: 'Aisha Khan', role: 'Fashion Designer', text: 'I found my first 100 customers through the marketplace. This platform is a game changer!', avatar: 'A', bg: 'from-teal-500 to-cyan-500' },
    { name: 'Meena Patel', role: 'Educator', text: 'The support system helped me through a difficult time. I feel so safe and heard.', avatar: 'M', bg: 'from-orange-400 to-pink-500' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function HomePage() {
    const { dark } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={dark ? 'bg-slate-950' : 'bg-white'}>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 gradient-hero opacity-95" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-30" />

                {/* Floating Orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-400/10 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white text-sm mb-6">
                            <Sparkles size={14} className="text-yellow-300" />
                            The #1 Platform for Women Empowerment
                        </motion.div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                            Rise. Connect.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-peach">Empower.</span>
                        </h1>
                        <p className="text-purple-100 text-xl leading-relaxed mb-8">
                            Your all-in-one platform to build your network, grow your business, stay safe, and thrive — powered by AI and community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/auth"
                                className="group inline-flex items-center justify-center gap-2 bg-white text-purple-700 font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-105">
                                Get Started Free
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/about"
                                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all duration-300">
                                Learn More
                            </Link>
                        </div>
                        {/* Stats */}
                        <div className="flex flex-wrap gap-6 mt-12">
                            {stats.map(({ value, label }) => (
                                <div key={label}>
                                    <div className="text-3xl font-extrabold text-white">{value}</div>
                                    <div className="text-purple-200 text-sm">{label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Hero Illustration - Feature Cards */}
                    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:grid grid-cols-2 gap-4">
                        {features.slice(0, 4).map(({ icon: Icon, title, color, path }, i) => (
                            <motion.div key={title}
                                onClick={() => navigate(path)}
                                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="glass rounded-2xl p-5 hover-lift cursor-pointer">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>
                                    <Icon size={20} className="text-white" />
                                </div>
                                <p className="text-white font-semibold text-sm">{title}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 80" className={dark ? 'fill-slate-950' : 'fill-white'}>
                        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section className={`py-24 ${dark ? 'bg-slate-950' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="text-center mb-16">
                        <motion.p variants={itemVariants} className="text-purple-600 font-semibold uppercase tracking-wider text-sm mb-3">Everything You Need</motion.p>
                        <motion.h2 variants={itemVariants} className={`text-4xl lg:text-5xl font-extrabold ${dark ? 'text-white' : 'text-slate-900'} mb-4`}>
                            One Platform, <span className="text-gradient">Infinite Possibilities</span>
                        </motion.h2>
                        <motion.p variants={itemVariants} className={`text-lg ${dark ? 'text-slate-400' : 'text-slate-500'} max-w-2xl mx-auto`}>
                            From networking to safety, from marketplace to mentorship — EmpowerHer has every tool you need to thrive.
                        </motion.p>
                    </motion.div>

                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map(({ icon: Icon, title, desc, color, path }) => (
                            <motion.div key={title} variants={itemVariants}
                                onClick={() => navigate(path)}
                                className={`group p-6 rounded-2xl hover-lift border transition-all duration-300 cursor-pointer
                  ${dark ? 'bg-slate-900 border-slate-800 hover:border-purple-700' : 'bg-white border-slate-100 hover:border-purple-200'}`}>
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={22} className="text-white" />
                                </div>
                                <h3 className={`font-bold text-lg mb-2 ${dark ? 'text-white' : 'text-slate-800'}`}>{title}</h3>
                                <p className={`text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className={`py-24 ${dark ? 'bg-slate-900' : 'bg-gradient-to-br from-purple-50 to-teal-50'}`}>
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="text-center mb-16">
                        <motion.h2 variants={itemVariants} className={`text-4xl font-extrabold ${dark ? 'text-white' : 'text-slate-900'} mb-4`}>
                            Stories of <span className="text-gradient">Transformation</span>
                        </motion.h2>
                    </motion.div>
                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map(({ name, role, text, avatar, bg }) => (
                            <motion.div key={name} variants={itemVariants}
                                className={`p-6 rounded-2xl border hover-lift ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-purple-100'}`}>
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                                </div>
                                <p className={`text-sm leading-relaxed mb-6 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>"{text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${bg} flex items-center justify-center text-white font-bold`}>{avatar}</div>
                                    <div>
                                        <p className={`font-semibold text-sm ${dark ? 'text-white' : 'text-slate-800'}`}>{name}</p>
                                        <p className="text-xs text-purple-500">{role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 gradient-hero" />
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <Globe size={48} className="text-white/80 mx-auto mb-6 animate-float" />
                        <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-6">
                            Your Journey Starts <br /> <span className="text-yellow-300">Today</span>
                        </h2>
                        <p className="text-purple-100 text-xl mb-10 max-w-2xl mx-auto">
                            Join 50,000+ women building their future. Free forever for members.
                        </p>
                        <Link to="/auth"
                            className="group inline-flex items-center gap-3 bg-white text-purple-700 font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 text-lg">
                            <Heart size={20} className="text-purple-500 fill-purple-500" />
                            Join EmpowerHer Free
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
