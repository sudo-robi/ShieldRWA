import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Plus, Trash2, Check, AlertCircle, ExternalLink } from 'lucide-react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import ComplianceVaultABI from '../../contracts/ComplianceVault.json';

export default function WhitelistModal({ isOpen, onClose }) {
    const { isConnected } = useAccount();
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [step, setStep] = useState(1);

    const { data: hash, writeContract, isPending: isWritePending, error: writeError } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isWritePending) setStep(2);
        if (isConfirmed) setStep(3);
    }, [isWritePending, isConfirmed]);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!isConnected) return alert("Please connect wallet first");

        writeContract({
            address: '0x4E036e3017b6c784c79553F3BD5dC3B103B6f6BB', // Mantle Sepolia Deployment
            abi: ComplianceVaultABI,
            functionName: 'setAssetWhitelist',
            args: [address, true],
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
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full max-w-lg bg-[#0F172A] border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-blue-400" />
                            <h2 className="text-xl font-bold text-white font-display">Update Policy: Whitelist</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6">
                        {step === 1 && (
                            <form onSubmit={handleAdd} className="space-y-6">
                                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3 text-blue-300 text-sm">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <p>Updating the asset whitelist requires COMPLIANCE_ROLE on-chain authorization. This will enable deposits for this asset across all vaults.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 font-medium">ASSET IDENTIFIER</label>
                                        <input
                                            required
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Paxos Gold (PAXG)"
                                            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 font-medium tracking-wide">CONTRACT ADDRESS</label>
                                        <input
                                            required
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="0x..."
                                            className="w-full bg-white/5 border border-white/10 text-white font-mono rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                {writeError && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs text-center font-mono">
                                        {writeError.shortMessage || writeError.message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isWritePending}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all text-lg active:scale-95"
                                >
                                    {isWritePending ? "Signature Requested..." : "Broadcast New Policy"}
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <div className="py-16 flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-white font-display">Updating On-Chain Registry</h3>
                                    <p className="text-gray-400 text-sm">Waiting for consensus verification...</p>
                                </div>
                                {hash && (
                                    <a href={`https://etherscan.io/tx/${hash}`} target="_blank" className="text-blue-400 flex items-center gap-1 text-xs hover:underline">
                                        View Tx <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="py-12 flex flex-col items-center justify-center text-center space-y-8">
                                <div className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                                    <Check className="w-12 h-12" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-white font-display">Policy Updated</h3>
                                    <p className="text-gray-400 mt-2">{name} has been successfully whitelisted.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all"
                                >
                                    Dismiss Audit Log
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
