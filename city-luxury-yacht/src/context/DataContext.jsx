import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    const [bookings, setBookings] = useState(() => {
        const saved = localStorage.getItem('yacht_bookings');
        return saved ? JSON.parse(saved) : [];
    });

    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('yacht_messages');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('yacht_bookings', JSON.stringify(bookings));
    }, [bookings]);

    useEffect(() => {
        localStorage.setItem('yacht_messages', JSON.stringify(messages));
    }, [messages]);

    const addBooking = (booking) => {
        const newBooking = {
            id: Date.now().toString(),
            status: 'pending',
            timestamp: new Date().toISOString(),
            ...booking
        };
        setBookings(prev => [newBooking, ...prev]);
        return newBooking;
    };

    const updateBookingStatus = (id, status) => {
        setBookings(prev => prev.map(booking =>
            booking.id === id ? { ...booking, status } : booking
        ));
    };

    const addMessage = (message) => {
        const newMessage = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...message
        };
        setMessages(prev => [newMessage, ...prev]);
        return newMessage;
    };

    const deleteMessage = (id) => {
        setMessages(prev => prev.filter(msg => msg.id !== id));
    };

    return (
        <DataContext.Provider value={{
            bookings,
            addBooking,
            updateBookingStatus,
            messages,
            addMessage,
            deleteMessage
        }}>
            {children}
        </DataContext.Provider>
    );
};
