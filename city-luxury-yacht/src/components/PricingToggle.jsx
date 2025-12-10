import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

const PricingToggle = () => {
    const { currency, toggleCurrency } = useCurrency();

    return (
        <button
            onClick={toggleCurrency}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-all text-sm font-medium text-white backdrop-blur-md"
            aria-label="Toggle currency"
        >
            <span className={currency === 'USD' ? 'text-gold' : 'text-white/60'}>USD</span>
            <span className="text-white/40">/</span>
            <span className={currency === 'CAD' ? 'text-gold' : 'text-white/60'}>CAD</span>
        </button>
    );
};

export default PricingToggle;
