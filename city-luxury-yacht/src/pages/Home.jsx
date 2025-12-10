import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FleetGrid from '../components/FleetGrid';
import Routes from '../components/Routes';
import BookingForm from '../components/BookingForm';
import { About, FAQ } from '../components/InfoSections';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
    const [selectedYachtId, setSelectedYachtId] = React.useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);

    const handleBooking = (boatId) => {
        setSelectedYachtId(boatId);
        setIsBookingModalOpen(true);
    };

    return (
        <div className="bg-navy min-h-screen text-slate-800 font-sans selection:bg-gold selection:text-navy scroll-smooth">
            <Header />
            <Hero />
            <FleetGrid onBook={handleBooking} />
            <Routes />
            <About />
            <FAQ />
            <BookingForm
                selectedYachtId={selectedYachtId}
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
            />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;
