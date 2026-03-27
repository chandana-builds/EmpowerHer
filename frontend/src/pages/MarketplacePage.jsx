import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ShoppingBag, Plus, X, MapPin, Eye, MessageCircle, Search, Filter, Star, Tag } from 'lucide-react';

const categories = ['All', 'Handicrafts', 'Fashion', 'Food', 'Beauty', 'Tech', 'Services', 'Education'];

const MOCK_PRODUCTS = [
    { _id: 'p1', title: 'Handmade Terracotta Earrings', description: 'Beautiful handcrafted earrings made from natural clay. Each piece is unique.', price: 350, category: 'Handicrafts', seller: { name: 'Priya Sharma' }, images: [], tags: ['earrings', 'terracotta'], location: 'Jaipur', views: 124, inquiries: [] },
    { _id: 'p2', title: 'Organic Skincare Kit', description: 'Natural ingredients, handmade with love. Includes face wash, toner & moisturizer.', price: 899, category: 'Beauty', seller: { name: 'Aisha Khan' }, images: [], tags: ['skincare', 'organic'], location: 'Kerala', views: 89, inquiries: [] },
    { _id: 'p3', title: 'Logo Design Service', description: 'Professional logo design for your business. Includes 3 revisions & source files.', price: 2000, category: 'Services', seller: { name: 'Ritu Verma' }, images: [], tags: ['design', 'logo'], location: 'Remote', views: 203, inquiries: [] },
    { _id: 'p4', title: 'Banana Bread Mix', description: 'Ready-to-bake banana bread mix. Just add eggs and butter! Enough for 2 loaves.', price: 280, category: 'Food', seller: { name: 'Meena Patel' }, images: [], tags: ['baking', 'food'], location: 'Pune', views: 67, inquiries: [] },
    { _id: 'p5', title: 'Excel & Data Entry Course', description: '10-module course teaching Excel from basics to advanced. Certificate included.', price: 1499, category: 'Education', seller: { name: 'Sarah Ahmed' }, images: [], tags: ['excel', 'education'], location: 'Online', views: 341, inquiries: [] },
    { _id: 'p6', title: 'Handloom Saree – Blue & Gold', description: 'Pure cotton handloom saree with traditional motifs. Dry wash only.', price: 1800, category: 'Fashion', seller: { name: 'Lakshmi Iyer' }, images: [], tags: ['saree', 'handloom'], location: 'Varanasi', views: 158, inquiries: [] },
];

const categoryEmoji = { Handicrafts: '🪴', Fashion: '👗', Food: '🍰', Beauty: '💄', Tech: '💻', Services: '🛠️', Education: '📚', Other: '🎁' };

