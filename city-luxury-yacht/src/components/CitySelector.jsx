import React from 'react';
import { useCity } from '../context/CityContext';

const CitySelector = () => {
    const { currentCityId, setCurrentCityId, cities } = useCity();

    return (
        <div className="flex flex-wrap justify-center gap-4 bg-navy/40 backdrop-blur-md p-2 rounded-full border border-white/10 w-fit mx-auto mt-8">
            {Object.values(cities).map((city) => (
                <button
                    key={city.id}
                    onClick={() => setCurrentCityId(city.id)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentCityId === city.id
                            ? 'bg-gold text-navy shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                >
                    {city.name}
                </button>
            ))}
        </div>
    );
};

export default CitySelector;
