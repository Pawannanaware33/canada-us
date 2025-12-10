import React from 'react';
import { Mail, Clock, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

const MessageViewer = () => {
    const { messages, deleteMessage } = useData();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white font-serif">Inbox</h2>

            <div className="grid gap-4">
                {messages.length === 0 ? (
                    <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white/40">No messages found</p>
                    </div>
                ) : (
                    messages.map(msg => (
                        <div key={msg.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-gold/30 transition-colors relative group">
                            <button
                                onClick={() => deleteMessage(msg.id)}
                                className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20"
                                title="Delete Message"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="flex justify-between items-start mb-4 pr-12">
                                <div>
                                    <h3 className="text-lg font-bold text-white">{msg.name}</h3>
                                    <a href={`mailto:${msg.email}`} className="text-gold text-sm hover:underline">{msg.email}</a>
                                </div>
                                <div className="flex items-center gap-2 text-white/40 text-xs">
                                    <Clock className="w-3 h-3" />
                                    {new Date(msg.timestamp).toLocaleString()}
                                </div>
                            </div>
                            <div className="bg-navy/30 rounded-lg p-4 border border-white/5">
                                <p className="text-white/80 leading-relaxed text-sm">{msg.message}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MessageViewer;
