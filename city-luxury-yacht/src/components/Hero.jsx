import React from 'react';
import { useCity } from '../context/CityContext';
import CitySelector from './CitySelector';

const Hero = () => {
    const { currentCity } = useCity();

    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background with crossfade effect */}
            <div
                key={currentCity.id} // Forces re-render for animation if needed, or manage images array for smooth crossfade
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
                style={{
                    backgroundImage: `url(${currentCity.heroImage})`,
                }}
            >
                <div className="absolute inset-0 bg-navy/30 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-16">
                <h5 className="text-gold tracking-[0.2em] font-medium mb-4 uppercase text-sm animate-fade-in-up">
                    Premium Yacht Charters
                </h5>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg font-sans animate-fade-in-up delay-100">
                    {currentCity.heroText}
                </h1>

                <p className="text-xl text-white/90 font-light max-w-2xl mx-auto mb-10 drop-shadow-md animate-fade-in-up delay-200">
                    Experience the ultimate luxury on the water. Exclusive fleet, polished service, and unforgettable views.
                </p>

                <CitySelector />
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
                </div>
            </div>
        </div>
    );
};

export default Hero;
