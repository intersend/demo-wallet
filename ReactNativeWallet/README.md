# Universal Portability Demo Wallet (React Native)

This is a React Native implementation of a demo wallet showcasing the integration of decentralized applications (dApps) using the Universal Portability SDK.

## 🚀 Overview

The Universal Portability SDK enables web3 wallets to seamlessly integrate third-party dApps with minimal effort. This demo wallet demonstrates:

- How to display and interact with dApps directly within your wallet
- Secure communication between wallet and dApps
- Wallet data sharing and signing operations
- App discovery and catalog features

The integration is simple, requiring just a few components and minimal configuration.

## 📋 Project Structure

```
ReactNativeWallet/
├── src/
│   ├── components/
│   │   └── DAppView.tsx         # dApp renderer using Port component
│   ├── hooks/
│   │   ├── usePortHandler.js    # Wallet connection & communication handler
│   │   └── usePortableApps.ts   # Hook to fetch available dApps
│   ├── navigation/
│   │   └── AppNavigator.tsx     # Navigation configuration
│   └── screens/
│       ├── WalletScreen.tsx     # Main wallet interface
│       ├── AppStoreScreen.tsx   # Available dApps catalog
│       └── AppScreen.tsx        # Individual dApp display screen
└── App.tsx                      # Application entry point with providers
```

## 🔍 Implementation Details

### 1. Application Setup

The application is wrapped with the necessary providers in `App.tsx`:

```tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UniversalPortabilityProvider } from 'universal-portability';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <UniversalPortabilityProvider>
          <AppNavigator />
        </UniversalPortabilityProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
```

### 2. Wallet-dApp Communication

The `usePortHandler.js` hook manages communication between the wallet and dApps:

```jsx
import { useRef } from 'react';
import { usePortHandler as useUniversalPortHandler } from 'universal-portability';

export function useWalletPortHandler() {
  // Wallet data (in a real implementation, would come from your wallet)
  const address = '0x1234567890abcdef1234567890abcdef12345678';
  const chainId = 1; // Ethereum Mainnet
  const rpcUrl = 'https://ethereum.publicnode.com';
  
  // Reference needed for the WebView
  const webViewRef = useRef(null);
  
  // Initialize the SDK's port handler
  const portHandler = useUniversalPortHandler({
    address,
    chainId,
    signer: {
      // Methods for handling signing requests from dApps
      signMessage: async (message) => {
        console.log('Signing message:', message);
        return '0xsignature'; // Mock signature for demo
      },
      sendTransaction: async (tx) => {
        console.log('Transaction request:', tx);
        return '0xtxhash'; // Mock transaction hash for demo
      }
    }
  });
  
  return {
    webViewRef,
    handleWebViewMessage: portHandler.handleMessage,
    isReady: Boolean(address && chainId),
    address,
    chainId,
    rpcUrl
  };
}
```

### 3. DApp Rendering

The `DAppView.tsx` component uses the SDK's `Port` component to securely render dApps:

```tsx
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Port } from 'universal-portability';
import { useWalletPortHandler } from '../hooks/usePortHandler';

export function DAppView({ appUrl }: { appUrl: string }) {
  const { 
    webViewRef, 
    handleWebViewMessage, 
    isReady,
    address,
    chainId,
    rpcUrl
  } = useWalletPortHandler();
  
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
```

### 4. App Discovery

The `usePortableApps.ts` hook provides access to the SDK's catalog of available dApps:

```tsx
import { usePortableApps } from 'universal-portability';

// Re-export the hook directly from the SDK
export { usePortableApps };
```

This is used in screens like `AppStoreScreen.tsx` to display available dApps:

```tsx
const { apps, loading } = usePortableApps();
```

## 🚦 Data Flow

The integration follows this data flow:

1. **SDK Initialization**: The `UniversalPortabilityProvider` initializes the SDK at the app level
2. **Wallet Connection**: The `usePortHandler` hook connects wallet data to the SDK
3. **dApp Rendering**: The `Port` component renders dApps in a secure container
4. **Communication**: Messages between the wallet and dApps are handled through the WebView message system
5. **Action Handling**: Signing requests and transactions are processed by the wallet's signer implementation

## 🔧 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native development environment
- Expo CLI

### Installation

1. Install dependencies:
```bash
cd ReactNativeWallet
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Run on iOS or Android:
```bash
npm run ios
# or
npm run android
```

## 🎮 Demo Features

- **Wallet Dashboard**: View token balances and transaction history
- **App Discovery**: Browse and discover available dApps
- **In-Wallet dApp Experience**: Use dApps without leaving your wallet
- **Secure Communication**: Protected channel between wallet and dApps
- **Transaction Signing**: Handle signing requests from dApps

## 📚 Learning More

To learn more about the Universal Portability SDK:

- [SDK Documentation](https://docs.universalportability.org)
- [API Reference](https://docs.universalportability.org/api)
- [Example Implementations](https://github.com/universalportability/examples)
