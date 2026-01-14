import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, Printer, Share2 } from 'lucide-react';

export default function StatementModal({ isOpen, onClose, reportType }) {
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
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    className="relative w-full max-w-4xl h-[85vh] bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-lg">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">{reportType} - March 2024</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600">
                                <Printer className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600">
                                <Share2 className="w-5 h-5" />
                            </button>
                            <div className="w-px h-6 bg-gray-300 mx-2"></div>
                            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Report Content Mockup */}
                    <div className="flex-1 overflow-y-auto p-12 bg-[#F3F4F6] flex justify-center">
                        <div className="w-full max-w-[800px] bg-white shadow-lg p-12 min-h-[1000px] font-serif">
                            {/* Company Info */}
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <h1 className="text-2xl font-bold text-blue-900 uppercase">ShieldRWA Financial</h1>
                                    <p className="text-gray-500 text-sm mt-1">123 DeFi Plaza, Cayman Islands</p>
                                    <p className="text-gray-500 text-sm">support@shieldrwa.fi</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray-400 uppercase text-xs font-bold tracking-widest mb-1">Statement Date</div>
                                    <div className="text-gray-900 font-bold">March 31, 2024</div>
                                </div>
                            </div>

                            <div className="h-px bg-gray-200 w-full mb-8"></div>

                            {/* Summary Grid */}
                            <div className="grid grid-cols-2 gap-12 mb-12">
                                <div>
                                    <h3 className="text-gray-400 uppercase text-xs font-bold mb-4">Account Holder</h3>
                                    <p className="text-lg font-bold">Compliance Admin Office</p>
                                    <p className="text-gray-600">Wallet: 0xf39F...2266</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 uppercase text-xs font-bold mb-4">Portfolio Summary</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Beginning Balance</span>
                                            <span className="font-bold">$40,230,000.00</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Net Deposits</span>
                                            <span className="font-bold text-green-600">+$2,458,500.00</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Realized Yield</span>
                                            <span className="font-bold text-green-600">+$204,500.00</span>
                                        </div>
                                        <div className="pt-2 border-t border-gray-100 flex justify-between text-lg font-bold">
                                            <span>Ending NAV</span>
                                            <span>$42,893,000.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Header */}
                            <h3 className="text-gray-900 font-bold mb-4">Detailed Activity</h3>
                            <table className="w-full text-sm">
                                <thead className="border-b-2 border-gray-900">
                                    <tr>
                                        <th className="py-2 text-left">Date</th>
                                        <th className="py-2 text-left">Description</th>
                                        <th className="py-2 text-right">Amount (USD)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="py-2">
                                        <td className="py-3">03/10/24</td>
                                        <td className="py-3">Interest Yield - US Treasury (3M)</td>
                                        <td className="py-3 text-right font-bold text-green-600">+$8,450.00</td>
                                    </tr>
                                    <tr className="py-2">
                                        <td className="py-3">03/09/24</td>
                                        <td className="py-3">USDC Deposit Confirmation</td>
                                        <td className="py-3 text-right font-bold">+$250,000.00</td>
                                    </tr>
                                    <tr className="py-2">
                                        <td className="py-3">03/09/24</td>
                                        <td className="py-3">Quarterly Management Fee</td>
                                        <td className="py-3 text-right text-red-600">-$450.00</td>
                                    </tr>
                                    <tr className="py-2">
                                        <td className="py-3">03/08/24</td>
                                        <td className="py-3">Redemption: Apple Corporate Bond</td>
                                        <td className="py-3 text-right font-bold">+$1,050,000.00</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Footer Disclaimer */}
                            <div className="mt-20 pt-8 border-t border-gray-100 text-[10px] text-gray-400 leading-relaxed italic">
                                This statement is for informational purposes only and is based on on-chain data from the ComplianceVault smart account. Yields are net of fees. Real-world assets are held in trust by authorized custodians. This is not tax advice.
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-4 bg-gray-50 border-t flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Close
                        </button>
                        <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 shadow-md transition-all flex items-center gap-2">
                            Download Official PDF <Download className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
