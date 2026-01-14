import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import { mainnet, sepolia, anvil } from 'viem/chains';

const mantleSepolia = {
    id: 5003,
    name: 'Mantle Sepolia',
    nativeCurrency: { name: 'Mantle', symbol: 'MNT', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.sepolia.mantle.xyz'] },
    },
    blockExplorers: {
        default: { name: 'Mantle Explorer', url: 'https://explorer.sepolia.mantle.xyz' },
    },
    testnet: true,
};

export const config = getDefaultConfig({
    appName: 'ShieldRWA',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mantleSepolia, anvil, mainnet, sepolia],
    transports: {
        [mantleSepolia.id]: http(),
        [anvil.id]: http(),
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
    ssr: false,
});
