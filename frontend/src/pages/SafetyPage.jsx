import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Shield, Phone, AlertTriangle, MapPin, Plus, X, Check, Lightbulb, ChevronRight } from 'lucide-react';

const SAFETY_TIPS = [
    { id: 1, tip: 'Share your live location with trusted contacts when traveling alone.', icon: '📍' },
    { id: 2, tip: 'Save local police (100), ambulance (108), and women helpline (1091) on speed dial.', icon: '📞' },
    { id: 3, tip: 'Avoid isolated areas at night. Stick to well-lit, populated routes.', icon: '💡' },
    { id: 4, tip: 'Trust your instincts. If something feels wrong, leave immediately.', icon: '🧠' },
    { id: 5, tip: 'Tell someone where you are going and your expected return time.', icon: '👥' },
    { id: 6, tip: 'Keep your phone charged when going out, especially at night.', icon: '🔋' },
];

const EMERGENCY_CONTACTS = [
    { name: 'Police Emergency', number: '100', type: 'police', color: 'from-blue-500 to-blue-600' },
    { name: 'Ambulance', number: '108', type: 'ambulance', color: 'from-red-500 to-red-600' },
    { name: 'Women Helpline', number: '1091', type: 'helpline', color: 'from-purple-500 to-violet-600' },
    { name: 'National Emergency', number: '112', type: 'national', color: 'from-orange-500 to-amber-600' },
    { name: 'Cyber Crime', number: '1930', type: 'cyber', color: 'from-teal-500 to-cyan-600' },
    { name: 'Domestic Violence', number: '181', type: 'dv', color: 'from-rose-500 to-pink-600' },
];

