import React from 'react';
import { Anchor, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-navy text-white py-16 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Anchor className="w-6 h-6 text-gold" />
                            <span className="text-lg font-bold tracking-wider">CITY<span className="text-gold">LUXURY</span></span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Premium yacht charters across North America's most iconic waterfront cities. Experience the water in style.
                        </p>
                    </div>

                    {/* Locations */}
                    <div>
                        <h4 className="font-bold mb-4 text-gold">Locations</h4>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li>Miami, FL</li>
                            <li>New York City, NY</li>
                            <li>Vancouver, BC</li>
                            <li>Toronto, ON</li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold mb-4 text-gold">Company</h4>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><a href="#about" className="hover:text-white">About Us</a></li>
                            <li><a href="#fleet" className="hover:text-white">Our Fleet</a></li>
                            <li><a href="#routes" className="hover:text-white">Routes</a></li>
                            <li><a href="#contact" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-bold mb-4 text-gold">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-gold hover:text-navy transition-colors"><Instagram className="w-4 h-4" /></a>
                            <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-gold hover:text-navy transition-colors"><Facebook className="w-4 h-4" /></a>
                            <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-gold hover:text-navy transition-colors"><Twitter className="w-4 h-4" /></a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
                    <p>© {new Date().getFullYear()} City-Luxury Charters. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
