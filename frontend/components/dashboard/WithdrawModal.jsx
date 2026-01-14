import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, AlertTriangle, AlertCircle, Check, ArrowRight, Shield } from 'lucide-react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem';
// ComplianceVault ABI
const ComplianceVaultABI = [
    {
        "type": "function",
        "name": "requestWithdrawal",
        "inputs": [{"type": "uint256"}],
        "outputs": [],
        "stateMutability": "nonpayable"
    }
];

const ASSETS = [
    { id: 'usdc', name: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', balance: '24,500.00' },
    { id: 'sbill', name: 'S-BILL (Treasury)', address: '0x4E03...f6BB', balance: '15,000.00' }
];

export default function WithdrawModal({ isOpen, onClose }) {
    const { isConnected } = useAccount();
    const [step, setStep] = useState(1);
    const [selectedAsset, setSelectedAsset] = useState(ASSETS[0]);
    const [amount, setAmount] = useState('');

    const { data: hash, writeContract, isPending: isWritePending, error: writeError } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isWritePending) setStep(3);
        if (isConfirmed) setStep(4);
    }, [isWritePending, isConfirmed]);

    const handleRequest = () => {
        if (!isConnected) return alert("Please connect wallet first");

        writeContract({
            address: '0x4E036e3017b6c784c79553F3BD5dC3B103B6f6BB', // Mantle Sepolia Deployment
            abi: ComplianceVaultABI,
            functionName: 'requestWithdrawal',
            args: [parseEther(amount || '0')], // V4 uses shareAmount
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
                    className="relative w-full max-w-md bg-[#0F172A] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-amber-500" />
                            <h2 className="text-xl font-bold text-white font-display">Initiate Withdrawal</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex gap-3 text-amber-500 text-xs">
                                    <AlertTriangle className="w-5 h-5 shrink-0" />
                                    <p className="leading-tight">Institutional safety protocols require a <strong>24-hour cooling period</strong> and Compliance Role approval before funds can be settled to your wallet.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 font-black uppercase tracking-widest">Withdraw From</label>
                                    <select
                                        value={selectedAsset.id}
                                        onChange={(e) => setSelectedAsset(ASSETS.find(a => a.id === e.target.value))}
                                        className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-amber-500/50 transition-all font-medium"
                                    >
                                        {ASSETS.map(a => (
                                            <option key={a.id} value={a.id} className="bg-gray-900">{a.name} (Available: {a.balance})</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 font-black uppercase tracking-widest">Amount to Redeem</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full bg-white/5 border border-white/10 text-white text-3xl font-bold rounded-xl px-4 py-5 focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-gray-800 font-display"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold uppercase tracking-widest text-[10px]">USD Value</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!amount || parseFloat(amount) <= 0}
                                    className="w-full py-4 bg-amber-600 hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                                >
                                    Review Request <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8">
                                <div className="text-center space-y-2">
                                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Redemption Value</div>
                                    <div className="text-5xl font-black text-white font-display">${amount}</div>
                                    <div className="text-amber-500 font-bold text-xs">Standard T+1 Settlement Workflow</div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <Shield className="w-5 h-5 text-blue-400 mt-1" />
                                        <div className="text-xs text-gray-400">
                                            <strong className="text-white">Institutional Custody Rule</strong>: This transaction will be broadcast to the Mantle Sepolia network and queued for Compliance review.
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <Clock className="w-5 h-5 text-amber-500 mt-1" />
                                        <div className="text-xs text-gray-400">
                                            <strong className="text-white">Execution Delay</strong>: Funds will be available for withdrawal on or after <strong>{new Date(Date.now() + 86400000).toLocaleDateString()}</strong>.
                                        </div>
                                    </div>
                                </div>

                                {writeError && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-bold text-center">
                                        {writeError.shortMessage || "Verification Failed: User Jurisdiction Restricted"}
                                    </div>
                                ) || <div className="p-4 invisible">.</div>}

                                <div className="grid grid-cols-2 gap-4">
                                    <button onClick={() => setStep(1)} className="py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all">Back</button>
                                    <button onClick={handleRequest} className="py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20 text-xs uppercase tracking-widest transition-all">Submit Request</button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-16 h-16 border-4 border-amber-500/10 border-t-amber-500 rounded-full animate-spin"></div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-white font-display uppercase">Broadcasting...</h3>
                                    <p className="text-gray-500 text-xs font-medium">Securing cryptographic commitment on Mantle.</p>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="py-12 flex flex-col items-center justify-center text-center space-y-8">
                                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                    <Check className="w-10 h-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-white font-display uppercase leading-tight">Request Logged</h3>
                                    <p className="text-gray-500 text-xs max-w-[240px] mx-auto font-medium">Withdrawal ID #{Math.floor(Math.random() * 10000)} is now in the compliance queue.</p>
                                </div>
                                <div className="w-full bg-blue-500/5 p-4 rounded-xl border border-blue-500/10 text-[10px] font-mono text-gray-500 flex justify-between">
                                    <span>STATUS: QUEUED</span>
                                    <span>TIME-LOCK: 24H ACTIVE</span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all uppercase tracking-widest text-[10px]"
                                >
                                    Return to Ledger
                                </button>
                            </div>
                        )}

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
