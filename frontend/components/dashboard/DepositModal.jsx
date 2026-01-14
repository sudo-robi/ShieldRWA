import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Check, AlertCircle, Wallet, ExternalLink } from 'lucide-react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import ComplianceVaultABI from '../../../ComplianceVault.json';

const VAULTS = [
    { id: 'tbill', name: 'US Treasury Bill Vault (3M)', apy: '5.2%', address: '0x1A2b...3c4D' },
    { id: 'invoice', name: 'Invoice Factoring Pool #4', apy: '11.5%', address: '0x4E5f...6g7H' },
    { id: 'real_estate', name: 'Miami Real Estate Fund', apy: '8.4%', address: '0x7I8j...9k0L' }
];

const ASSETS = [
    { id: 'usdc', name: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', balance: '24,500.00' },
    { id: 'usdt', name: 'USDT', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', balance: '12,200.00' }
];

export default function DepositModal({ isOpen, onClose }) {
    const { isConnected } = useAccount();
    const [step, setStep] = useState(1);
    const [selectedAsset, setSelectedAsset] = useState(ASSETS[0]);
    const [selectedVault, setSelectedVault] = useState(VAULTS[0]);
    const [amount, setAmount] = useState('');

    const { data: hash, writeContract, isPending: isWritePending, error: writeError } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isWritePending) setStep(3);
        if (isConfirmed) setStep(4);
    }, [isWritePending, isConfirmed]);

    const handleDeposit = () => {
        if (!isConnected) return alert("Please connect wallet first");

        writeContract({
            address: '0x4E036e3017b6c784c79553F3BD5dC3B103B6f6BB', // Mantle Sepolia Deployment
            abi: ComplianceVaultABI,
            functionName: 'deposit',
            args: [parseEther(amount || '0')],
        });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-[#0F172A] border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                        <h2 className="text-xl font-bold text-white font-display">Deposit RWA Assets</h2>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {!isConnected && step === 1 && (
                            <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-sm">
                                Wallet connection required to interact with the vault.
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-6">
                                {/* Vault Selection */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 font-medium tracking-wide">TARGET VAULT</label>
                                    <div className="relative">
                                        <select
                                            value={selectedVault.id}
                                            onChange={(e) => setSelectedVault(VAULTS.find(v => v.id === e.target.value))}
                                            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-blue-500 transition-all cursor-pointer hover:bg-white/10"
                                        >
                                            {VAULTS.map(v => (
                                                <option key={v.id} value={v.id} className="bg-gray-900">{v.name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Asset Selection */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 font-medium tracking-wide">FUNDING ASSET</label>
                                    <div className="relative">
                                        <select
                                            value={selectedAsset.id}
                                            onChange={(e) => setSelectedAsset(ASSETS.find(a => a.id === e.target.value))}
                                            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-blue-500 transition-all cursor-pointer hover:bg-white/10"
                                        >
                                            {ASSETS.map(a => (
                                                <option key={a.id} value={a.id} className="bg-gray-900">{a.name} Balance: ${a.balance}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Amount Input */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 font-medium tracking-wide">AMOUNT</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full bg-white/5 border border-white/10 text-white text-2xl font-bold rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-gray-700 font-display"
                                        />
                                        <button
                                            onClick={() => setAmount(selectedAsset.balance.replace(',', ''))}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs font-bold rounded-md transition-colors"
                                        >
                                            MAX
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!amount || parseFloat(amount) <= 0}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 text-lg active:scale-95"
                                >
                                    Review Transaction
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="text-center space-y-1 py-4">
                                    <div className="text-sm text-gray-500 uppercase font-bold tracking-widest">You are depositing</div>
                                    <div className="text-5xl font-bold text-white font-display">${amount}</div>
                                    <div className="text-blue-400 font-medium">into {selectedVault.name}</div>
                                </div>

                                <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Policy Check</span>
                                        <span className="text-emerald-400 font-bold flex items-center gap-1"><Check className="w-3 h-3" /> KYC Verified</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Est. Gas</span>
                                        <span className="text-white font-mono">~0.002 ETH</span>
                                    </div>
                                    <div className="flex justify-between border-t border-white/5 pt-2 mt-2">
                                        <span className="text-gray-400">Total Delay</span>
                                        <span className="text-white">24h Time-lock</span>
                                    </div>
                                </div>

                                {writeError && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs text-center">
                                        Error: {writeError.shortMessage || writeError.message}
                                    </div>
                                )}

                                <div className="flex gap-4 pt-2">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-all"
                                    >
                                        Refine
                                    </button>
                                    <button
                                        onClick={handleDeposit}
                                        className="flex-[2] py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        Execute Deposit <Wallet className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {(step === 3 || isWritePending || isConfirming) && (
                            <div className="py-16 flex flex-col items-center justify-center text-center space-y-6">
                                <div className="relative w-20 h-20">
                                    <div className="absolute inset-0 border-4 border-white/5 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-white font-display">
                                        {isConfirming ? "Confirming on Ledger" : "Awaiting Authorization"}
                                    </h3>
                                    <p className="text-gray-500">
                                        {isConfirming ? "Finalizing your position..." : "Check your connected wallet extension..."}
                                    </p>
                                </div>
                                {hash && (
                                    <a
                                        href={`https://explorer.sepolia.mantle.xyz/tx/${hash}`}
                                        target="_blank"
                                        className="text-xs text-blue-400 flex items-center gap-1 hover:underline"
                                    >
                                        View on Mantle Explorer <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        )}

                        {step === 4 && (
                            <div className="py-12 flex flex-col items-center justify-center text-center space-y-8">
                                <div className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)] animate-pulse">
                                    <Check className="w-12 h-12" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-bold text-white font-display">Deposit Executed</h3>
                                    <p className="text-gray-400">Your assets are now undergoing standard 24h compliance verification.</p>
                                </div>
                                <div className="w-full bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10 space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Transaction ID</span>
                                        <span className="text-white font-mono">{hash?.substring(0, 10)}...</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Settlement Code</span>
                                        <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px]">AUTH_SUCCESS</span>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all"
                                >
                                    Return to Dashboard
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
