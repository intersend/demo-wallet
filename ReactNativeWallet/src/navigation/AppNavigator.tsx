/**
 * App Navigation
 * 
 * Defines the navigation structure for the demo wallet application.
 * Uses React Navigation's native stack navigator to manage screens
 * and transitions between them.
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import application screens
import WalletScreen from '../screens/WalletScreen';
import AppStoreScreen from '../screens/AppStoreScreen';
import AppScreen from '../screens/AppScreen';

/**
 * Type definitions for the navigation stack
 * 
 * This defines the screens available in the app and their parameters:
 * - Wallet: The main wallet dashboard (no parameters)
 * - AppStore: The catalog of available dApps (no parameters)
 * - App: A screen displaying a specific dApp (requires appUrl parameter)
 */
export type RootStackParamList = {
  Wallet: undefined;
  AppStore: undefined;
  App: { appUrl: string };
};

// Create the stack navigator with our defined types
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * App Navigator Component
 * 
 * Defines the screen hierarchy and navigation options
 */
const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Wallet"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="AppStore" component={AppStoreScreen} />
      <Stack.Screen name="App" component={AppScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
