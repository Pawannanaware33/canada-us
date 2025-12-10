import React from 'react';

const DashboardCard = ({ title, value, icon: Icon, color = 'gold' }) => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-white/60 text-sm font-bold uppercase tracking-wider">{title}</h3>
            <div className={`p-2 rounded-lg bg-${color}/10`}>
                <Icon className={`w-5 h-5 text-${color}`} />
            </div>
        </div>
        <div className="text-3xl font-bold text-white">{value}</div>
    </div>
);

export default DashboardCard;
