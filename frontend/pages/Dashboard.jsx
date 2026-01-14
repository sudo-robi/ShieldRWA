import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Wallet, PieChart, Activity, DollarSign, ShieldCheck, Clock, CheckCircle, Download, Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';
import DepositModal from '../components/dashboard/DepositModal';
import WithdrawModal from '../components/dashboard/WithdrawModal';
import AssetInventoryModal from '../components/dashboard/AssetInventoryModal';

const StatsCard = ({ title, value, subtext, trend, icon: Icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="glass-card p-6 border-white/5 hover:border-blue-500/20 transition-all group overflow-hidden relative"
    >
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icon size={80} className="text-white" />
        </div>
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-blue-600/10 text-blue-400">
                <Icon size={24} />
            </div>
            <div>
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">{title}</h3>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-white font-display tracking-tight uppercase leading-none mt-1">{value}</span>
                    {trend && (
                        <span className="text-emerald-400 text-xs font-bold flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            {trend}
                        </span>
                    )}
                </div>
            </div>
        </div>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-tight">{subtext}</p>
    </motion.div>
);

const AssetRow = ({ asset, amount, value, apy, risk }) => (
    <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/5 group">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-black text-xs text-gray-400">
                {asset.substring(0, 2).toUpperCase()}
            </div>
            <div>
                <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{asset}</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{amount} Units</div>
            </div>
        </div>
        <div className="text-right">
            <div className="text-sm font-black text-white">${value}</div>
            <div className="flex items-center gap-2 justify-end">
                <span className="text-[10px] text-emerald-400 font-bold">{apy}% APY</span>
                <span className="h-1 w-1 rounded-full bg-gray-700"></span>
                <span className="text-[10px] text-gray-500 font-bold uppercase">{risk} Risk</span>
            </div>
        </div>
    </div>
);

import { useReadContract, useAccount } from 'wagmi';
import ComplianceVaultABI from '../../ComplianceVault.json';
import { formatEther } from 'viem';

export default function Dashboard() {
    const { isConnected } = useAccount();
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [exportSuccess, setExportSuccess] = useState(false);

    const { data: rawRwaValue } = useReadContract({
        address: '0x4E036e3017b6c784c79553F3BD5dC3B103B6f6BB',
        abi: ComplianceVaultABI,
        functionName: 'totalRWAValue',
    });

    const rwaValue = rawRwaValue ? parseFloat(formatEther(rawRwaValue)).toLocaleString() : "24,500,000";

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            setExportSuccess(true);
            setTimeout(() => setExportSuccess(false), 2000);
        }, 1500);
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight font-display uppercase leading-none">Net Asset View</h1>
                    <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm font-bold uppercase tracking-widest">
                        <Activity className="w-3 h-3 text-emerald-500" /> Real-Time Portfolio Scrutiny
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 text-sm font-medium transition-all flex items-center gap-2"
                    >
                        {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : exportSuccess ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Download className="w-4 h-4" />}
                        {isExporting ? 'Exporting...' : exportSuccess ? 'Downloaded' : 'Export CSV'}
                    </button>
                    <button
                        onClick={() => setIsWithdrawModalOpen(true)}
                        className="px-4 py-2 bg-white/5 hover:bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-lg text-sm font-medium transition-all"
                    >
                        Withdraw Funds
                    </button>
                    <button
                        onClick={() => setIsDepositModalOpen(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-500/25 transition-all"
                    >
                        New Deposit
                    </button>
                </div>
            </div>

            {/* Compliance & Governance Banner */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
            >
                <div className="absolute -left-12 -top-12 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
                <div className="flex items-center gap-6 z-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#0F172A] border border-blue-500/30 flex flex-col items-center justify-center text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <ShieldCheck size={32} />
                        <span className="text-[8px] font-black uppercase mt-1">Optimal</span>
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold text-white uppercase tracking-tight">Compliance Health</h2>
                        <p className="text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2">
                            Mantle Sepolia Registry Connected <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 z-10 w-full md:w-auto">
                    <div className="flex-1 md:w-48 p-3 rounded-xl bg-[#0F172A]/80 border border-white/5">
                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-amber-500" /> Workflow Alerts
                        </div>
                        <div className="text-xs text-white font-bold uppercase">2 Pending Withdrawals</div>
                    </div>
                    <div className="flex-1 md:w-48 p-3 rounded-xl bg-[#0F172A]/80 border border-white/5">
                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5">
                            <CheckCircle className="w-3 h-3 text-emerald-500" /> Active Policies
                        </div>
                        <div className="text-xs text-white font-bold uppercase tracking-tight">KYC Enforced</div>
                    </div>
                </div>
            </motion.div>

            {/* Grid of Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Net Assets" value="$42,893,000" subtext="Aggregate TVL across 4 pools" trend="+12.4%" icon={DollarSign} delay={0.1} />
                <StatsCard title="Blended APY" value="7.42%" subtext="Weighted institutional yield" trend="+0.25%" icon={Activity} delay={0.2} />
                <StatsCard title="Interest Income" value="$204,500" subtext="Total yield generated (MTD)" trend="+8.1%" icon={ArrowUpRight} delay={0.3} />
                <StatsCard title="Active Vaults" value="04" subtext="Deployed regulatory smart accounts" icon={PieChart} delay={0.4} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                {/* Performance Chart Placeholder */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 glass-card p-8 border-white/5"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-white font-display font-black text-xl uppercase">NAV Performance</h3>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Trailing 30-day growth</p>
                        </div>
                        <div className="flex gap-2">
                            {['7D', '1M', '3M', 'YTD'].map(t => (
                                <button key={t} className={cn("px-3 py-1 rounded text-[10px] font-black uppercase transition-all", t === '1M' ? "bg-blue-600 text-white" : "text-gray-500 hover:text-white hover:bg-white/5")}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-64 w-full flex items-end gap-2 px-2 border-b border-l border-white/5">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div key={i} className="flex-1 bg-gradient-to-t from-blue-600/20 to-blue-500/40 rounded-t-lg transition-all hover:to-blue-400 cursor-pointer" style={{ height: `${20 + (i * 5) + Math.random() * 20}%` }}></div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 px-2 text-[10px] text-gray-600 font-black uppercase tracking-widest">
                        <span>01 MAR 2024</span>
                        <span>15 MAR 2024</span>
                        <span>TODAY (LIVE)</span>
                    </div>
                </motion.div>

                {/* Internal Ledger / Assets */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass-card border-white/5 flex flex-col"
                >
                    <div className="p-6 border-b border-white/10">
                        <h3 className="text-white font-display font-black text-xl uppercase">Asset Allocation</h3>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Top Ledger Positions</p>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                        <AssetRow asset="US Treasury Bill (3M)" amount="15,000" value="14,850,000" apy="5.2" risk="Zero" />
                        <AssetRow asset="Corp Bond Portfolio" amount="5,000" value="4,950,000" apy="6.1" risk="Low" />
                        <AssetRow asset="Invoice Factoring" amount="800" value="8,000,000" apy="11.5" risk="Med" />
                        <AssetRow asset="Miami Commercial RE" amount="120" value="12,000,000" apy="8.4" risk="Med" />
                        <AssetRow asset="Cash / Stablecoins" amount="3,093,000" value="3,093,000" apy="0.0" risk="None" />
                    </div>
                    <div className="p-4 bg-white/5 border-t border-white/10 text-center">
                        <button
                            onClick={() => setIsInventoryModalOpen(true)}
                            className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                            View All Assets &rarr;
                        </button>
                    </div>
                </motion.div>
            </div>
            <DepositModal isOpen={isDepositModalOpen} onClose={() => setIsDepositModalOpen(false)} />
            <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} />
            <AssetInventoryModal isOpen={isInventoryModalOpen} onClose={() => setIsInventoryModalOpen(false)} />
        </div>
    );
}
