import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Landmark, Shield, Clock, TrendingUp, Info, ArrowUpRight, CheckCircle, Lock, Download, FileText } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function VaultDetailModal({ isOpen, onClose, vault, onExecute }) {
    if (!isOpen || !vault) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    className="relative w-full max-w-4xl bg-[#0F172A] border border-blue-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header Strip */}
                    <div className="bg-blue-600 px-6 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/90 text-[10px] font-black uppercase tracking-[0.2em]">
                            <Shield className="w-3 h-3" /> Institutional Grade Asset • Mantle Network Enforced
                        </div>
                        <CheckCircle className="w-3 h-3 text-white/90" />
                    </div>

                    <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                        {/* Sidebar/Stats Overview */}
                        <div className="lg:w-80 bg-white/5 border-r border-white/10 p-8 flex flex-col gap-8 overflow-y-auto">
                            <div className={cn("inline-flex p-4 rounded-2xl",
                                vault.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                                    vault.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                                        'bg-emerald-500/10 text-emerald-400'
                            )}>
                                <Landmark className="w-12 h-12" />
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="text-4xl font-black text-white font-display mb-1">{vault.apy}</div>
                                    <div className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Target Annual Yield</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                                    <div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Risk Rating</div>
                                        <div className="text-white font-bold">{vault.risk}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Liquidity</div>
                                        <div className="text-white font-bold">24h Exit</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto space-y-3">
                                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl space-y-2">
                                    <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Audit Status</div>
                                    <div className="text-xs text-white font-medium flex items-center gap-2">
                                        <CheckCircle className="w-3 h-3 text-emerald-500" /> Verified by Chainlink
                                    </div>
                                    <div className="text-xs text-white font-medium flex items-center gap-2">
                                        <CheckCircle className="w-3 h-3 text-emerald-500" /> Smart Account Locked
                                    </div>
                                </div>
                                <button
                                    onClick={onExecute}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest text-[10px]"
                                >
                                    Execute Allocation
                                </button>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar space-y-8">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <h2 className="text-3xl font-black text-white font-display uppercase tracking-tight">{vault.name}</h2>
                                    <p className="text-gray-400 text-sm font-mono tracking-tighter">Vault ID: SHIELD-PR-2026-{vault.symbol}</p>
                                </div>
                                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Performance Chart Placeholder */}
                            <div className="glass-card p-6 h-64 bg-black/40 border-white/5 flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Historical APR Trend</h3>
                                    <div className="flex gap-2">
                                        {['1W', '1M', '3M', 'YTD'].map(t => (
                                            <button key={t} className={cn("px-2 py-1 text-[10px] font-bold rounded", t === 'YTD' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white')}>
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-1 flex items-end gap-1 px-2 border-b border-white/10 pb-2">
                                    {Array.from({ length: 30 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 bg-blue-500/20 hover:bg-blue-500 rounded-t-sm transition-all h-[40%]"
                                            style={{ height: `${20 + Math.random() * 60}%` }}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between mt-2 text-[8px] font-black text-gray-600 uppercase tracking-widest">
                                    <span>01 JAN</span>
                                    <span>TODAY</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Investment Summary</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{vault.description}</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                            <span className="text-gray-500">Collateral Type</span>
                                            <span className="text-white font-medium">{vault.collateral}</span>
                                        </div>
                                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                            <span className="text-gray-500">Minimum Lock</span>
                                            <span className="text-white font-medium">None (24h Buffer)</span>
                                        </div>
                                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                            <span className="text-gray-500">Management Fee</span>
                                            <span className="text-white font-medium">0.15% Annually</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Compliance & Legal</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-blue-500/20 cursor-pointer transition-colors">
                                            <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
                                            <div>
                                                <div className="text-xs font-bold text-white tracking-wide uppercase">Offering Memorandum</div>
                                                <div className="text-[10px] text-gray-500">PDF • 4.2 MB</div>
                                            </div>
                                            <Download className="w-4 h-4 text-gray-600 ml-auto" />
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-blue-500/20 cursor-pointer transition-colors">
                                            <Clock className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
                                            <div>
                                                <div className="text-xs font-bold text-white tracking-wide uppercase">Redemption Policy</div>
                                                <div className="text-[10px] text-gray-500">T + 1 Settlement</div>
                                            </div>
                                            <Download className="w-4 h-4 text-gray-600 ml-auto" />
                                        </div>
                                        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                                            <div className="flex items-center gap-2 text-amber-500 text-[10px] font-black uppercase tracking-widest mb-1">
                                                <Info className="w-3 h-3" /> Note on Yield
                                            </div>
                                            <p className="text-[10px] text-amber-500/70 leading-relaxed font-medium">
                                                Yield is derived from underlying cash-flow assets and distributed daily to the connected Smart Account.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
