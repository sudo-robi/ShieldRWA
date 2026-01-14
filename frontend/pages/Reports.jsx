import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, Search, Loader2, CheckCircle, ExternalLink } from 'lucide-react';
import StatementModal from '../components/reports/StatementModal';
import { cn } from '../utils/cn';

const MOCK_TRANSACTIONS = [
    { id: 'tx_01', date: '2024-03-10', type: 'Interest Yield', asset: 'US Treasury Bill (3M)', amount: '+ $8,450.00', status: 'Cleared', hash: '0x8a...92' },
    { id: 'tx_02', date: '2024-03-09', type: 'Deposit', asset: 'USDC', amount: '+ $250,000.00', status: 'Cleared', hash: '0xb2...11' },
    { id: 'tx_03', date: '2024-03-09', type: 'Management Fee', asset: 'USDC', amount: '- $450.00', status: 'Processed', hash: '0xc4...55' },
    { id: 'tx_04', date: '2024-03-08', type: 'Bond Maturity', asset: 'Corp Bond (Apple)', amount: '+ $1,050,000.00', status: 'Cleared', hash: '0x1d...ff' },
    { id: 'tx_05', date: '2024-03-08', type: 'Withdrawal', asset: 'USDC', amount: '- $50,000.00', status: 'Pending', hash: '0x99...aa' },
];

const ReportCard = ({ title, desc, icon: Icon, color, onClick, isProcessing }) => (
    <div
        onClick={onClick}
        className="glass-card p-8 flex flex-col items-center text-center hover:bg-white/10 cursor-pointer group transition-all duration-300 relative overflow-hidden"
    >
        <div className={cn("p-5 rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg",
            color === 'green' ? 'bg-green-500/10 text-green-500' :
                color === 'blue' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-purple-500/10 text-purple-500'
        )}>
            {isProcessing ? <Loader2 className="w-10 h-10 animate-spin" /> : <Icon className="w-10 h-10" />}
        </div>
        <h3 className="text-white font-black text-xl font-display uppercase tracking-tight">{title}</h3>
        <p className="text-sm text-gray-500 mt-2 font-medium leading-relaxed">{desc}</p>
        <div className={cn("mt-6 py-2 px-4 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all",
            color === 'green' ? 'bg-green-500/10 text-green-400 group-hover:bg-green-500/20' :
                color === 'blue' ? 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20' :
                    'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20'
        )}>
            {isProcessing ? 'Generating...' : 'Download'} <Download className="w-4 h-4" />
        </div>
    </div>
);

export default function Reports() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeReport, setActiveReport] = useState('');
    const [processingReports, setProcessingReports] = useState({});
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const handleReportClick = (type) => {
        setProcessingReports(prev => ({ ...prev, [type]: true }));
        setTimeout(() => {
            setProcessingReports(prev => ({ ...prev, [type]: false }));
            setActiveReport(type);
            setIsModalOpen(true);
        }, 1200);
    };

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        setTimeout(() => {
            setIsLoadingMore(false);
        }, 1500);
    };

    return (
        <div className="space-y-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight font-display uppercase leading-[0.85]">
                        Accounting <br />
                        <span className="text-blue-500">Reports</span>
                    </h1>
                    <p className="text-gray-400 mt-4 text-lg max-w-xl font-medium">
                        Export cryptographically signed ledger snapshots for tax, audit, and institutional compliance.
                    </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-4 py-2 border border-emerald-500/20 rounded-xl">
                    Audit Status: Ready For Q1 2024
                </div>
            </div>

            {/* Export Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ReportCard
                    title="QuickBooks Export"
                    desc="Native .QBO integration for seamless corporate accounting reconciliation."
                    icon={FileText}
                    color="green"
                    onClick={() => handleReportClick('QuickBooks Export')}
                    isProcessing={processingReports['QuickBooks Export']}
                />
                <ReportCard
                    title="Monthly Statement"
                    desc="Official institutional PDF with detailed NAV snapshots and yield distribution."
                    icon={FileText}
                    color="blue"
                    onClick={() => handleReportClick('Monthly Statement')}
                    isProcessing={processingReports['Monthly Statement']}
                />
                <ReportCard
                    title="Tax Form 1099"
                    desc="Automated US tax liability estimates for on-chain interest and capital gains."
                    icon={FileText}
                    color="purple"
                    onClick={() => handleReportClick('Tax Form 1099')}
                    isProcessing={processingReports['Tax Form 1099']}
                />
            </div>

            {/* Ledger Table */}
            <div className="glass-card overflow-hidden border-white/5 relative">
                <div className="p-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5">
                    <div>
                        <h3 className="font-black text-white text-xl uppercase font-display tracking-tight">On-Chain Ledger</h3>
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Authorized Transaction History</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input type="text" placeholder="Search hash..." className="pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all w-48 md:w-64" />
                        </div>
                        <button className="p-2 border border-white/10 rounded-xl hover:bg-white/10 text-gray-500 hover:text-white transition-all">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto overflow-y-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">
                                <th className="p-6 font-medium">Transaction Date</th>
                                <th className="p-6 font-medium">Logic Segment</th>
                                <th className="p-6 font-medium">Associated Asset</th>
                                <th className="p-6 font-medium text-right">Value (USD)</th>
                                <th className="p-6 text-center">Protocol Status</th>
                                <th className="p-6 text-right">Mantle Hash</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {MOCK_TRANSACTIONS.map((tx) => (
                                <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-6 text-sm text-gray-300 font-mono tracking-tighter">{tx.date}</td>
                                    <td className="p-6 text-sm font-bold text-white uppercase tracking-tight">{tx.type}</td>
                                    <td className="p-6 text-sm text-gray-500 font-medium">{tx.asset}</td>
                                    <td className={`p-6 text-sm font-black text-right font-mono ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-white'}`}>
                                        {tx.amount}
                                    </td>
                                    <td className="p-6 text-center">
                                        <span className={cn("inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                                            tx.status === 'Cleared' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                tx.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                    'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                        )}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button className="text-[10px] font-mono text-blue-500/80 hover:text-blue-400 transition-colors flex items-center gap-1.5 ml-auto">
                                            {tx.hash} <ExternalLink className="w-3 h-3" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-8 border-t border-white/10 bg-white/5 flex justify-center">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all flex items-center gap-2"
                    >
                        {isLoadingMore ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {isLoadingMore ? 'Synchronizing L2 State...' : 'Load Full Audit History'}
                    </button>
                </div>
            </div>

            <StatementModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                reportType={activeReport}
            />
        </div>
    );
}
