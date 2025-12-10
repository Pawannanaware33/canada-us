import React, { useState, useEffect } from 'react';
import { Menu, X, Anchor } from 'lucide-react';
import PricingToggle from './PricingToggle';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Fleet', href: '#fleet' },
        { name: 'Routes', href: '#routes' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const offsetTop = element.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-navy/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                {/* Logo */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
                >
                    <Anchor className="w-8 h-8 text-gold" />
                    <span className="text-xl font-bold tracking-wider font-sans">CITY<span className="text-gold">LUXURY</span></span>
                </button>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-white/80 hover:text-gold transition-all text-sm font-medium tracking-wide relative group py-2"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <PricingToggle />
                    <a
                        href="#booking"
                        onClick={(e) => handleNavClick(e, '#booking')}
                        className="px-6 py-2 bg-gold hover:bg-[#b08f26] text-navy font-bold rounded-sm transition-colors uppercase tracking-widest text-xs"
                    >
                        Book Now
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-navy/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top-4">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-white/80 hover:text-gold text-lg"
                                onClick={(e) => handleNavClick(e, link.href)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                    <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center text-white">
                            <span>Currency</span>
                            <PricingToggle />
                        </div>
                        <a
                            href="#booking"
                            className="w-full py-3 bg-gold text-navy font-bold text-center uppercase tracking-widest"
                            onClick={(e) => handleNavClick(e, '#booking')}
                        >
                            Book Now
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
