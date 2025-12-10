import React, { useState, useEffect } from 'react';
import { useCity } from '../context/CityContext';
import { useData } from '../context/DataContext';
import fleetData from '../data/fleet.json';
import { ChevronRight, Check, X, Users, Ruler, Gauge, Calendar, MapPin, User, Mail } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const BookingForm = ({ selectedYachtId, isOpen, onClose }) => {
    const { currentCityId, cities } = useCity();
    const { addBooking } = useData();
    const { formatPrice, convertPrice } = useCurrency();
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Initialize form with defaults
    const [formData, setFormData] = useState({
        city: currentCityId,
        boatId: '',
        date: '',
        guests: 2,
        email: '',
        name: ''
    });

    const selectedBoat = fleetData.find(b => b.id === formData.boatId);

    // Effect to update formData when selectedYachtId changes or modal opens
    useEffect(() => {
        if (selectedYachtId) {
            setFormData(prev => ({
                ...prev,
                boatId: selectedYachtId
            }));
        }
    }, [selectedYachtId]);

    // Reset when modal closes or opens
    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setIsSubmitted(false);
        }
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        addBooking(formData);
        setIsSubmitted(true);
    };

    const handleClose = () => {
        onClose();
        // short timeout to clear state after animation could go here, but simple is fine
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-navy/90 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={handleClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-5xl bg-navy border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 max-h-[90vh]">

                {/* Close Button Mobile */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 md:hidden p-2 bg-black/20 rounded-full text-white"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Side: Yacht Details (Visible if boat selected, otherwise City/General) */}
                <div className="w-full md:w-2/5 bg-slate-900 border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden group">
                    {selectedBoat ? (
                        <>
                            <div className="absolute inset-0">
                                <img
                                    src={selectedBoat.image}
                                    alt={selectedBoat.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent"></div>
                            </div>

                            <div className="relative h-full p-8 flex flex-col justify-end z-10">
                                <h3 className="text-gold uppercase tracking-widest text-xs font-bold mb-2">Selected Yacht</h3>
                                <h2 className="text-3xl font-bold text-white font-serif mb-4">{selectedBoat.name}</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-3 text-white/80 text-sm">
                                        <div className="p-2 bg-white/10 rounded-lg"><Users className="w-4 h-4 text-gold" /></div>
                                        <span>Capacity: {selectedBoat.capacity} Guests</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/80 text-sm">
                                        <div className="p-2 bg-white/10 rounded-lg"><Ruler className="w-4 h-4 text-gold" /></div>
                                        <span>Length: {selectedBoat.length}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/80 text-sm">
                                        <div className="p-2 bg-white/10 rounded-lg"><Gauge className="w-4 h-4 text-gold" /></div>
                                        <span>Speed: {selectedBoat.speed}</span>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-4">
                                    <p className="text-white/60 text-xs mb-1">Daily Rate</p>
                                    <p className="text-2xl font-bold text-gold">{formatPrice(convertPrice(selectedBoat.priceUSD))}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        // Fallback if no specific boat selected yet (e.g. if we allowed opening generic enquiry)
                        <div className="h-full p-8 flex flex-col justify-center items-center text-center relative">
                            <div className="absolute inset-0 bg-navy"></div>
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold text-white font-serif mb-4">Luxury Experience</h2>
                                <p className="text-white/60">Select a yacht to begin your journey.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Form */}
                <div className="flex-1 bg-navy/50 backdrop-blur-xl p-6 md:p-8 overflow-y-auto relative">
                    {/* Close Button Desktop */}
                    <button
                        onClick={handleClose}
                        className="hidden md:flex absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {isSubmitted ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12">
                            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                                <Check className="w-10 h-10 text-gold" />
                            </div>
                            <h3 className="text-3xl font-bold text-white font-serif mb-4">Request Sent</h3>
                            <p className="text-white/70 max-w-md mx-auto mb-8 leading-relaxed">
                                Thank you, <span className="text-white font-bold">{formData.name}</span>. We have received your booking request for the <span className="text-gold">{selectedBoat?.name}</span>. Our concierge team will contact you securely at <span className="text-white">{formData.email}</span>.
                            </p>
                            <button
                                onClick={handleClose}
                                className="px-8 py-3 bg-gold hover:bg-[#b08f26] text-navy font-bold rounded-lg transition-colors uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                            >
                                Close Window
                            </button>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white font-serif mb-2">Complete Your Reservation</h3>
                                <p className="text-white/50 text-sm">Step {step} of 2 • {step === 1 ? 'Details' : 'Contact Info'}</p>
                                <div className="w-full bg-white/5 h-1 mt-4 rounded-full overflow-hidden">
                                    <div className={`h-full bg-gold transition-all duration-500 ease-out ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                                {step === 1 && (
                                    <div className="space-y-6 flex-1 animate-in slide-in-from-right-8 fade-in">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-gold text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" /> City
                                                </label>
                                                <select
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors appearance-none"
                                                >
                                                    {Object.values(cities).map(city => (
                                                        <option key={city.id} value={city.id} className="bg-navy">{city.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-gold text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" /> Date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors [color-scheme:dark]"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-gold text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <Users className="w-4 h-4" /> Guests
                                                </label>
                                                <input
                                                    type="number"
                                                    name="guests"
                                                    min="1"
                                                    max={selectedBoat?.capacity || 20}
                                                    value={formData.guests}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-6">
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                disabled={!formData.date}
                                                className="w-full bg-gold hover:bg-[#b08f26] text-navy font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                                            >
                                                Continue <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6 flex-1 animate-in slide-in-from-right-8 fade-in">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-gold text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <User className="w-4 h-4" /> Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-gold text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <Mail className="w-4 h-4" /> Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                                                    placeholder="john@example.com"
                                                />
                                            </div>

                                            <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                                                <h4 className="text-white text-sm font-bold mb-2">Summary</h4>
                                                <div className="flex justify-between text-xs text-white/60 mb-1">
                                                    <span>Yacht</span>
                                                    <span className="text-white">{selectedBoat?.name}</span>
                                                </div>
                                                <div className="flex justify-between text-xs text-white/60 mb-1">
                                                    <span>Date</span>
                                                    <span className="text-white">{formData.date}</span>
                                                </div>
                                                <div className="flex justify-between text-xs text-white/60">
                                                    <span>Guests</span>
                                                    <span className="text-white">{formData.guests} people</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-6 flex gap-3">
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="flex-1 bg-white/5 text-white font-bold py-4 rounded-lg hover:bg-white/10 transition-colors"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-[2] bg-gold hover:bg-[#b08f26] text-navy font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                                            >
                                                Confirm Booking <Check className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingForm;


