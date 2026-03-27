import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import {
    Eye, EyeOff, Mail, Lock, User, MapPin, Briefcase,
    ArrowRight, Sparkles, Shield
} from 'lucide-react';

const interests = ['Startups', 'E-Commerce', 'Baking', 'Fashion', 'Teaching', 'Handicrafts', 'Freelancing', 'Tech', 'Healthcare', 'Finance'];

export default function AuthPage() {
    const [tab, setTab] = useState('login');
    const [step, setStep] = useState(1); // 1=form, 2=otp, 3=forgot
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [form, setForm] = useState({ name: '', email: '', password: '', location: '', businessType: '', interests: [] });
    const { login, register } = useAuth();
    const { dark } = useTheme();
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const toggleInterest = (i) => {
        setForm(prev => ({
            ...prev,
            interests: prev.interests.includes(i) ? prev.interests.filter(x => x !== i) : [...prev.interests, i]
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(form.email, form.password);
            toast.success('Welcome back! 🎉');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } finally { setLoading(false); }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(form);
            await login(form.email, form.password);
            toast.success('Registration successful! Welcome to EmpowerHer 🌸');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed. (If testing locally, use Demo credentials).');
        } finally { setLoading(false); }
    };

    const handleOtp = async () => {
        setLoading(true);
        try {
            await login(form.email, form.password);
            toast.success('Verified! Welcome to EmpowerHer 🌸');
            navigate('/dashboard');
        } catch {
            toast.error('Invalid OTP');
        } finally { setLoading(false); }
    };

    const handleOtpInput = (val, idx) => {
        const next = [...otp];
        next[idx] = val;
        setOtp(next);
        if (val && idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
    };

    return (
        <div className={`min-h-screen flex ${dark ? 'bg-slate-950' : 'bg-gradient-to-br from-purple-50 via-white to-teal-50'}`}>
            {/* Left Panel */}
            <div className="hidden lg:flex w-1/2 gradient-hero relative p-12 flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-20" />
                <div className="absolute top-20 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }} />
                <div className="relative">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white font-black text-xl">E</div>
                        <span className="text-white text-2xl font-bold">EmpowerHer</span>
                    </div>
                    <h2 className="text-4xl font-extrabold text-white mb-4">Where Women <br /> Build Empires 👑</h2>
                    <p className="text-purple-100 text-lg leading-relaxed mb-8">Join 50,000+ women entrepreneurs, creators, and changemakers on the world's leading women empowerment platform.</p>
                    <div className="space-y-4">
                        {['🚀 Business & Networking Groups', '📅 Events & Mentorship Programs', '🛡️ Safety & Emergency Support', '🤖 AI-Powered Business Assistant'].map(item => (
                            <div key={item} className="flex items-center gap-3 text-white/90 text-sm">
                                <div className="w-2 h-2 bg-yellow-300 rounded-full flex-shrink-0" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <Shield size={24} className="text-green-300" />
                    <div>
                        <p className="text-white font-semibold text-sm">100% Secure & Private</p>
                        <p className="text-purple-200 text-xs">End-to-end encryption on all chats</p>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex items-center justify-center p-6">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    className={`w-full max-w-md rounded-3xl shadow-xl border p-8 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>

                    <AnimatePresence mode="wait">
                        {/* OTP Step */}
                        {step === 2 ? (
                            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                                        <Mail size={28} className="text-white" />
                                    </div>
                                    <h2 className={`text-2xl font-bold ${dark ? 'text-white' : 'text-slate-800'}`}>Verify Your Email</h2>
                                    <p className={`text-sm mt-2 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Enter the 6-digit code sent to {form.email}</p>
                                </div>
                                <div className="flex gap-2 justify-center mb-8">
                                    {otp.map((v, i) => (
                                        <input key={i} id={`otp-${i}`} maxLength={1} value={v}
                                            onChange={e => handleOtpInput(e.target.value, i)}
                                            className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all outline-none
                        ${dark ? 'bg-slate-800 border-slate-700 text-white focus:border-purple-500' : 'bg-purple-50 border-purple-200 text-purple-700 focus:border-purple-500'}`} />
                                    ))}
                                </div>
                                <button onClick={handleOtp} disabled={loading}
                                    className="w-full gradient-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50">
                                    {loading ? 'Verifying...' : 'Verify & Continue'}
                                </button>
                                <p className={`text-center text-sm mt-4 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Didn't receive? <button className="text-purple-600 font-semibold">Resend OTP</button>
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                {/* Tabs */}
                                <div className={`flex rounded-2xl p-1 mb-8 ${dark ? 'bg-slate-800' : 'bg-purple-50'}`}>
                                    {['login', 'register'].map(t => (
                                        <button key={t} onClick={() => { setTab(t); setStep(1); setForm({ name: '', email: '', password: '', location: '', businessType: '', interests: [] }); }}
                                            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-300 capitalize
                        ${tab === t ? 'gradient-primary text-white shadow-md shadow-purple-500/30' : dark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>
                                            {t === 'login' ? '🔑 Login' : '✨ Register'}
                                        </button>
                                    ))}
                                </div>

                                {tab === 'login' ? (
                                    <form onSubmit={handleLogin} className="space-y-4">
                                        <h2 className={`text-2xl font-bold text-center mb-6 ${dark ? 'text-white' : 'text-slate-800'}`}>Welcome Back 👋</h2>
                                        {[
                                            { name: 'email', label: 'Email', type: 'email', icon: Mail },
                                            { name: 'password', label: 'Password', type: show ? 'text' : 'password', icon: Lock },
                                        ].map(({ name, label, type, icon: Icon }) => (
                                            <div key={name}>
                                                <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</label>
                                                <div className="relative">
                                                    <Icon size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? 'text-slate-400' : 'text-purple-400'}`} />
                                                    <input name={name} type={type} value={form[name]} onChange={handleChange} required
                                                        className={`w-full pl-10 pr-10 py-3.5 rounded-xl border text-sm transition-all outline-none
                              ${dark ? 'bg-slate-800 border-slate-700 text-white focus:border-purple-500' : 'bg-purple-50 border-purple-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`}
                                                        placeholder={`Enter your ${label.toLowerCase()}`} />
                                                    {name === 'password' && (
                                                        <button type="button" onClick={() => setShow(!show)}
                                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                                            {show ? <EyeOff size={16} /> : <Eye size={16} />}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="text-right">
                                            <button type="button" onClick={() => setStep(3)} className="text-purple-600 text-sm font-semibold hover:underline">Forgot password?</button>
                                        </div>
                                        <button type="submit" disabled={loading}
                                            className="w-full gradient-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2">
                                            {loading ? 'Signing in...' : <><span>Sign In</span><ArrowRight size={18} /></>}
                                        </button>
                                        {/* Demo credentials */}
                                        <div className={`rounded-2xl p-4 text-xs space-y-1 ${dark ? 'bg-slate-800' : 'bg-purple-50'}`}>
                                            <p className="font-semibold text-purple-600 flex items-center gap-1"><Sparkles size={12} />Demo Credentials</p>
                                            <p className={dark ? 'text-slate-400' : 'text-slate-500'}>Member: member@demo.com / demo1234</p>
                                            <p className={dark ? 'text-slate-400' : 'text-slate-500'}>Admin: admin@demo.com / admin1234</p>
                                        </div>
                                    </form>
                                ) : (
                                    <form onSubmit={handleRegister} className="space-y-4">
                                        <h2 className={`text-2xl font-bold text-center mb-6 ${dark ? 'text-white' : 'text-slate-800'}`}>Join EmpowerHer 🌸</h2>
                                        {[
                                            { name: 'name', label: 'Full Name', type: 'text', icon: User },
                                            { name: 'email', label: 'Email', type: 'email', icon: Mail },
                                            { name: 'location', label: 'Location', type: 'text', icon: MapPin },
                                            { name: 'businessType', label: 'Business / Profession', type: 'text', icon: Briefcase },
                                            { name: 'password', label: 'Password', type: show ? 'text' : 'password', icon: Lock },
                                        ].map(({ name, label, type, icon: Icon }) => (
                                            <div key={name}>
                                                <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</label>
                                                <div className="relative">
                                                    <Icon size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? 'text-slate-400' : 'text-purple-400'}`} />
                                                    <input name={name} type={type} value={form[name]} onChange={handleChange} required
                                                        className={`w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm transition-all outline-none
                              ${dark ? 'bg-slate-800 border-slate-700 text-white focus:border-purple-500' : 'bg-purple-50 border-purple-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`}
                                                        placeholder={`Enter ${label.toLowerCase()}`} />
                                                </div>
                                            </div>
                                        ))}
                                        <div>
                                            <label className={`text-xs font-semibold uppercase tracking-wider mb-2 block ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Interests (select all that apply)</label>
                                            <div className="flex flex-wrap gap-2">
                                                {interests.map(i => (
                                                    <button key={i} type="button" onClick={() => toggleInterest(i)}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                              ${form.interests.includes(i) ? 'gradient-primary text-white shadow-md' : dark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'}`}>
                                                        {i}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button type="submit" disabled={loading}
                                            className="w-full gradient-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2">
                                            {loading ? 'Creating account...' : <><Sparkles size={18} /><span>Create Account</span></>}
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
