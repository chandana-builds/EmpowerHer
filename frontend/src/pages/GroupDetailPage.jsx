import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
    Heart, MessageSquare, Share2, Send, Image, Video,
    Link as LinkIcon, Users, TrendingUp, Pin
} from 'lucide-react';
import toast from 'react-hot-toast';

const MOCK_POSTS = [
    {
        id: 1, author: 'Priya Sharma', avatar: 'P', avatarBg: 'from-purple-500 to-violet-500',
        time: '2h ago', content: "Just launched my first product on the marketplace! 🎉 So grateful for this community's support!",
    likes: 48, comments: 12, liked: false,
        commentList: [
            { author: 'Aisha K.', text: 'Congratulations! You deserve it! 🌸', time: '1h ago' },
            { author: 'Meena P.', text: 'So proud of you! Keep going! 💪', time: '45m ago' },
        ]
    },
    {
        id: 2, author: 'Sunita Verma', avatar: 'S', avatarBg: 'from-teal-500 to-cyan-500',
        time: '5h ago', content: '💡 Resource Alert: Government of India has announced new scheme for women entrepreneurs—₹2 lakh grant with 0% interest. Check the Support section for details!',
        likes: 132, comments: 34, liked: true,
        commentList: []
    },
];

export default function GroupDetailPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const { dark } = useTheme();
    const [posts, setPosts] = useState(MOCK_POSTS);
    const [newPost, setNewPost] = useState('');
    const [expandedComments, setExpandedComments] = useState([]);
    const [newComment, setNewComment] = useState({});

    const groupName = ['', 'Startups & Entrepreneurs', 'Small & Medium Businesses', 'Home Bakery & Cooking', 'Tailoring & Fashion', 'Teaching & Tutoring', 'Handicrafts & Art', 'Freelancers & Digital Creators'][id] || 'Group';

    const toggleLike = (postId) => {
        setPosts(prev => prev.map(p => p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
    };

    const submitPost = () => {
        if (!newPost.trim()) return;
        setPosts(prev => [{
            id: Date.now(), author: user?.name || 'You', avatar: user?.name?.[0] || 'Y',
            avatarBg: 'from-purple-500 to-pink-500', time: 'Just now',
            content: newPost, likes: 0, comments: 0, liked: false, commentList: []
        }, ...prev]);
        setNewPost('');
        toast.success('Post shared! 🎉');
    };

    const submitComment = (postId) => {
        if (!newComment[postId]?.trim()) return;
        setPosts(prev => prev.map(p => p.id === postId ? {
            ...p, comments: p.comments + 1,
            commentList: [...p.commentList, { author: user?.name || 'You', text: newComment[postId], time: 'Just now' }]
        } : p));
        setNewComment(prev => ({ ...prev, [postId]: '' }));
    };

    return (
        <div className={`min-h-screen py-8 px-4 ${dark ? 'bg-slate-950' : 'bg-gradient-to-br from-purple-50/50 to-teal-50/50'}`}>
            <div className="max-w-3xl mx-auto">
                {/* Group Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                    className="gradient-hero rounded-2xl p-6 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-30" />
                    <div className="relative">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="text-4xl">🚀</div>
                            <div>
                                <h1 className="text-xl font-extrabold text-white">{groupName}</h1>
                                <p className="text-purple-200 text-sm flex items-center gap-3">
                                    <span className="flex items-center gap-1"><Users size={13} />1,240 members</span>
                                    <span className="flex items-center gap-1"><TrendingUp size={13} />430 posts</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Post Composer */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                    className={`rounded-2xl border p-5 mb-6 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                    <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                            {user?.name?.[0] || 'Y'}
                        </div>
                        <div className="flex-1">
                            <textarea value={newPost} onChange={e => setNewPost(e.target.value)}
                                placeholder="Share something with the group..."
                                rows={3}
                                className={`w-full text-sm resize-none outline-none bg-transparent ${dark ? 'text-white placeholder-slate-500' : 'text-slate-700 placeholder-slate-400'}`} />
                            <div className="flex items-center justify-between pt-3 border-t border-purple-100 dark:border-slate-800">
                                <div className="flex gap-2">
                                    {[{ Icon: Image, label: 'Image' }, { Icon: Video, label: 'Video' }, { Icon: LinkIcon, label: 'Link' }].map(({ Icon, label }) => (
                                        <button key={label} className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors
                      ${dark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-purple-50'}`}>
                                            <Icon size={14} />{label}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={submitPost}
                                    className="gradient-primary text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md shadow-purple-500/30 hover:scale-105 transition-all flex items-center gap-2">
                                    <Send size={14} />Post
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Posts Feed */}
                <div className="space-y-4">
                    {posts.map((post, i) => (
                        <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                            className={`rounded-2xl border ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                            <div className="p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${post.avatarBg} flex items-center justify-center text-white font-bold`}>
                                        {post.avatar}
                                    </div>
                                    <div>
                                        <p className={`font-semibold text-sm ${dark ? 'text-white' : 'text-slate-800'}`}>{post.author}</p>
                                        <p className={`text-xs ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{post.time}</p>
                                    </div>
                                </div>
                                <p className={`text-sm leading-relaxed mb-4 ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{post.content}</p>
                                <div className={`flex items-center gap-4 pt-3 border-t ${dark ? 'border-slate-800' : 'border-purple-50'}`}>
                                    <button onClick={() => toggleLike(post.id)}
                                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${post.liked ? 'text-red-500' : dark ? 'text-slate-400 hover:text-red-400' : 'text-slate-500 hover:text-red-500'}`}>
                                        <Heart size={16} className={post.liked ? 'fill-red-500' : ''} />{post.likes}
                                    </button>
                                    <button onClick={() => setExpandedComments(prev => prev.includes(post.id) ? prev.filter(x => x !== post.id) : [...prev, post.id])}
                                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${dark ? 'text-slate-400 hover:text-purple-400' : 'text-slate-500 hover:text-purple-600'}`}>
                                        <MessageSquare size={16} />{post.comments}
                                    </button>
                                    <button className={`flex items-center gap-1.5 text-sm font-medium ml-auto transition-colors ${dark ? 'text-slate-400 hover:text-teal-400' : 'text-slate-500 hover:text-teal-600'}`}>
                                        <Share2 size={16} />Share
                                    </button>
                                </div>
                            </div>

                            {/* Comments Section */}
                            <AnimatePresence>
                                {expandedComments.includes(post.id) && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                        className={`border-t px-5 pb-4 ${dark ? 'border-slate-800' : 'border-purple-50'}`}>
                                        <div className="pt-3 space-y-3">
                                            {post.commentList.map((c, ci) => (
                                                <div key={ci} className={`flex gap-2 text-sm`}>
                                                    <div className={`w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                                        {c.author[0]}
                                                    </div>
                                                    <div className={`flex-1 rounded-xl px-3 py-2 ${dark ? 'bg-slate-800' : 'bg-purple-50'}`}>
                                                        <span className={`font-semibold ${dark ? 'text-white' : 'text-slate-700'}`}>{c.author}</span>
                                                        <span className={`ml-2 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{c.text}</span>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="flex gap-2 mt-2">
                                                <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                    {user?.name?.[0] || 'Y'}
                                                </div>
                                                <div className={`flex-1 flex rounded-xl overflow-hidden border ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-purple-200'}`}>
                                                    <input value={newComment[post.id] || ''} onChange={e => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                                                        onKeyDown={e => e.key === 'Enter' && submitComment(post.id)}
                                                        placeholder="Write a comment..."
                                                        className={`flex-1 px-3 py-2 text-xs bg-transparent outline-none ${dark ? 'text-white placeholder-slate-500' : 'text-slate-700 placeholder-slate-400'}`} />
                                                    <button onClick={() => submitComment(post.id)} className="px-3 text-purple-600 hover:text-purple-700">
                                                        <Send size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
