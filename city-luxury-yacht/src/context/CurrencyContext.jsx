import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState('USD');
    const exchangeRate = 1.35; // 1 USD = 1.35 CAD

    const toggleCurrency = () => {
        setCurrency((prev) => (prev === 'USD' ? 'CAD' : 'USD'));
    };

    const convertPrice = (priceUSD) => {
        return currency === 'USD'
            ? priceUSD
            : Math.round(priceUSD * exchangeRate);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <CurrencyContext.Provider value={{ currency, toggleCurrency, convertPrice, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => useContext(CurrencyContext);
