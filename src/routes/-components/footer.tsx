import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative border-t border-white/10 text-white">
            <div className="absolute bottom-0 left-0 w-full h-[45%] bg-purple-900/20 blur-3xl -z-10"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-xl font-bold">Lanesense</h3>
                        <p className="text-white/60 mt-2 text-sm">
                            Open-source Level 2 autonomy for the real world.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white/80 tracking-wider uppercase text-sm">Links</h4>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link></li>
                            <li>
                                <button
                                    onClick={() => {
                                        const element = document.getElementById('early-access');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
                                >
                                    Early Access
                                </button>
                            </li>
                            <li><Link to="about" className="text-sm text-white/60 hover:text-white transition-colors">About</Link></li>
                            <li><Link to="blog" className="text-sm text-white/60 hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white/80 tracking-wider uppercase text-sm">Find Us</h4>
                        <div className="flex mt-4 space-x-4">
                            <a href="#" aria-label="Twitter" className="text-white/60 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" aria-label="Github" className="text-white/60 hover:text-white transition-colors"><Github size={20} /></a>
                            <a href="#" aria-label="LinkedIn" className="text-white/60 hover:text-white transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white/80 tracking-wider uppercase text-sm">Legal</h4>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="privacy-policy" className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="terms" className="text-sm text-white/60 hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-white/50">
                    <p>&copy; {new Date().getFullYear()} LanesenseAI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}