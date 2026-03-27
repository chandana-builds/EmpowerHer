import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Calendar, MapPin, Users, Clock, Wifi, CheckCircle, Filter, Plus, X } from 'lucide-react';

const categories = ['All', 'Workshop', 'Networking', 'Webinar', 'Summit', 'Training', 'Social'];

const MOCK_EVENTS = [
    { _id: 'e1', title: 'Women Leadership Summit 2026', description: 'Annual gathering of women leaders across industries. Keynotes, panels, and networking dinners await.', category: 'Summit', date: '2026-03-15T10:00:00', location: 'Mumbai Convention Centre', isOnline: false, attendees: ['1', '2'], maxAttendees: 500, isFree: false, price: 999, organizer: { name: 'EmpowerHer Team' }, tags: ['leadership', 'networking'] },
    { _id: 'e2', title: 'Digital Marketing Masterclass', description: 'Learn social media and SEO strategies for your business. Practical exercises included.', category: 'Workshop', date: '2026-03-20T14:00:00', location: '', isOnline: true, attendees: ['1'], maxAttendees: 100, isFree: true, price: 0, organizer: { name: 'Sarah Ahmed' }, tags: ['marketing', 'digital'] },
    { _id: 'e3', title: 'Legal Rights for Women Entrepreneurs', description: 'Know your rights as a business owner. Free legal consultation after the session.', category: 'Webinar', date: '2026-03-25T16:00:00', location: '', isOnline: true, attendees: [], maxAttendees: 200, isFree: true, price: 0, organizer: { name: 'LegalEase NGO' }, tags: ['legal', 'rights'] },
    { _id: 'e4', title: 'Handicrafts Business Expo', description: 'Showcase your handmade products, find buyers, and network with artisans.', category: 'Social', date: '2026-04-05T09:00:00', location: 'Delhi Trade Centre', isOnline: false, attendees: ['1', '2', '3'], maxAttendees: 300, isFree: false, price: 299, organizer: { name: 'Craft India' }, tags: ['handicrafts', 'expo'] },
    { _id: 'e5', title: 'Mindfulness & Business Balance', description: 'A workshop on maintaining mental wellness while running a business.', category: 'Training', date: '2026-04-12T11:00:00', location: 'Bangalore Wellness Centre', isOnline: false, attendees: ['1'], maxAttendees: 50, isFree: false, price: 499, organizer: { name: 'Mind & Motion' }, tags: ['wellness', 'mindfulness'] },
    { _id: 'e6', title: 'Tech Women Networking Night', description: 'Monthly networking for women in technology. Casual, fun, and impactful.', category: 'Networking', date: '2026-04-18T18:00:00', location: 'Hyderabad Tech Hub', isOnline: false, attendees: [], maxAttendees: 80, isFree: true, price: 0, organizer: { name: 'Tech Sisters' }, tags: ['tech', 'networking'] },
];

