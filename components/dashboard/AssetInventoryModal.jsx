import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Filter, TrendingUp, Wallet, ArrowUpRight, ShieldCheck, Download, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

const ASSET_DATA = [
    {
        name: 'US Treasury Bill (3M)',
        unit: 'S-BILL',
        amount: '15,000.00',
        value: '14,850,000.00',
        apy: '5.2%',
        allocation: '34.6%',
        risk: 'Risk-Free',
        oracle: 'Chainlink (Live)',
        liquidity: '92% Liquid'
    },
    {
        name: 'Corp Bond (Apple)',
        unit: 'S-TECH',
        amount: '5,000.00',
        value: '4,950,000.00',
        apy: '6.1%',
        allocation: '11.5%',
        risk: 'Low',
        oracle: 'Pyth Network',
        liquidity: '85% Liquid'
    },
    {
        name: 'Invoice Pool #4',
        unit: 'S-INV4',
        amount: '800.00',
        value: '8,000,000.00',
        apy: '11.5%',
        allocation: '18.6%',
        risk: 'Medium',
        oracle: 'Trabal attestation',
        liquidity: '45% Liquid'
    },
    {
        name: 'Real Estate (Miami)',
        unit: 'S-REIT',
        amount: '120.00',
        value: '12,000,000.00',
        apy: '8.4%',
        allocation: '28.0%',
        risk: 'Medium',
        oracle: 'EstatePro Oracle',
        liquidity: '10% Liquid'
    },
    {
        name: 'USDC Ledger',
        unit: 'USDC',
        amount: '3,093,000.00',
        value: '3,093,000.00',
        apy: '4.5%',
        allocation: '7.3%',
        risk: 'Minimal',
        oracle: 'Native',
        liquidity: '100% Liquid'
    },
];

export default function AssetInventoryModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-6xl bg-[#0F172A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="p-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5 relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"></div>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-4 ring-blue-500/10">
                                <Wallet className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-white font-display uppercase tracking-tight">Financial Inventory</h2>
                                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-1">Institutional Ledger • Real-Time Valuation</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex flex-col items-end mr-6 border-r border-white/10 pr-6">
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total Asset NAV</span>
                                <span className="text-xl font-black text-white">$42,893,000.00</span>
                            </div>
                            <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-gray-400 transition-all active:scale-95">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Architectural Alerts */}
                    <div className="px-8 py-3 bg-amber-500/5 border-b border-white/5 flex items-center gap-3">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <span className="text-[10px] font-black text-amber-500/80 uppercase tracking-widest">
                            Liquidity Buffer Check: Miami RE (S-REIT) below optimal 15% threshold. Settlement restricted.
                        </span>
                    </div>

                    {/* Table Area */}
                    <div className="flex-1 overflow-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead className="sticky top-0 bg-[#0F172A] z-10">
                                <tr className="border-b border-white/10 text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] bg-white/5">
                                    <th className="p-6">Position Spec</th>
                                    <th className="p-6">Oracle Source</th>
                                    <th className="p-6">Valuation (USD)</th>
                                    <th className="p-6">Liquidity Depth</th>
                                    <th className="p-6 text-center">Weight</th>
                                    <th className="p-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {ASSET_DATA.map((asset, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-all group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center font-black text-blue-400">
                                                    {asset.unit}
                                                </div>
                                                <div>
                                                    <div className="text-base font-bold text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">{asset.name}</div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className={cn("text-[9px] font-black px-2 py-0.5 rounded border uppercase",
                                                            asset.risk === 'Risk-Free' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10' :
                                                                asset.risk === 'Low' ? 'text-blue-500 border-blue-500/20 bg-blue-500/10' :
                                                                    'text-amber-500 border-amber-500/20 bg-amber-500/10'
                                                        )}>
                                                            {asset.risk}
                                                        </span>
                                                        <span className="text-[10px] text-gray-600 font-mono">{asset.amount} Units</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4 text-blue-500/50" />
                                                <span className="text-xs text-gray-400 font-bold uppercase tracking-tight">{asset.oracle}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="text-lg font-black text-white font-mono">${asset.value}</div>
                                            <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
                                                <TrendingUp className="w-3 h-3" /> {asset.apy} Yielding
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase">
                                                    <span>Settlement Depth</span>
                                                    <span className={cn(parseInt(asset.liquidity) < 20 ? "text-amber-500" : "text-emerald-500")}>{asset.liquidity}</span>
                                                </div>
                                                <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn("h-full transition-all duration-1000", parseInt(asset.liquidity) < 20 ? "bg-amber-500" : "bg-emerald-500")}
                                                        style={{ width: asset.liquidity }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col items-center">
                                                <div className="text-sm font-black text-white mb-2">{asset.allocation}</div>
                                                <div className="w-16 h-16 rounded-full border-4 border-white/5 relative flex items-center justify-center">
                                                    <svg className="w-full h-full -rotate-90">
                                                        <circle
                                                            cx="32" cy="32" r="28"
                                                            fill="transparent"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                            className="text-blue-500"
                                                            strokeDasharray={`${(parseFloat(asset.allocation) / 100) * 176} 176`}
                                                        />
                                                    </svg>
                                                    <span className="absolute text-[8px] font-bold text-gray-500">POOL</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-black text-white uppercase tracking-widest transition-all">
                                                Full Audit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Warning */}
                    <div className="p-8 bg-white/5 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-blue-500 text-[10px] font-black uppercase tracking-widest">
                            <ShieldCheck className="w-5 h-5 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                            V3 Architecture Enforcement: Multi-Oracle Consensus Active
                        </div>
                        <div className="flex gap-4">
                            <button className="text-[10px] text-gray-500 hover:text-white font-bold uppercase tracking-widest transition-colors">Export Ledger</button>
                            <button className="text-[10px] text-gray-500 hover:text-white font-bold uppercase tracking-widest transition-colors">API Docs</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
