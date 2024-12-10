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
  projectId: '936ce227c0152a29bdeef7d68794b0ac',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
  ],
  ssr: true,
});