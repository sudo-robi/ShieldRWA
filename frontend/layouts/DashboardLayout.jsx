import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    ShieldCheck,
    FileText,
    Settings,
    Bell,
    UserCircle,
    Landmark
} from 'lucide-react';
import { cn } from '../utils/cn';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NAV_ITEMS = [
    { label: 'NAV Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Marketplace', icon: Landmark, path: '/vaults' },
    { label: 'Policy Engine', icon: ShieldCheck, path: '/policy' },
    { label: 'Yield Reports', icon: FileText, path: '/reports' },
];

export default function DashboardLayout() {
    const location = useLocation();

    return (
        <div className="flex h-screen w-full bg-[#0a0f1c] text-white font-sans overflow-hidden">
            {/* ... sidebar ... */}
            <aside className="w-64 border-r border-white/10 bg-[#0d1221] flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-wide font-display">SHIELD<span className="text-blue-500">RWA</span></span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 uppercase tracking-wider">Regulated Yield Vault</div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {NAV_ITEMS.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", isActive ? "text-blue-400" : "text-gray-500 group-hover:text-white")} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white w-full rounded-xl hover:bg-white/5 transition-all">
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Settings</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16 border-b border-white/10 bg-[#0a0f1c]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10 index-20">
                    <div className="flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-sm font-medium text-emerald-400">System Operational</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-gray-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#0a0f1c]"></span>
                        </button>

                        <div className="h-8 w-[1px] bg-white/10"></div>

                        <div className="flex items-center gap-3">
                            <ConnectButton
                                accountStatus="address"
                                chainStatus="icon"
                                showBalance={false}
                            />
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 relative">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
