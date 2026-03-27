import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Facebook, Mail, Phone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
    const { dark } = useTheme();
    return (
        <footer className={`${dark ? 'bg-slate-950 border-purple-900' : 'bg-gradient-to-br from-purple-950 to-teal-900'} text-white border-t mt-auto`}>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xl">E</div>
                            <span className="font-bold text-xl">EmpowerHer</span>
                        </div>
                        <p className="text-purple-200 text-sm leading-relaxed">
                            Empowering women through community, technology, and opportunity. Together we rise.
                        </p>
                        <div className="flex gap-3 mt-4">
                            {[Instagram, Twitter, Facebook].map((Icon, i) => (
                                <a key={i} href="#" aria-label="Social Link" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-purple-200">Platform</h4>
                        <ul className="space-y-2 text-sm text-purple-300">
                            {['Groups', 'Events', 'Marketplace', 'Mentorship', 'Safety', 'AI Assistant'].map(item => (
                                <li key={item}><Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors">{item}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-purple-200">Company</h4>
                        <ul className="space-y-2 text-sm text-purple-300">
                            {['About Us', 'Blog', 'Privacy Policy', 'Terms of Service', 'Contact'].map(item => (
                                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-purple-200">Contact</h4>
                        <ul className="space-y-3 text-sm text-purple-300">
                            <li className="flex items-center gap-2"><Mail size={15} /><a href="mailto:hello@empowerher.app" className="hover:text-white">hello@empowerher.app</a></li>
                            <li className="flex items-center gap-2"><Phone size={15} /><span>+1 (800) EMPOWER</span></li>
                        </ul>
                        <div className="mt-4 p-3 rounded-xl bg-white/10">
                            <p className="text-xs text-purple-200">🔒 Your data is safe with E2E encryption and GDPR compliance.</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-purple-300">© 2026 EmpowerHer. All rights reserved.</p>
                    <p className="text-sm text-purple-300 flex items-center gap-1">Made with <Heart size={13} className="text-red-400 fill-red-400" /> for women worldwide</p>
                </div>
            </div>
        </footer>
    );
}
