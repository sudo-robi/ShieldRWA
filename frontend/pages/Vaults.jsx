import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, TrendingUp, Shield, ArrowRight, Lock, Unlock, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import VaultDetailModal from '../components/vaults/VaultDetailModal';
import DepositModal from '../components/dashboard/DepositModal';

const VAULTS = [
    {
        name: "US Treasury Bill Vault",
        symbol: "S-BILL",
        description: "Institutional access to short-term US sovereign debt. Highest liquidity and safety.",
        apy: "5.2%",
        tvl: "$14.8M",
        risk: "Low",
        color: "blue",
        collateral: "T-Bills (3-6M)",
        minDeposit: "$10,000"
    },
    {
        name: "Invoice Factoring Pool #4",
        symbol: "S-INV4",
        description: "Capitalize on SME logistics invoices. Diversified across 40+ global suppliers.",
        apy: "11.5%",
        tvl: "$8.0M",
        risk: "Medium",
        color: "purple",
        collateral: "Accounts Receivable",
        minDeposit: "$5,000"
    },
    {
        name: "Miami Real Estate Fund",
        symbol: "S-REIT-M",
        description: "Direct exposure to luxury commercial property yields in Miami's core districts.",
        apy: "8.4%",
        tvl: "$12.0M",
        risk: "Medium",
        color: "emerald",
        collateral: "Commercial Real Estate",
        minDeposit: "$25,000"
    },
    {
        name: "Corp Bond Portfolio (Tech)",
        symbol: "S-TECH",
        description: "Curated selection of high-grade corporate debt from leading technology firms.",
        apy: "6.1%",
        tvl: "$4.9M",
        risk: "Low",
        color: "indigo",
        collateral: "Investment Grade Bonds",
        minDeposit: "$1,000"
    }
];

const PENDING_VAULTS = [
    {
        name: "Gold-Backed Credit Line",
        symbol: "S-GOLD",
        status: "Underwriting",
        expectedApy: "7.2%",
        completion: 65,
        description: "Institutional credit backed by physical gold reserves in London LBMA vaults."
    },
    {
        name: "Solar Farm Yield Fund",
        symbol: "S-SOLAR",
        status: "Legal Review",
        expectedApy: "14.0%",
        completion: 40,
        description: "Yield from renewable energy off-take agreements in Northern Africa."
    }
];

