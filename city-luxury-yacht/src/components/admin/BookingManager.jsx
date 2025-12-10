import React from 'react';
import { Check, X, Calendar, Users, MapPin, Anchor } from 'lucide-react';
import { useData } from '../../context/DataContext';
import fleetData from '../../data/fleet.json';

const BookingManager = () => {
    const { bookings, updateBookingStatus } = useData();
    const [filter, setFilter] = React.useState('all');

    const filteredBookings = bookings.filter(b => {
        if (filter === 'all') return true;
        return b.status === filter;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white font-serif">Booking Requests</h2>
                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                    {['all', 'pending', 'confirmed', 'rejected'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-md text-sm font-bold capitalize transition-colors ${filter === status ? 'bg-gold text-navy' : 'text-white/60 hover:text-white'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4">
                {filteredBookings.length === 0 ? (
                    <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white/40">No bookings found</p>
                    </div>
                ) : (
                    filteredBookings.map(booking => {
                        const boat = fleetData.find(b => b.id === booking.boatId);

                        return (
                            <div key={booking.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-gold/30 transition-colors">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Yacht Image */}
                                    {boat && (
                                        <div className="w-full md:w-48 h-32 shrink-0 rounded-lg overflow-hidden relative border border-white/10">
                                            <img
                                                src={boat.image}
                                                alt={boat.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
                                        </div>
                                    )}

                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                                                    booking.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                                        'bg-gold/20 text-gold'
                                                }`}>
                                                {booking.status}
                                            </span>
                                            <span className="text-white/60 text-sm">{new Date(booking.timestamp).toLocaleDateString()}</span>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{booking.name}</h3>
                                            <a href={`mailto:${booking.email}`} className="text-gold hover:underline font-medium">{booking.email}</a>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/80">
                                            <div className="flex items-center gap-2">
                                                <Anchor className="w-4 h-4 text-gold" />
                                                <span className="font-bold">{boat?.name || 'Unknown Yacht'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gold" />
                                                {booking.date}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-gold" />
                                                {booking.guests} Guests
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-gold" />
                                                <span className="uppercase">{booking.city}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {booking.status === 'pending' && (
                                        <div className="flex md:flex-col items-center gap-3 self-start md:self-center">
                                            <button
                                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                                className="p-3 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg border border-green-500/20 transition-colors"
                                                title="Approve"
                                            >
                                                <Check className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={() => updateBookingStatus(booking.id, 'rejected')}
                                                className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg border border-red-500/20 transition-colors"
                                                title="Reject"
                                            >
                                                <X className="w-6 h-6" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default BookingManager;
