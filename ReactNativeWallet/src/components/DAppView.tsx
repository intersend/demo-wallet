/**
 * DApp View Component
 * 
 * This component renders a third-party dApp inside the wallet using the Universal 
 * Portability SDK's Port component (a specialized WebView wrapper).
 * 
 * The Port component handles secure communication between the wallet and the dApp,
 * including wallet connection, transaction signing, and message signing.
 */
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// Import Port component from the Universal Portability SDK
import { Port } from 'universal-portability';
// Custom hook for wallet integration
import { useWalletPortHandler } from '../hooks/usePortHandler';

/**
 * Props for the DAppView component
 */
interface DAppViewProps {
  /** URL of the dApp to load */
  appUrl: string;
}

/**
 * DAppView Component
 * 
 * Renders a dApp in a secure container with wallet integration
 * 
 * @param {DAppViewProps} props - Component props containing the dApp URL
 */
export function DAppView({ appUrl }: DAppViewProps) {
  // Get wallet data and handlers from our custom hook
  const { 
    webViewRef,             // Reference to the WebView - required for message passing
    handleWebViewMessage,   // Function that processes messages from the dApp
    isReady,                // Boolean flag indicating if wallet connection is ready
    address,                // User's wallet address to share with the dApp
    chainId,                // Current blockchain network ID
    rpcUrl                  // RPC endpoint for blockchain access
  } = useWalletPortHandler();
  
  // Show loading state until wallet is ready
  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#037DD6" />
        <Text style={styles.loadingText}>Connecting wallet...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Port
        ref={webViewRef}
        source={{ uri: appUrl }}
        address={address}
        chainId={chainId}
        rpcUrl={rpcUrl}
        onMessage={handleWebViewMessage}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    color: '#037DD6',
    fontSize: 16,
  }
});
