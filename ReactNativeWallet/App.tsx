/**
 * Demo Wallet App - Entry Point
 * 
 * This is the main application entry point for the Universal Portability Demo Wallet.
 * It demonstrates how to integrate the Universal Portability SDK into a React Native wallet app
 * by wrapping the application with the required providers.
 */
import React from 'react';
// UI and system components
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
// Universal Portability SDK
import { UniversalPortabilityProvider } from 'universal-portability';
// App components
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <UniversalPortabilityProvider>
          <AppNavigator />
        </UniversalPortabilityProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
