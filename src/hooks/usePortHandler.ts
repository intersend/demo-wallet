// src/hooks/usePortHandler.ts
import { useAccount, useChainId } from 'wagmi';
import { useMessageHandler } from './useMessageHandler';

export function usePortHandler() {
  const { address } = useAccount();
  const chainId = useChainId();

  useMessageHandler({
    walletAddress: address!,
    chainId: chainId!
  });

  return {
    isReady: Boolean(address && chainId)
  };
}