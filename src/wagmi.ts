import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Wallet Demo',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
  ],
  ssr: true,
});