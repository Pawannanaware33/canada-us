import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, MessageSquare, LogOut, Anchor, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import BookingManager from '../components/admin/BookingManager';
import MessageViewer from '../components/admin/MessageViewer';
import CalendarView from '../components/admin/CalendarView';
import DashboardCard from '../components/admin/DashboardCard';

const Admin = () => {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Admin View State
    const [view, setView] = useState('bookings');
    const { bookings, messages } = useData();

    useEffect(() => {
        const token = localStorage.getItem('city_luxury_admin_token');
        if (token === 'authenticated') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin123') {
            setIsAuthenticated(true);
            localStorage.setItem('city_luxury_admin_token', 'authenticated');
            setLoginError('');
        } else {
            setLoginError('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('city_luxury_admin_token');
        setUsername('');
        setPassword('');
    };

    const pendingBookings = bookings.filter(b => b.status === 'pending').length;

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center p-4 text-slate-200 selection:bg-gold selection:text-navy">
                <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-500">
                    <div className="text-center mb-8">
                        <Anchor className="w-12 h-12 text-gold mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-white font-serif mb-2">Admin Portal</h1>
                        <p className="text-white/50">Enter your credentials to access the dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-gold text-xs font-bold uppercase tracking-wider mb-2">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-navy/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-gold outline-none transition-colors"
                                    placeholder="admin"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gold text-xs font-bold uppercase tracking-wider mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-navy/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-gold outline-none transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {loginError && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                                {loginError}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gold hover:bg-[#b08f26] text-navy font-bold py-3 rounded-lg transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Authenticated Dashboard
    return (
        <div className="min-h-screen bg-navy text-slate-200 font-sans selection:bg-gold selection:text-navy flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-navy/95 backdrop-blur-xl flex flex-col sticky top-0 h-screen z-20 shrink-0">
                <div className="p-6 border-b border-white/10">
                    <Link to="/" className="flex items-center gap-2 text-white hover:text-gold transition-colors">
                        <Anchor className="w-6 h-6 text-gold" />
                        <span className="font-serif font-bold tracking-wider">CITY LUXURY</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setView('dashboard')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${view === 'dashboard' ? 'bg-gold text-navy font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </button>
                    <button
                        onClick={() => setView('bookings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${view === 'bookings' ? 'bg-gold text-navy font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Calendar className="w-5 h-5" />
                        Bookings
                        {pendingBookings > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{pendingBookings}</span>
                        )}
                    </button>
                    <button
                        onClick={() => setView('calendar')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${view === 'calendar' ? 'bg-gold text-navy font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Calendar className="w-5 h-5" />
                        Calendar
                    </button>
                    <button
                        onClick={() => setView('messages')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${view === 'messages' ? 'bg-gold text-navy font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <MessageSquare className="w-5 h-5" />
                        Messages
                        {messages.length > 0 && (
                            <span className="ml-auto bg-white/10 px-2 py-0.5 rounded-full text-xs">{messages.length}</span>
                        )}
                    </button>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                    >
                        <LogOut className="w-5 h-5" />
                        Exit Admin
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-12 min-w-0">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-white font-serif mb-2">
                            {view === 'dashboard' && 'Dashboard Overview'}
                            {view === 'bookings' && 'Booking Management'}
                            {view === 'calendar' && 'Booking Calendar'}
                            {view === 'messages' && 'Message Center'}
                        </h1>
                        <p className="text-white/50">Welcome back, Admin</p>
                    </div>
                </header>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {view === 'dashboard' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <DashboardCard
                                title="Total Requests"
                                value={bookings.length}
                                icon={Calendar}
                                color="blue"
                            />
                            <DashboardCard
                                title="Pending"
                                value={pendingBookings}
                                icon={Calendar}
                                color="gold"
                            />
                            <DashboardCard
                                title="Total Messages"
                                value={messages.length}
                                icon={MessageSquare}
                                color="green"
                            />
                        </div>
                    )}

                    {view === 'bookings' && <BookingManager />}

                    {view === 'calendar' && <CalendarView />}

                    {view === 'messages' && <MessageViewer />}
                </div>
            </main>
        </div>
    );
};

export default Admin;
