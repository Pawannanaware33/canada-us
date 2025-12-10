import React from 'react';
import { Users, Gauge, Ruler } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const BoatCard = ({ boat, onBook }) => {
    const { formatPrice, convertPrice } = useCurrency();

    return (
        <div className="group relative bg-navy/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-gold/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] flex flex-col h-full">
            {/* Image */}
            <div className="h-64 overflow-hidden relative">
                <img
                    src={boat.image}
                    alt={boat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy to-transparent">
                    <h3 className="text-xl font-bold text-white font-sans">{boat.name}</h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 mb-6 text-white/70 text-sm">
                    <div className="flex flex-col items-center gap-1 p-2 bg-white/5 rounded-lg">
                        <Users className="w-4 h-4 text-gold" />
                        <span>{boat.capacity}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 bg-white/5 rounded-lg">
                        <Ruler className="w-4 h-4 text-gold" />
                        <span>{boat.length}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 bg-white/5 rounded-lg">
                        <Gauge className="w-4 h-4 text-gold" />
                        <span>{boat.speed}</span>
                    </div>
                </div>

                <p className="text-white/60 text-sm mb-6 flex-1">
                    {boat.description}
                </p>

                {/* Pricing & CTA */}
                <div className="flex items-end justify-between mt-auto">
                    <div>
                        <p className="text-white/40 text-xs mb-1">Starting from</p>
                        <p className="text-2xl font-bold text-gold">
                            {formatPrice(convertPrice(boat.priceUSD))}
                            <span className="text-sm font-normal text-white/60">/day</span>
                        </p>
                    </div>
                    <button
                        onClick={() => onBook && onBook(boat.id)}
                        className="px-6 py-2 bg-white/10 hover:bg-gold hover:text-navy text-white text-sm font-bold uppercase tracking-wider rounded-sm transition-all border border-white/20 hover:border-gold"
                    >
                        Book
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoatCard;