function AddListingModal({ onClose, onAdd, dark }) {
    const [form, setForm] = useState({ title: '', description: '', price: '', category: 'Handicrafts', location: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/marketplace', { ...form, price: Number(form.price) });
        } catch { }
        onAdd({ ...form, _id: 'new-' + Date.now(), seller: { name: 'You' }, views: 0, inquiries: [] });
        toast.success('Listing added! 🛍️');
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className={`w-full max-w-md rounded-2xl p-6 border ${dark ? 'bg-slate-900 border-slate-700' : 'bg-white border-purple-100'}`}>
                <div className="flex items-center justify-between mb-5">
                    <h2 className={`text-xl font-bold ${dark ? 'text-white' : 'text-slate-800'}`}>New Listing 🛍️</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[{ name: 'title', label: 'Product/Service Title', type: 'text' }, { name: 'price', label: 'Price (₹)', type: 'number' }, { name: 'location', label: 'Location', type: 'text' }].map(({ name, label, type }) => (
                        <div key={name}>
                            <label className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</label>
                            <input type={type} value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} required
                                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${dark ? 'bg-slate-800 border-slate-700 text-white focus:border-purple-500' : 'bg-purple-50 border-purple-200 text-slate-800 focus:border-purple-500'}`} />
                        </div>
                    ))}
                    <div>
                        <label className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Category</label>
                        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-purple-50 border-purple-200 text-slate-800'}`}>
                            {categories.slice(1).map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Description</label>
                        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} required
                            className={`w-full px-4 py-3 rounded-xl border text-sm resize-none outline-none transition-all ${dark ? 'bg-slate-800 border-slate-700 text-white focus:border-purple-500' : 'bg-purple-50 border-purple-200 text-slate-800 focus:border-purple-500'}`} />
                    </div>
                    <button type="submit" disabled={loading} className="w-full gradient-primary text-white font-bold py-3 rounded-xl hover:scale-105 transition-all disabled:opacity-50">
                        {loading ? 'Adding...' : 'Add Listing ✨'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

function InquiryModal({ product, onClose, dark }) {
    const [msg, setMsg] = useState('');
    const handleSend = async () => {
        try { await axios.post(`/api/marketplace/${product._id}/inquire`, { message: msg }); } catch { }
        toast.success('Inquiry sent to seller! 📬');
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className={`w-full max-w-md rounded-2xl p-6 border ${dark ? 'bg-slate-900 border-slate-700' : 'bg-white border-purple-100'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className={`font-bold text-lg ${dark ? 'text-white' : 'text-slate-800'}`}>Inquire About "{product.title}"</h2>
                    <button onClick={onClose}><X size={20} className="text-slate-400" /></button>
                </div>
                <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={4} placeholder="Hi, I'm interested in your product..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm resize-none outline-none mb-4 ${dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-purple-50 border-purple-200 text-slate-800'}`} />
                <div className="flex gap-3">
                    <button onClick={onClose} className={`flex-1 py-3 rounded-xl border font-semibold text-sm ${dark ? 'border-slate-700 text-slate-300' : 'border-purple-200 text-purple-600'}`}>Cancel</button>
                    <button onClick={handleSend} className="flex-1 gradient-primary text-white py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all">Send Inquiry</button>
                </div>
            </motion.div>
        </div>
    );
}

export default function MarketplacePage() {
    const { dark } = useTheme();
    const { user } = useAuth();
    const [products, setProducts] = useState(MOCK_PRODUCTS);
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [inquiryProduct, setInquiryProduct] = useState(null);

    useEffect(() => {
        axios.get('/api/marketplace').then(r => setProducts(r.data.products || MOCK_PRODUCTS)).catch(() => setProducts(MOCK_PRODUCTS));
    }, []);

    const filtered = products.filter(p => {
        const matchCat = category === 'All' || p.category === category;
        const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div className={`min-h-screen py-8 px-4 ${dark ? 'bg-slate-950' : 'bg-gradient-to-br from-purple-50/40 to-orange-50/40'}`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className={`text-3xl font-extrabold mb-1 ${dark ? 'text-white' : 'text-slate-800'}`}>Women's Marketplace <span>🛍️</span></h1>
                        <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Buy from and sell to women entrepreneurs across India.</p>
                    </div>
                    <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 gradient-primary text-white px-5 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-purple-500/30">
                        <Plus size={18} />List Your Product
                    </button>
                </motion.div>

                {/* Search */}
                <div className={`relative mb-6 max-w-md ${dark ? 'text-white' : 'text-slate-800'}`}>
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products & services..."
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all ${dark ? 'bg-slate-900 border-slate-700 focus:border-purple-500' : 'bg-white border-purple-100 focus:border-purple-400'}`} />
                </div>

                {/* Category filters */}
                <div className="flex gap-2 flex-wrap mb-8">
                    {categories.map(c => (
                        <button key={c} onClick={() => setCategory(c)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1 ${category === c ? 'gradient-primary text-white shadow-md' : dark ? 'bg-slate-900 text-slate-300 border border-slate-700' : 'bg-white text-slate-600 border border-purple-100 hover:border-purple-300'}`}>
                            {c !== 'All' && <span>{categoryEmoji[c]}</span>}{c}
                        </button>
                    ))}
                </div>

                {/* Products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filtered.map((product, i) => (
                        <motion.div key={product._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className={`rounded-2xl border overflow-hidden hover-lift ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                            {/* Product image placeholder */}
                            <div className={`h-40 flex items-center justify-center ${dark ? 'bg-slate-800' : 'bg-gradient-to-br from-purple-50 to-pink-50'}`}>
                                <span className="text-5xl">{categoryEmoji[product.category] || '🎁'}</span>
                            </div>
                            <div className="p-4">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className={`font-bold text-sm leading-tight ${dark ? 'text-white' : 'text-slate-800'}`}>{product.title}</h3>
                                    <span className="text-purple-600 font-black text-sm shrink-0">₹{product.price.toLocaleString()}</span>
                                </div>
                                <p className={`text-xs mb-3 line-clamp-2 leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{product.description}</p>
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-xs flex items-center gap-1 ${dark ? 'text-slate-500' : 'text-slate-400'}`}><MapPin size={11} />{product.location}</span>
                                    <span className={`text-xs flex items-center gap-1 ${dark ? 'text-slate-500' : 'text-slate-400'}`}><Eye size={11} />{product.views}</span>
                                </div>
                                <div className={`text-xs mb-3 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>By <span className="font-semibold text-purple-600">{product.seller?.name}</span></div>
                                <button onClick={() => setInquiryProduct(product)}
                                    className="w-full flex items-center justify-center gap-2 gradient-primary text-white py-2.5 rounded-xl text-sm font-bold hover:scale-105 transition-all">
                                    <MessageCircle size={14} />Inquire
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {filtered.length === 0 && (
                    <div className={`text-center py-20 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                        <ShoppingBag size={48} className="mx-auto mb-4 opacity-40" />
                        <p className="font-semibold">No products found</p>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {showAdd && <AddListingModal dark={dark} onClose={() => setShowAdd(false)} onAdd={p => setProducts(prev => [p, ...prev])} />}
                {inquiryProduct && <InquiryModal product={inquiryProduct} dark={dark} onClose={() => setInquiryProduct(null)} />}
            </AnimatePresence>
        </div>
    );
}