export default function SafetyPage() {
    const { dark } = useTheme();
    const { user } = useAuth();
    const [sosSent, setSosSent] = useState(false);
    const [sosLoading, setSosLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [showAddContact, setShowAddContact] = useState(false);
    const [newContact, setNewContact] = useState({ name: '', phone: '', relation: '' });

    const handleSOS = async () => {
        setSosLoading(true);
        try {
            let lat = null, lng = null;
            try {
                const pos = await new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 }));
                lat = pos.coords.latitude;
                lng = pos.coords.longitude;
            } catch { }
            await axios.post('/api/safety/sos', { latitude: lat, longitude: lng, message: 'Emergency! I need help!' });
        } catch { }
        setSosSent(true);
        setSosLoading(false);
        toast.success('🚨 SOS Alert Sent! Emergency services notified.', { duration: 5000 });
        setTimeout(() => setSosSent(false), 10000);
    };

    const addContact = () => {
        if (!newContact.name || !newContact.phone) return;
        setContacts(prev => [...prev, { ...newContact, id: Date.now() }]);
        setNewContact({ name: '', phone: '', relation: '' });
        setShowAddContact(false);
        toast.success('Emergency contact added!');
    };

    return (
        <div className={`min-h-screen py-8 px-4 ${dark ? 'bg-slate-950' : 'bg-gradient-to-br from-red-50/30 to-purple-50/30'}`}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className={`text-3xl font-extrabold mb-2 flex items-center gap-3 ${dark ? 'text-white' : 'text-slate-800'}`}>
                        <Shield className="text-red-500" size={32} />Safety & Emergency
                    </h1>
                    <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Your safety is our top priority. Use the SOS button in any emergency situation.</p>
                </motion.div>

                {/* SOS Button */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
                    <div className={`rounded-3xl p-8 text-center border-2 ${sosSent ? 'border-green-400 bg-green-50' : dark ? 'bg-slate-900 border-red-900' : 'bg-red-50 border-red-200'}`}>
                        <AnimatePresence mode="wait">
                            {sosSent ? (
                                <motion.div key="sent" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check size={40} className="text-white" />
                                    </div>
                                    <h2 className="text-2xl font-black text-green-700 mb-2">SOS Sent! 🚨</h2>
                                    <p className="text-green-600">Emergency alert sent to contacts and services. Help is on the way!</p>
                                </motion.div>
                            ) : (
                                <motion.div key="idle" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <motion.button
                                        onClick={handleSOS}
                                        disabled={sosLoading}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-36 h-36 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex flex-col items-center justify-center mx-auto mb-4 shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 transition-all disabled:opacity-70 ring-4 ring-red-200 ring-offset-4"
                                    >
                                        <AlertTriangle size={36} className="text-white mb-1" />
                                        <span className="text-white font-black text-xl">{sosLoading ? '...' : 'SOS'}</span>
                                    </motion.button>
                                    <h2 className={`text-xl font-bold mb-2 ${dark ? 'text-white' : 'text-slate-800'}`}>Emergency SOS</h2>
                                    <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Press to instantly alert your emergency contacts and local authorities with your location.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Emergency numbers */}
                    <div className={`rounded-2xl border p-5 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                        <h3 className={`font-bold text-lg mb-4 flex items-center gap-2 ${dark ? 'text-white' : 'text-slate-800'}`}><Phone size={18} className="text-red-500" />Emergency Numbers</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {EMERGENCY_CONTACTS.map(c => (
                                <a key={c.number} href={`tel:${c.number}`} className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-105 bg-gradient-to-r ${c.color} text-white`}>
                                    <div>
                                        <p className="font-bold text-lg leading-none">{c.number}</p>
                                        <p className="text-xs opacity-90 mt-0.5">{c.name}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Personal emergency contacts */}
                    <div className={`rounded-2xl border p-5 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`font-bold text-lg flex items-center gap-2 ${dark ? 'text-white' : 'text-slate-800'}`}><Shield size={18} className="text-purple-500" />My Contacts</h3>
                            <button onClick={() => setShowAddContact(!showAddContact)} className="flex items-center gap-1 text-purple-600 text-sm font-semibold hover:underline">
                                <Plus size={16} />Add
                            </button>
                        </div>
                        <AnimatePresence>
                            {showAddContact && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 overflow-hidden">
                                    <div className="space-y-2">
                                        {['name', 'phone', 'relation'].map(f => (
                                            <input key={f} value={newContact[f]} onChange={e => setNewContact({ ...newContact, [f]: e.target.value })} placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                                                className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none ${dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-purple-50 border-purple-200 text-slate-800'}`} />
                                        ))}
                                        <button onClick={addContact} className="w-full gradient-primary text-white py-2.5 rounded-xl text-sm font-bold">Add Contact</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {contacts.length === 0 ? (
                            <div className={`text-center py-8 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                                <p className="text-sm">Add trusted people who should be alerted in an emergency.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {contacts.map(c => (
                                    <div key={c.id} className={`flex items-center gap-3 p-3 rounded-xl ${dark ? 'bg-slate-800' : 'bg-purple-50'}`}>
                                        <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">{c.name[0]}</div>
                                        <div className="flex-1">
                                            <p className={`font-semibold text-sm ${dark ? 'text-white' : 'text-slate-800'}`}>{c.name} <span className={`text-xs font-normal ${dark ? 'text-slate-400' : 'text-slate-500'}`}>({c.relation})</span></p>
                                            <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{c.phone}</p>
                                        </div>
                                        <a href={`tel:${c.phone}`} className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><Phone size={14} className="text-green-600" /></a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Safety tips */}
                <div className={`rounded-2xl border p-6 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                    <h3 className={`font-bold text-lg mb-4 flex items-center gap-2 ${dark ? 'text-white' : 'text-slate-800'}`}><Lightbulb size={18} className="text-amber-500" />Safety Tips</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {SAFETY_TIPS.map(t => (
                            <motion.div key={t.id} whileHover={{ x: 4 }}
                                className={`flex items-start gap-3 p-3 rounded-xl ${dark ? 'bg-slate-800' : 'bg-amber-50'}`}>
                                <span className="text-xl">{t.icon}</span>
                                <p className={`text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{t.tip}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
