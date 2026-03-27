import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Bot, Send, User, Sparkles, RefreshCw } from 'lucide-react';

const QUICK_PROMPTS = [
    '💼 How do I start a small business?',
    '📣 Tips to market my products online',
    '⚖️ What are my legal rights as an entrepreneur?',
    '💰 How to get a business loan?',
    '🧠 I\'m feeling overwhelmed – help me',
    '📊 How to price my handmade products?',
];

const AI_RESPONSES = {
    business: [`Starting a small business is exciting! Here's a quick roadmap:\n\n1. **Validate your idea** - Talk to 10 potential customers first\n2. **Register your business** - MSME registration is free and gives you access to government schemes\n3. **Set up finances** - Open a separate business bank account\n4. **Build online presence** - Instagram + WhatsApp Business are free and powerful\n\nWould you like me to go deeper into any of these steps? 🚀`, `Great question! For starting out:\n- **Sole Proprietorship** is the easiest to register in India\n- **GST registration** is needed once turnover exceeds ₹20 lakhs\n- **Udyam Registration** (MSME) gives benefits like lower loan interest rates\n\nWhat type of business are you planning? I can give you more specific advice! 💫`],
    marketing: [`Here are proven digital marketing tips for women entrepreneurs:\n\n📸 **Instagram/Facebook**\n- Post consistently (3x/week minimum)\n- Use Reels – they get 3x more reach than regular posts\n- Respond to every comment within 2 hours\n\n💬 **WhatsApp Business**\n- Create a catalog of your products\n- Set up automated greetings\n- Broadcast to customers weekly\n\n🔍 **Google My Business**\n- Free listing that shows on Google Maps\n- Get reviews from happy customers\n\nWant a personalized marketing plan for your business? 🌟`],
    legal: [`Here are your key rights as a woman entrepreneur in India:\n\n⚖️ **Business Rights**\n- Equal right to start and run any legal business\n- MSME benefits and priority in government tenders\n- Mudra Loan up to ₹10 lakh (no collateral)\n\n🛡️ **Workplace Rights**\n- Protection against sexual harassment (POSH Act)\n- Right to safe working environment\n\n💼 **Contract Rights**\n- All contracts valid when signed by women\n- Right to sue for non-payment\n\nFor specific legal advice, I recommend consulting the EmpowerHer legal cell. Shall I help you raise a support ticket? 💜`],
    loan: [`Government loans available for women entrepreneurs:\n\n💰 **Mudra Loan (Pradhan Mantri Mudra Yojana)**\n- Shishu: Up to ₹50,000 (no collateral)\n- Kishore: ₹50,000 - ₹5 lakh\n- Tarun: ₹5 lakh - ₹10 lakh\n\n🏦 **Stree Shakti Package (SBI)**\n- Discounted interest if 50%+ stake held by women\n- No collateral up to ₹25 lakh\n\n📋 **Documents typically needed:**\n- Aadhaar + PAN card\n- Business plan\n- Bank statements (6 months)\n- MSME/Udyam registration\n\nShall I help you prepare a business plan? 📝`],
    emotional: [`I hear you, and it's completely okay to feel overwhelmed. Running a business is hard, and you're doing something brave. 💜\n\nHere's what might help right now:\n\n🌸 **Immediate relief**\n- Take 5 deep breaths (try the 4-7-8 technique)\n- Step away from screens for 10 minutes\n- Have a glass of water\n\n📝 **Clarity exercise**\n- Write down everything on your mind\n- Circle what's actually urgent (usually 1-2 things)\n- The rest can wait\n\n🤝 **You're not alone**\n- Our support team is available 24/7\n- Join the EmpowerHer community – other women get it\n\nWould you like me to connect you with a mentor or counsellor? 💪`],
    pricing: [`Pricing handmade products is an art! Here's a formula:\n\n💎 **The Handmade Pricing Formula**\n\`Total Cost × 2 = Wholesale Price\`\n\`Wholesale Price × 2 = Retail Price\`\n\n📊 **Calculate your Total Cost:**\n- Material cost (exact amount used)\n- + Your time × hourly rate (minimum ₹100/hour)\n- + Overheads (packaging, electricity, etc.)\n- + 20% profit margin\n\n⚡ **Common mistake:** Underpricing to compete. Quality products deserve quality prices!\n\n**Example:** Terracotta earrings\n- Materials: ₹40\n- Time (2 hrs × ₹100): ₹200\n- Overhead: ₹30\n- Total cost: ₹270\n- Retail price: ₹270 × 4 = ₹1,080\n\nDoes this help? 🌟`],
    default: [`Thank you for your question! I'm here to help with:\n\n💼 Business advice & startup guidance\n⚖️ Legal rights & compliance\n💰 Loans & financial planning\n📣 Marketing & social media\n🧠 Personal support & wellness\n\nCould you share more details about what you need? I want to give you the most helpful answer! 💜`, `That's a great question! Let me think through this with you.\n\nAs a women's empowerment platform, we're here to support you on your journey. Whether it's business, personal challenges, or navigating systems that weren't built for us – we've got your back.\n\nCould you tell me a bit more about your situation? 🌸`],
};

