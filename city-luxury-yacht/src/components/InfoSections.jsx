import React from 'react';
import { Shield, Anchor, Star, HelpCircle, ChevronDown } from 'lucide-react';

export const About = () => {
    return (
        <section id="about" className="py-24 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-gold uppercase tracking-[0.2em] text-sm font-bold mb-3">About Us</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-navy font-serif mb-6">The City-Luxury Standard</h3>
                    <p className="text-slate-600 text-lg font-light leading-relaxed">
                        Founded on the belief that the best way to see a city is from the water, we provide
                        premium yacht charters in North America's most iconic destinations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
                        <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-8 h-8 text-gold" />
                        </div>
                        <h4 className="text-xl font-bold text-navy mb-4">Safety First</h4>
                        <p className="text-slate-600">
                            All our vessels are certified and maintained to the highest standards. Your safety is our obsession.
                        </p>
                    </div>
                    <div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
                        <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Anchor className="w-8 h-8 text-gold" />
                        </div>
                        <h4 className="text-xl font-bold text-navy mb-4">Premium Fleet</h4>
                        <p className="text-slate-600">
                            Hand-picked yachts that offer the perfect blend of performance, style, and comfort.
                        </p>
                    </div>
                    <div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
                        <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Star className="w-8 h-8 text-gold" />
                        </div>
                        <h4 className="text-xl font-bold text-navy mb-4">5-Star Service</h4>
                        <p className="text-slate-600">
                            From the moment you book until you step off the dock, our team ensures a seamless experience.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const FAQ = () => {
    const faqs = [
        { q: "What's included in the charter price?", a: "The base price includes the yacht, captain, and fuel for standard routes. Gratuity, catering, and port fees are extra." },
        { q: "Can we bring our own food and drinks?", a: "Yes, you are welcome to bring your own provisions. We also offer catering packages upon request." },
        { q: "What happens if the weather is bad?", a: "We monitor weather closely. If conditions are unsafe, we will reschedule your charter or offer a full refund." },
        { q: "Is a deposit required?", a: "A 50% deposit is required to secure your booking, with the remainder due 7 days prior to departure." },
    ];

    return (
        <section id="faq" className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-gold uppercase tracking-[0.2em] text-sm font-bold mb-3">FAQ</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-navy font-serif mb-6">Common Questions</h3>
                </div>

                <div className="space-y-4">
                    {faqs.map((item, i) => (
                        <details key={i} className="group bg-white rounded-xl border border-slate-200 open:shadow-lg transition-all duration-300">
                            <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-navy select-none">
                                {item.q}
                                <ChevronDown className="w-5 h-5 text-gold group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};
