import React, { useState } from 'react';
import { Shield, Lock, Globe, Users, Save, AlertTriangle, CheckCircle, ChevronRight, Plus, Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';
import WhitelistModal from '../components/policy/WhitelistModal';

const PolicySection = ({ title, icon: Icon, children, isActive = true }) => (
    <div className={cn("glass-card overflow-hidden transition-all duration-300", isActive ? "opacity-100" : "opacity-50 grayscale")}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5">
                    <Icon className="w-5 h-5 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase font-display tracking-tight">{title}</h3>
            </div>
            <div className="h-6 w-12 bg-green-500/20 rounded-full border border-green-500/50 relative cursor-pointer">
                <div className="absolute right-1 top-1 h-4 w-4 bg-green-500 rounded-full shadow-lg"></div>
            </div>
        </div>
        <div className="p-6 space-y-4">
            {children}
        </div>
    </div>
);

const ToggleRow = ({ label, description, defaultChecked }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
        <div>
            <div className="text-sm font-medium text-white">{label}</div>
            <div className="text-xs text-gray-500 font-medium">{description}</div>
        </div>
        <input type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 cursor-pointer" />
    </div>
);

import { useWriteContract, useAccount } from 'wagmi';
import { parseEther, stringToHex } from 'viem';

const ComplianceVaultABI = [
    {
        "type": "function",
        "name": "updateJurisdictionList",
        "inputs": [{"type": "string[]"}],
        "outputs": [],
        "stateMutability": "nonpayable"
    }
];

export default function PolicyEngine() {
    const { isConnected } = useAccount();
    const [timelock, setTimelock] = useState(24);
    const [isWhitelistModalOpen, setIsWhitelistModalOpen] = useState(false);
    const { data: hash, writeContract, isPending: isCommitting, isSuccess } = useWriteContract();

    const handleCommit = () => {
        if (!isConnected) return alert("Connect Regulator Wallet");

        // Execute a batch update simulation - here updating a demo restriction
        writeContract({
            address: '0x4E036e3017b6c784c79553F3BD5dC3B103B6f6BB',
            abi: ComplianceVaultABI,
            functionName: 'setJurisdictionRestriction',
            args: [stringToHex('RU', { size: 32 }), true],
        });
    };

    const handleFeeUpdate = (bps) => {
        writeContract({
            address: '0x4E036e3017b6c784c79553F3BD5dC3B103B6f6BB',
            abi: ComplianceVaultABI,
            functionName: 'setWithdrawalFee',
            args: [BigInt(bps)],
        });
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight font-display uppercase leading-none">Policy Engine</h1>
                    <p className="text-gray-400 mt-2 font-medium">On-chain rule enforcement for the ComplianceVault Smart Account</p>
                </div>
                <button
                    onClick={handleCommit}
                    disabled={isCommitting}
                    className={cn(
                        "flex items-center gap-2 px-8 py-4 rounded-xl font-bold shadow-lg transition-all uppercase tracking-widest text-xs",
                        isSuccess ? "bg-emerald-600 text-white" : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
                    )}
                >
                    {isCommitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Broadcasting to Mantle...
                        </>
                    ) : isSuccess ? (
                        <>
                            <CheckCircle className="w-4 h-4" />
                            Policy Updated
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Commit New Policies
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Jurisdiction Enforcement */}
                <PolicySection title="Jurisdiction Enforcement" icon={Globe}>
                    <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-3 text-amber-400 text-sm mb-6">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        <p className="leading-tight">Policy changes take 21k blocks to propagate. Blocking a region freezes immediate withdrawals for affected on-chain accounts.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Restrictions</h4>
                            <div className="space-y-2">
                                {['North Korea (KP)', 'Iran (IR)', 'Russia (RU)'].map(c => (
                                    <div key={c} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                                        <span className="text-sm text-white font-medium">{c}</span>
                                        <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">BLOCKLISTED</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-2">
                            <ToggleRow label="Enforce OFAC Compliance" description="Automated exclusion of sanctioned wallets" defaultChecked={true} />
                            <ToggleRow label="Regional Fencing" description="Restrict access to specific trade corridors (e.g. EEA, SADC)" defaultChecked={false} />
                        </div>
                    </div>
                </PolicySection>

                {/* Withdrawal Logic */}
                <PolicySection title="Withdrawal Custody" icon={Lock}>
                    <div className="space-y-6">
                        <div>
                            <label className="flex justify-between text-xs font-black text-gray-500 uppercase tracking-widest mb-4">
                                <span>Security Time-Lock Delay</span>
                                <span className="text-blue-400 font-mono">{timelock} Hours</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="72"
                                value={timelock}
                                onChange={(e) => setTimelock(e.target.value)}
                                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-2"
                            />
                            <div className="flex justify-between text-[10px] text-gray-600 font-bold uppercase">
                                <span>Instant</span>
                                <span>72H Maximum</span>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <ToggleRow label="Compliance Override" description="Allow CMP role to pause outflows during audit" defaultChecked={true} />
                            <ToggleRow label="Whale Movement Threshold" description="Force 48h lock for withdrawals > $250k" defaultChecked={true} />
                            <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/10 text-[11px] text-blue-400 font-medium">
                                <Shield className="w-3 h-3 inline mb-0.5 mr-1" /> Withdrawal requests on Mantle require both Ops execution and Compliance signatures.
                            </div>
                        </div>
                    </div>
                </PolicySection>

                {/* Role Management */}
                <PolicySection title="Institutional Roles" icon={Users}>
                    <div className="space-y-4">
                        {[
                            { role: 'OPS', name: 'Operations Executive', desc: 'Authorized to trigger yield rebalancing.', count: 2, color: 'blue' },
                            { role: 'CMP', name: 'Compliance Officer', desc: 'Governs whitelist and overrides.', count: 1, color: 'purple' },
                            { role: 'FIN', name: 'Finance Auditor', desc: 'Read-only access to ledger & reports.', count: 3, color: 'emerald' }
                        ].map(item => (
                            <div key={item.role} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center font-black text-xs",
                                    item.color === 'blue' ? 'bg-blue-500/10 text-blue-500' :
                                        item.color === 'purple' ? 'bg-purple-500/10 text-purple-500' :
                                            'bg-emerald-500/10 text-emerald-500'
                                )}>{item.role}</div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-white uppercase tracking-tight">{item.name}</h4>
                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold text-gray-400">{item.count} Accounts</div>
                                    <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-blue-500 transition-colors ml-auto mt-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                </PolicySection>

                {/* Asset Governance */}
                <PolicySection title="Asset Registry" icon={CheckCircle}>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">Authorized RWAs & Stablecoins</p>
                    <div className="space-y-3">
                        {[
                            { name: 'USDC (Stablecoin)', addr: '0xA0b8...eb48', active: true },
                            { name: 'S-BILL (T-Bills)', addr: '0x4E03...f6BB', active: true },
                            { name: 'S-INV (Invoices)', addr: '0x7b2f...1a9e', active: false }
                        ].map(asset => (
                            <div key={asset.addr} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className={cn("w-2 h-2 rounded-full", asset.active ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-gray-600")}></div>
                                    <div>
                                        <div className="text-xs font-bold text-white">{asset.name}</div>
                                        <div className="text-[10px] text-gray-500 font-mono tracking-tight">{asset.addr}</div>
                                    </div>
                                </div>
                                <button className="text-xs text-gray-600 hover:text-red-500 transition-colors font-black uppercase">Revoke</button>
                            </div>
                        ))}
                        <button
                            onClick={() => setIsWhitelistModalOpen(true)}
                            className="w-full py-4 mt-2 border-2 border-dashed border-white/10 rounded-xl text-gray-500 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Add Asset
                        </button>
                    </div>
                </PolicySection>
            </div>

            <WhitelistModal isOpen={isWhitelistModalOpen} onClose={() => setIsWhitelistModalOpen(false)} />
        </div>
    );
}
