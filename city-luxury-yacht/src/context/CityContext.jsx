import React, { createContext, useContext, useState } from 'react';
import citiesData from '../data/cities.json';

const CityContext = createContext();

export const CityProvider = ({ children }) => {
    const [currentCityId, setCurrentCityId] = useState('miami');

    const currentCity = citiesData[currentCityId];

    return (
        <CityContext.Provider value={{ currentCityId, setCurrentCityId, currentCity, cities: citiesData }}>
            {children}
        </CityContext.Provider>
    );
};

export const useCity = () => useContext(CityContext);
