/**
 * App Screen
 * 
 * This screen displays an individual dApp loaded from the Universal Portability SDK.
 * It provides a clean container for the dApp with navigation controls and information.
 */
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { DAppView } from '../components/DAppView';
import { RootStackParamList } from '../navigation/AppNavigator';

/**
 * Type definition for the route parameters
 */
type AppScreenRouteProp = RouteProp<RootStackParamList, 'App'>;

/**
 * App Screen Component
 * 
 * Renders a single dApp in a container with navigation and information
 */
export default function AppScreen() {
  // Access route parameters and navigation
  const route = useRoute<AppScreenRouteProp>();
  const navigation = useNavigation();
  const { appUrl } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back to Wallet</Text>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>dApp</Text>
        </View>
      </View>
      
      {/* DApp Container */}
      <View style={styles.dappContainer}>
        <DAppView appUrl={appUrl} />
      </View>
      
      {/* Info Box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Intersend in Action</Text>
        <Text style={styles.infoText}>
          This is a demo of seamless dApp integration. The app above runs in a secure WebView 
          that acts as a bridge between user's wallet and the dApp. The wallet address is shared 
          automatically.
        </Text>
        <View style={styles.infoMeta}>
          <Text style={styles.infoLink}>Get Started</Text>
          <Text style={styles.infoTagline}>Add this app in less than 5 minutes</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#037DD6',
    fontSize: 16,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  dappContainer: {
    flex: 1,
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoBox: {
    margin: 16,
    padding: 16,
    backgroundColor: '#EBF5FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#037DD6',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
  },
  infoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLink: {
    fontSize: 14,
    color: '#037DD6',
    fontWeight: '500',
    marginRight: 8,
  },
  infoTagline: {
    fontSize: 12,
    color: '#6B7280',
  }
});
