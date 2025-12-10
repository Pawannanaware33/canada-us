import React from 'react';
import { useCity } from '../context/CityContext';
import { MapPin } from 'lucide-react';

const Routes = () => {
    const { currentCity } = useCity();

    return (
        <section id="routes" className="py-24 bg-navy relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-navy to-transparent z-10" />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6 relative z-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-gold uppercase tracking-[0.2em] text-sm font-bold mb-3">Curated Journeys</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-white font-serif mb-6">{currentCity.name} Highlights</h3>
                        <p className="text-white/60 text-lg font-light leading-relaxed">
                            Discover the most breathtaking views and hidden gems of {currentCity.name}.
                            Our captains know exactly where to take you for the perfect experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {currentCity.highlights.map((highlight, index) => (
                            <div
                                key={index}
                                className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-gold/30 hover:shadow-2xl"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <MapPin className="w-24 h-24 text-gold" />
                                </div>

                                <h4 className="text-2xl font-bold text-white mb-4 font-serif">{highlight.title}</h4>
                                <p className="text-white/70 leading-relaxed mb-6">
                                    {highlight.desc}
                                </p>

                                <div className="w-12 h-0.5 bg-gold/50 group-hover:w-24 transition-all duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Routes;