function EventCard({ event, onRsvp, rsvped, dark }) {
    const dateObj = new Date(event.date);
    const isUpcoming = dateObj > new Date();

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border overflow-hidden hover-lift ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
            {/* Color band by category */}
            <div className={`h-2 ${event.category === 'Summit' ? 'bg-gradient-to-r from-purple-500 to-violet-600' : event.category === 'Workshop' ? 'bg-gradient-to-r from-teal-500 to-cyan-500' : event.category === 'Webinar' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : event.category === 'Social' ? 'bg-gradient-to-r from-pink-400 to-rose-500' : 'bg-gradient-to-r from-amber-400 to-orange-500'}`} />
            <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${dark ? 'bg-slate-800 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>{event.category}</span>
                        <h3 className={`font-bold text-base mt-2 leading-snug ${dark ? 'text-white' : 'text-slate-800'}`}>{event.title}</h3>
                    </div>
                    <span className={`shrink-0 text-sm font-bold px-3 py-1 rounded-full ${event.isFree ? 'bg-green-100 text-green-700' : dark ? 'bg-slate-800 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
                        {event.isFree ? 'FREE' : `₹${event.price}`}
                    </span>
                </div>
                <p className={`text-sm mb-4 leading-relaxed line-clamp-2 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{event.description}</p>
                <div className="space-y-2 mb-4">
                    <div className={`flex items-center gap-2 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                        <Calendar size={13} className="text-purple-500 shrink-0" />
                        {dateObj.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} · {dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {event.isOnline ? <Wifi size={13} className="text-teal-500 shrink-0" /> : <MapPin size={13} className="text-rose-500 shrink-0" />}
                        {event.isOnline ? 'Online Event' : event.location}
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                        <Users size={13} className="text-blue-500 shrink-0" />
                        {event.attendees.length} / {event.maxAttendees} attending
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => onRsvp(event._id)} disabled={!isUpcoming}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 ${rsvped ? 'bg-green-100 text-green-700 border border-green-200' : 'gradient-primary text-white shadow-md shadow-purple-500/20'} ${!isUpcoming ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {rsvped ? <span className="flex items-center justify-center gap-1"><CheckCircle size={14} />RSVP'd</span> : isUpcoming ? 'RSVP Now' : 'Event Ended'}
                    </button>
                    <span className={`text-xs ${dark ? 'text-slate-500' : 'text-slate-400'}`}>by {event.organizer?.name}</span>
                </div>
            </div>
        </motion.div>
    );
}

export default function EventsPage() {
    const { dark } = useTheme();
    const [events, setEvents] = useState(MOCK_EVENTS);
    const [filter, setFilter] = useState('All');
    const [rsvped, setRsvped] = useState(new Set(['e1']));
    const [tab, setTab] = useState('upcoming');

    useEffect(() => {
        axios.get('/api/events').then(r => setEvents(r.data.events || MOCK_EVENTS)).catch(() => setEvents(MOCK_EVENTS));
    }, []);

    const handleRsvp = async (eventId) => {
        if (rsvped.has(eventId)) return;
        try {
            await axios.post(`/api/events/${eventId}/rsvp`);
        } catch { }
        setRsvped(prev => new Set([...prev, eventId]));
        toast.success('RSVP confirmed! 🎉');
    };

    const now = new Date();
    const filtered = events.filter(e => {
        const matchCat = filter === 'All' || e.category === filter;
        const isUpcoming = new Date(e.date) > now;
        const matchTab = tab === 'upcoming' ? isUpcoming : !isUpcoming;
        return matchCat && matchTab;
    });

    return (
        <div className={`min-h-screen py-8 px-4 ${dark ? 'bg-slate-950' : 'bg-gradient-to-br from-purple-50/40 to-teal-50/40'}`}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className={`text-3xl font-extrabold mb-2 ${dark ? 'text-white' : 'text-slate-800'}`}>Events & Programs <span className="text-gradient">📅</span></h1>
                    <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Workshops, summits, and networking events designed for women to grow and connect.</p>
                </motion.div>

                {/* Tabs */}
                <div className={`flex rounded-2xl p-1 mb-6 w-fit ${dark ? 'bg-slate-900' : 'bg-white border border-purple-100'}`}>
                    {['upcoming', 'past'].map(t => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`px-6 py-2 rounded-xl font-semibold text-sm capitalize transition-all ${tab === t ? 'gradient-primary text-white' : dark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {t === 'upcoming' ? '🔜 Upcoming' : '📚 Past'}
                        </button>
                    ))}
                </div>

                {/* Category filters */}
                <div className="flex gap-2 flex-wrap mb-6">
                    {categories.map(c => (
                        <button key={c} onClick={() => setFilter(c)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === c ? 'gradient-primary text-white shadow-md' : dark ? 'bg-slate-900 text-slate-300 border border-slate-700 hover:border-purple-500' : 'bg-white text-slate-600 border border-purple-100 hover:border-purple-400'}`}>
                            {c}
                        </button>
                    ))}
                </div>

                {/* Events grid */}
                {filtered.length === 0 ? (
                    <div className={`text-center py-20 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                        <Clock size={48} className="mx-auto mb-4 opacity-40" />
                        <p className="font-semibold">No {tab} events in this category</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map(event => (
                            <EventCard key={event._id} event={event} onRsvp={handleRsvp} rsvped={rsvped.has(event._id)} dark={dark} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
