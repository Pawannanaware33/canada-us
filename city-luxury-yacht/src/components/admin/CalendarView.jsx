import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useData } from '../../context/DataContext';
import fleetData from '../../data/fleet.json';

const CalendarView = () => {
    const { bookings } = useData();
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const getBookingsForDate = (day) => {
        return bookings.filter(b => {
            const bookingDate = new Date(b.date);
            // Fix timezone offset issue by comparing date strings or using UTC
            // Simple comparison assuming YYYY-MM-DD string from input matches
            const currentMonthStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
            const targetDateStr = `${currentMonthStr}-${String(day).padStart(2, '0')}`;
            return b.date === targetDateStr;
        });
    };

    const renderCalendarDays = () => {
        const days = [];
        const totalSlots = firstDayOfMonth + daysInMonth;
        const rows = Math.ceil(totalSlots / 7);

        for (let i = 0; i < rows * 7; i++) {
            const dayNumber = i - firstDayOfMonth + 1;
            const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;

            if (!isCurrentMonth) {
                days.push(
                    <div key={`empty-${i}`} className="h-24 bg-navy/20 border border-white/5 opacity-50"></div>
                );
                continue;
            }

            const dayBookings = getBookingsForDate(dayNumber);
            const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber).toDateString();

            days.push(
                <div key={dayNumber} className={`h-24 border border-white/10 p-1 relative group hover:bg-white/5 transition-colors ${isToday ? 'bg-gold/5' : 'bg-navy/40'}`}>
                    <span className={`text-xs font-bold ${isToday ? 'text-gold' : 'text-white/60'} absolute top-1 right-2`}>
                        {dayNumber}
                    </span>

                    <div className="mt-4 space-y-1 overflow-y-auto max-h-[calc(100%-16px)] custom-scrollbar">
                        {dayBookings.map(booking => {
                            const boat = fleetData.find(b => b.id === booking.boatId);
                            return (
                                <div
                                    key={booking.id}
                                    className={`px-2 py-1 rounded text-xs truncate border ${booking.status === 'confirmed' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                                            booking.status === 'rejected' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                                                'bg-gold/10 border-gold/30 text-gold'
                                        }`}
                                    title={`${boat?.name || 'Yacht'} - ${booking.name}`}
                                >
                                    {boat?.name || 'Yacht'}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        return days;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white font-serif flex items-center gap-3">
                    <CalendarIcon className="w-6 h-6 text-gold" />
                    Calendar
                </h2>

                <div className="flex items-center gap-4 bg-white/5 rounded-lg p-1 border border-white/10">
                    <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-md text-white transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-white font-bold w-40 text-center select-none">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-md text-white transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="bg-navy/30 rounded-xl border border-white/10 overflow-hidden">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 bg-white/5 border-b border-white/10">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="py-3 text-center text-xs font-bold uppercase tracking-wider text-gold">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 bg-navy/50">
                    {renderCalendarDays()}
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
