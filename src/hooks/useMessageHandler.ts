// src/hooks/useMessageHandler.ts
import { useEffect } from 'react';
import { useUniversalPortability } from 'universal-portability';
import { sendTransaction, signMessage } from '@wagmi/core';
import { config } from '../wagmi';
import { hexToString } from 'viem';

export interface MessageHandlerConfig {
  walletAddress: string;
  chainId: number;
}

export function useMessageHandler({ walletAddress, chainId }: MessageHandlerConfig) {
  const { sendMessageToIFrame } = useUniversalPortability();

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const { type, payload, requestId } = event.data;
      console.log('Received message:', { type, payload, requestId });

      try {
        switch (type) {
          case 'INTERSEND_CONNECT_REQUEST':
            sendMessageToIFrame(
              {
                type: 'INTERSEND_CONNECT_RESPONSE',
                payload: {
                  address: walletAddress,
                  chainId,
                  isConnected: true,
                }
              }
            );
            break;

          case 'SIGN_MESSAGE_REQUEST':
            try {
              if (!payload.message) {
                throw new Error('No message provided for signing');
              }

              const decodedMessage = typeof payload.message === 'string' 
                ? hexToString(payload.message) 
                : payload.message;

              const signature = await signMessage(config, {
                message: decodedMessage,
                account: walletAddress as `0x${string}`
              });

              sendMessageToIFrame(
                {
                  type: 'SIGN_MESSAGE_RESPONSE',
                  payload: signature
                },
                requestId
              );
            } catch (error: any) {
              sendMessageToIFrame(
                {
                  type: 'SIGN_MESSAGE_RESPONSE',
                  payload: {
                    error: {
                      code: error.code || 4001,
                      message: error.message
                    }
                  }
                },
                requestId
              );
            }
            break;

          case 'TRANSACTION_REQUEST':
            try {
              const txHash = await sendTransaction(config, {
                ...payload.params,
                account: walletAddress as `0x${string}`
              });
              
              sendMessageToIFrame(
                {
                  type: 'TRANSACTION_RESPONSE',
                  payload: txHash
                },
                requestId
              );
            } catch (error: any) {
              sendMessageToIFrame(
                {
                  type: 'TRANSACTION_RESPONSE',
                  payload: {
                    error: {
                      code: error.code || 4001,
                      message: error.message
                    }
                  }
                },
                requestId
              );
            }
            break;

          default:
            console.warn('Unhandled message type:', type);
        }
      } catch (error: any) {
        console.error('Handler error:', error);
        if (requestId) {
          sendMessageToIFrame(
            {
              type: `${type}_RESPONSE`,
              payload: {
                error: {
                  code: error.code || 4001,
                  message: error.message
                }
              }
            },
            requestId
          );
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [walletAddress, chainId, sendMessageToIFrame]);
}