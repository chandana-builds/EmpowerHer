import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
    Home, Users, Calendar, ShoppingBag, Shield, MessageCircle,
    User, Bot, TrendingUp, Bell, Settings, LogOut, Menu, X,
    Sun, Moon, Heart, Star
} from 'lucide-react';

const navLinks = [
    { path: '/', label: 'Home', icon: Home, public: true },
    { path: '/about', label: 'About', icon: Heart, public: true },
    { path: '/dashboard', label: 'Dashboard', icon: TrendingUp },
    { path: '/groups', label: 'Groups', icon: Users },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/marketplace', label: 'Market', icon: ShoppingBag },
    { path: '/safety', label: 'Safety', icon: Shield },
    { path: '/support', label: 'Support', icon: MessageCircle },
    { path: '/ai-assistant', label: 'AI Chat', icon: Bot },
    { path: '/mentorship', label: 'Mentors', icon: Star },
];

export default function Navbar() {
    const { user, logout } = useAuth();
    const { dark, toggle } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const handleLogout = () => { logout(); navigate('/'); };

    const visibleLinks = navLinks.filter(l => l.public || user);

    return (
        <nav className={`sticky top-0 z-50 ${dark ? 'glass-dark' : 'glass'} border-b border-purple-200/30`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <span className="text-white font-bold text-lg">E</span>
                        </div>
                        <span className="font-bold text-lg text-gradient hidden sm:block">EmpowerHer</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {visibleLinks.slice(0, 7).map(({ path, label, icon: Icon }) => (
                            <Link key={path} to={path}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${location.pathname === path
                                        ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
                                        : dark ? 'text-purple-200 hover:bg-purple-900/40' : 'text-purple-700 hover:bg-purple-50'
                                    }`}>
                                <Icon size={15} />
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        <button onClick={toggle}
                            className={`p-2 rounded-lg transition-colors ${dark ? 'text-yellow-300 hover:bg-yellow-900/20' : 'text-purple-600 hover:bg-purple-50'}`}>
                            {dark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {user ? (
                            <>
                                <Link to="/notifications"
                                    className={`p-2 rounded-lg relative transition-colors ${dark ? 'text-purple-300 hover:bg-purple-900/40' : 'text-purple-600 hover:bg-purple-50'}`}>
                                    <Bell size={18} />
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                                </Link>

                                <div className="relative">
                                    <button onClick={() => setProfileOpen(!profileOpen)}
                                        className="flex items-center gap-2 p-1 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                                        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white text-sm font-bold shadow">
                                            {user.name?.[0] || 'U'}
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {profileOpen && (
                                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                                className={`absolute right-0 top-12 w-52 rounded-2xl shadow-xl border p-2 z-50 ${dark ? 'bg-slate-900 border-purple-800' : 'bg-white border-purple-100'}`}>
                                                <div className={`px-3 py-2 mb-1 border-b ${dark ? 'border-purple-800' : 'border-purple-100'}`}>
                                                    <p className="font-semibold text-sm">{user.name}</p>
                                                    <p className={`text-xs ${dark ? 'text-purple-400' : 'text-purple-500'}`}>{user.role}</p>
                                                </div>
                                                {[
                                                    { to: '/profile', label: 'Profile', icon: User },
                                                    { to: '/business', label: 'Business', icon: TrendingUp },
                                                    ...(user.role === 'admin' ? [{ to: '/admin', label: 'Admin Panel', icon: Settings }] : []),
                                                ].map(({ to, label, icon: Icon }) => (
                                                    <Link key={to} to={to} onClick={() => setProfileOpen(false)}
                                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${dark ? 'hover:bg-purple-900/40 text-purple-200' : 'hover:bg-purple-50 text-purple-700'}`}>
                                                        <Icon size={15} />{label}
                                                    </Link>
                                                ))}
                                                <button onClick={handleLogout}
                                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 w-full transition-colors mt-1">
                                                    <LogOut size={15} />Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <Link to="/auth"
                                className="gradient-primary text-white px-5 py-2 rounded-xl text-sm font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-200 hover:scale-105">
                                Join Now
                            </Link>
                        )}

                        {/* Mobile menu toggle */}
                        <button onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden p-2 rounded-lg text-purple-600 hover:bg-purple-50">
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className={`lg:hidden border-t ${dark ? 'border-purple-800 bg-slate-900' : 'border-purple-100 bg-white'} px-4 py-3`}>
                        <div className="grid grid-cols-2 gap-1">
                            {visibleLinks.map(({ path, label, icon: Icon }) => (
                                <Link key={path} to={path} onClick={() => setMenuOpen(false)}
                                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                    ${location.pathname === path ? 'bg-purple-600 text-white' : dark ? 'text-purple-200 hover:bg-purple-900/40' : 'text-purple-700 hover:bg-purple-50'}`}>
                                    <Icon size={16} />{label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