function getAIResponse(message) {
    const lower = message.toLowerCase();
    if (lower.includes('start') && lower.includes('business')) return AI_RESPONSES.business[Math.floor(Math.random() * AI_RESPONSES.business.length)];
    if (lower.includes('market') || lower.includes('instagram') || lower.includes('social media')) return AI_RESPONSES.marketing[0];
    if (lower.includes('legal') || lower.includes('right')) return AI_RESPONSES.legal[0];
    if (lower.includes('loan') || lower.includes('fund') || lower.includes('money')) return AI_RESPONSES.loan[0];
    if (lower.includes('overwhelm') || lower.includes('stress') || lower.includes('anxious') || lower.includes('sad') || lower.includes('help me')) return AI_RESPONSES.emotional[0];
    if (lower.includes('price') || lower.includes('pricing') || lower.includes('how much')) return AI_RESPONSES.pricing[0];
    return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)];
}

function parseMarkdown(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.+?)`/g, '<code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded text-purple-700 dark:text-purple-300 text-xs">$1</code>')
        .replace(/\n/g, '<br/>');
}

export default function AIChatPage() {
    const { dark } = useTheme();
    const { user } = useAuth();
    const [messages, setMessages] = useState([
        { id: 1, role: 'ai', content: `Hi ${user?.name?.split(' ')[0] || 'there'}! 👋 I'm Priya, your AI business and empowerment assistant.\n\nI can help you with:\n💼 Business advice & planning\n⚖️ Legal rights & compliance\n💰 Loans & funding\n📣 Marketing strategies\n🧠 Personal support\n\nWhat would you like to talk about today? 🌸`, time: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    const sendMessage = async (text) => {
        const msg = text || input.trim();
        if (!msg) return;
        setInput('');
        setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: msg, time: new Date() }]);
        setTyping(true);
        await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
        const response = getAIResponse(msg);
        setTyping(false);
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', content: response, time: new Date() }]);
    };

    const handleKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

    const clearChat = () => {
        setMessages([{ id: 1, role: 'ai', content: 'Chat cleared! How can I help you today? 🌸', time: new Date() }]);
    };

    return (
        <div className={`min-h-screen flex flex-col ${dark ? 'bg-slate-950' : 'bg-gradient-to-br from-purple-50/40 to-teal-50/40'}`}>
            {/* Header */}
            <div className={`border-b px-6 py-4 flex items-center justify-between ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <Bot size={22} className="text-white" />
                    </div>
                    <div>
                        <h1 className={`font-bold text-lg ${dark ? 'text-white' : 'text-slate-800'}`}>Priya – AI Assistant ✨</h1>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Always available</span>
                        </div>
                    </div>
                </div>
                <button onClick={clearChat} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${dark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-purple-50'}`}>
                    <RefreshCw size={14} />Clear
                </button>
            </div>

            {/* Quick prompts */}
            <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
                {QUICK_PROMPTS.map(p => (
                    <button key={p} onClick={() => sendMessage(p.slice(3))}
                        className={`shrink-0 px-3 py-2 rounded-full text-xs font-medium transition-all hover:scale-105 ${dark ? 'bg-slate-900 text-slate-300 border border-slate-700 hover:border-purple-500' : 'bg-white text-slate-600 border border-purple-100 hover:border-purple-400'}`}>
                        {p}
                    </button>
                ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                <AnimatePresence>
                    {messages.map(msg => (
                        <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'gradient-primary' : dark ? 'bg-slate-700' : 'bg-purple-100'}`}>
                                {msg.role === 'ai' ? <Bot size={16} className="text-white" /> : <User size={16} className={dark ? 'text-white' : 'text-purple-600'} />}
                            </div>
                            <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'ai'
                                ? dark ? 'bg-slate-900 text-slate-200 border border-slate-800' : 'bg-white text-slate-700 border border-purple-100 shadow-sm'
                                : 'gradient-primary text-white'
                                }`}>
                                <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }} />
                                <p className={`text-xs mt-2 ${msg.role === 'ai' ? dark ? 'text-slate-500' : 'text-slate-400' : 'text-white/70'}`}>
                                    {msg.time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing indicator */}
                <AnimatePresence>
                    {typing && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex gap-3">
                            <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
                                <Bot size={16} className="text-white" />
                            </div>
                            <div className={`px-4 py-3 rounded-2xl border ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                                <div className="flex gap-1.5 items-center h-5">
                                    {[0, 1, 2].map(i => (
                                        <motion.div key={i} className="w-2 h-2 bg-purple-500 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className={`border-t p-4 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'}`}>
                <div className={`flex items-end gap-3 rounded-2xl border px-4 py-3 ${dark ? 'bg-slate-800 border-slate-700' : 'bg-purple-50 border-purple-100'}`}>
                    <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey} rows={1} placeholder="Ask anything about business, legal, or personal growth..."
                        className={`flex-1 resize-none outline-none text-sm bg-transparent leading-relaxed max-h-32 ${dark ? 'text-white placeholder-slate-500' : 'text-slate-800 placeholder-slate-400'}`} />
                    <motion.button onClick={() => sendMessage()} whileTap={{ scale: 0.9 }} disabled={!input.trim() || typing}
                        className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shrink-0 disabled:opacity-50 shadow-md">
                        <Send size={16} className="text-white" />
                    </motion.button>
                </div>
                <p className={`text-center text-xs mt-2 ${dark ? 'text-slate-600' : 'text-slate-400'}`}><Sparkles size={10} className="inline" /> AI responses are for guidance only. Consult professionals for legal/medical advice.</p>
            </div>
        </div>
    );
}
