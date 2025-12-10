import React from 'react';
import BoatCard from './BoatCard';
import fleetData from '../data/fleet.json';

const FleetGrid = ({ onBook }) => {
    return (
        <section id="fleet" className="py-24 bg-navy relative">
            {/* Decorative bg */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-gold uppercase tracking-[0.2em] text-sm font-bold mb-3">Our Fleet</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white font-serif">Exquisite Yachts</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {fleetData.map((boat) => (
                        <BoatCard key={boat.id} boat={boat} onBook={onBook} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FleetGrid;