const VaultCard = ({ vault, index, onExplore }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="glass-card overflow-hidden group border-white/5 hover:border-blue-500/30 transition-all duration-500"
    >
        <div className="p-8">
            <div className="flex justify-between items-start mb-6">
                <div className={cn("p-4 rounded-2xl bg-opacity-10",
                    vault.color === 'blue' ? 'bg-blue-500 text-blue-400' :
                        vault.color === 'purple' ? 'bg-purple-500 text-purple-400' :
                            vault.color === 'emerald' ? 'bg-emerald-500 text-emerald-400' :
                                'bg-indigo-500 text-indigo-400'
                )}>
                    <Landmark className="w-8 h-8" />
                </div>
                <div className="text-right">
                    <div className="text-3xl font-black text-white font-display uppercase tracking-tight">{vault.apy}</div>
                    <div className="text-xs text-emerald-400 font-bold tracking-widest uppercase">Target APY</div>
                </div>
            </div>

            <div className="space-y-2 mb-8">
                <h3 className="text-2xl font-bold text-white font-display group-hover:text-blue-400 transition-colors uppercase">{vault.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{vault.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 mb-8">
                <div>
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">TVL</div>
                    <div className="text-lg font-bold text-white">{vault.tvl}</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Risk Rating</div>
                    <div className="text-lg font-bold text-white">{vault.risk}</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Collateral</div>
                    <div className="text-sm font-medium text-gray-300">{vault.collateral}</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Min. Entry</div>
                    <div className="text-sm font-medium text-gray-300">{vault.minDeposit}</div>
                </div>
            </div>

            <button
                onClick={onExplore}
                className="w-full py-4 bg-white/5 group-hover:bg-blue-600 border border-white/10 group-hover:border-blue-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
                Explore Vault Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    </motion.div>
);

export default function Vaults() {
    const [activeTab, setActiveTab] = useState('active');
    const [selectedVault, setSelectedVault] = useState(null);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

    return (
        <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                        <TrendingUp className="w-3 h-3" /> Real-World Yields
                    </div>
                    <h1 className="text-5xl font-black text-white font-display tracking-tight uppercase leading-[0.9]">
                        Marketplace <br />
                        <span className="text-blue-500">Inventory</span>
                    </h1>
                    <p className="text-gray-400 mt-4 text-lg max-w-xl font-medium">
                        Secure institutional allocation to tokenized debt, hard assets, and cash-flow instruments with 24/7 on-chain compliance.
                    </p>
                </div>
                <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
                    {['active', 'pending', 'historical'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-6 py-2 font-bold rounded-xl transition-all uppercase tracking-widest text-xs",
                                activeTab === tab
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                    : "text-gray-500 hover:text-white"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'active' && (
                    <motion.div
                        key="active-grid"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 pt-4"
                    >
                        {VAULTS.map((v, i) => (
                            <VaultCard key={v.symbol} vault={v} index={i} onExplore={() => setSelectedVault(v)} />
                        ))}
                    </motion.div>
                )}

                {activeTab === 'pending' && (
                    <motion.div
                        key="pending-list"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4 pt-4"
                    >
                        {PENDING_VAULTS.map((v, i) => (
                            <div key={v.symbol} className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-8 border-amber-500/10">
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-2xl font-bold text-white font-display uppercase">{v.name}</h3>
                                        <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-black rounded-full border border-amber-500/20 uppercase tracking-widest">
                                            {v.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 max-w-2xl">{v.description}</p>
                                </div>
                                <div className="flex items-center gap-12 text-right">
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Target Yield</div>
                                        <div className="text-2xl font-black text-white">{v.expectedApy}</div>
                                    </div>
                                    <div className="w-32">
                                        <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Audit Progress</div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden mt-2">
                                            <div className="h-full bg-amber-500" style={{ width: `${v.completion}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-3xl">
                            <Clock className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                            <h4 className="text-gray-500 font-bold uppercase tracking-widest">New listings added weekly</h4>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'historical' && (
                    <motion.div
                        key="historical-empty"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="py-24 text-center glass-card border-white/5"
                    >
                        <CheckCircle2 className="w-16 h-16 text-emerald-500/20 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-white font-display uppercase">Historical Performance</h3>
                        <p className="text-gray-500 mt-2 max-w-md mx-auto">No matured vaults yet. ShieldRWA launched in Q1 2026. Matured SME debt pools will appear here once settled.</p>
                        <button
                            onClick={() => setActiveTab('active')}
                            className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10"
                        >
                            Return to Active Listings
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Impact Section */}
            <div className="py-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white font-display uppercase tracking-tight">Global Liquidity Bridge</h2>
                    <p className="text-gray-500 mt-2 max-w-2xl mx-auto">Providing stable USD yields to markets facing FX erosion and limited institutional infrastructure.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { region: "Africa", focus: "Logistics Finance", impact: "Bridging the $170B trade finance gap for regional SMEs." },
                        { region: "LATAM", focus: "Inflation Hedge", impact: "Secure USD-denominated sovereign debt access for local neobanks." },
                        { region: "Southeast Asia", focus: "Cross-Border Trade", impact: "Instant settlement for export-import factoring without intermediary friction." }
                    ].map((item, i) => (
                        <div key={i} className="glass-card p-8 border-white/5 hover:border-blue-500/20 transition-all flex flex-col items-center text-center">
                            <div className="text-blue-500 font-black text-xl mb-2 font-display">{item.region}</div>
                            <div className="text-white font-bold mb-4">{item.focus}</div>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.impact}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Platform Feature Banner */}
            <div className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="glass-card p-12 border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    <div className="absolute -right-16 -bottom-16 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Shield className="w-96 h-96 text-white" />
                    </div>
                    <div className="space-y-4 relative">
                        <h2 className="text-3xl font-bold text-white font-display uppercase">Regulatory First Architecture</h2>
                        <p className="text-gray-400 max-w-2xl font-medium">
                            Every vault on SHIELDRWA is protected by the ComplianceVault smart account. Your assets never touch a custodial pool without automated jurisdiction, KYC, and AML clearance verified on every block.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 min-w-[240px]">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold">
                            <Lock className="w-4 h-4" /> Multi-Sig Protected
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold">
                            <Shield className="w-4 h-4" /> Audited Scrutiny
                        </div>
                    </div>
                </div>
            </div>

            <VaultDetailModal
                isOpen={!!selectedVault}
                onClose={() => setSelectedVault(null)}
                vault={selectedVault}
                onExecute={() => {
                    setSelectedVault(null);
                    setIsDepositModalOpen(true);
                }}
            />

            <DepositModal
                isOpen={isDepositModalOpen}
                onClose={() => setIsDepositModalOpen(false)}
            />
        </div>
    );
}
