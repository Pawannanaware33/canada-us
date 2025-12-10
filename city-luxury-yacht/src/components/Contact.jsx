import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact = () => {
    const { addMessage } = useData();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addMessage(formData);
        alert('Message Sent! We will get back to you shortly.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="py-24 bg-navy relative">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-gold uppercase tracking-[0.2em] text-sm font-bold mb-3">Get in Touch</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white font-serif mb-6">Contact Us</h3>
                    <p className="text-white/60 text-lg font-light">
                        Have a custom request or need more information? Our concierge team is here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                <Phone className="w-6 h-6 text-gold" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Phone</h4>
                                <p className="text-white/60">+1 (888) 555-0123</p>
                                <p className="text-white/40 text-sm mt-1">Mon-Sun 9am-9pm EST</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                <Mail className="w-6 h-6 text-gold" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Email</h4>
                                <p className="text-white/60">concierge@city-luxury.com</p>
                                <p className="text-white/40 text-sm mt-1">24/7 Response Time</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                <MapPin className="w-6 h-6 text-gold" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Headquarters</h4>
                                <p className="text-white/60">
                                    100 Luxury Marina Blvd<br />
                                    Miami, FL 33132
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gold text-xs font-bold uppercase tracking-wider mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors placeholder:text-white/20"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div>
                                <label className="block text-gold text-xs font-bold uppercase tracking-wider mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors placeholder:text-white/20"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-gold text-xs font-bold uppercase tracking-wider mb-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="3"
                                    className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors placeholder:text-white/20 resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gold hover:bg-[#b08f26] text-navy font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                Send Message <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
