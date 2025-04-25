/**
 * Wallet Screen
 * 
 * This is the main screen of the demo wallet. It displays:
 * 1. User's wallet balance and tokens
 * 2. Transaction activity
 * 3. Available dApps from the Universal Portability SDK
 * 
 * In a real wallet implementation, this would connect to an actual
 * blockchain wallet, but for this demo, we use mock data.
 */
import React, { useState } from 'react';
// React Native components
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Navigation
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
// Universal Portability SDK integration
import { usePortableApps } from 'universal-portability';

/**
 * Navigation prop type for this screen
 */
type WalletScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Wallet'>;

/**
 * Token interface - represents a cryptocurrency token in the wallet
 */
interface Token {
  symbol: string;
  name: string;
  balance: string;
  dollarValue: string;
  icon: string;
  change: string;
}

/**
 * Activity interface - represents a transaction in the wallet history
 */
interface Activity {
  type: 'Send' | 'Receive' | 'Swap';
  asset: string;
  amount: string;
  status: 'Confirmed' | 'Pending';
  time: string;
  hash: string;
}

/**
 * Wallet data interface - contains all wallet information
 */
interface WalletData {
  address: string;
  balance: string;
  dollarValue: string;
  tokens: Token[];
  recentActivity: Activity[];
}

/**
 * Mock wallet data for demonstration purposes
 * In a real wallet app, this would come from a wallet connection
 */
const walletData: WalletData = {
  address: '0x1234...5678',
  balance: '4.2831 ETH',
  dollarValue: '$8,245.12',
  tokens: [
    { symbol: 'ETH', name: 'Ethereum', balance: '4.2831', dollarValue: '$8,245.12', icon: '⟠', change: '+2.4%' },
    { symbol: 'USDC', name: 'USD Coin', balance: '1,234.56', dollarValue: '$1,234.56', icon: '💰', change: '+0.1%' },
    { symbol: 'MATIC', name: 'Polygon', balance: '2,500', dollarValue: '$987.50', icon: '🔷', change: '-1.2%' },
    { symbol: 'UNI', name: 'Uniswap', balance: '156.23', dollarValue: '$425.15', icon: '🦄', change: '+5.6%' }
  ],
  recentActivity: [
    { type: 'Send', asset: 'ETH', amount: '0.5', status: 'Confirmed', time: '2 hours ago', hash: '0x1234...5678' },
    { type: 'Receive', asset: 'USDC', amount: '500', status: 'Confirmed', time: '1 day ago', hash: '0x8765...4321' },
    { type: 'Swap', asset: 'ETH → USDC', amount: '1.2', status: 'Pending', time: 'Just now', hash: '0x9876...1234' }
  ]
};

const TokenItem = ({ token }: { token: any }) => (
  <TouchableOpacity style={styles.tokenItem}>
    <View style={styles.tokenIconContainer}>
      <Text style={styles.tokenIcon}>{token.icon}</Text>
    </View>
    <View style={styles.tokenDetails}>
      <Text style={styles.tokenName}>{token.name}</Text>
      <Text style={styles.tokenBalance}>{token.balance} {token.symbol}</Text>
    </View>
    <View style={styles.tokenValue}>
      <Text style={styles.tokenDollarValue}>{token.dollarValue}</Text>
      <Text style={[
        styles.tokenChange,
        token.change.startsWith('+') ? styles.positiveChange : styles.negativeChange
      ]}>
        {token.change}
      </Text>
    </View>
  </TouchableOpacity>
);

const ActivityItem = ({ activity }: { activity: any }) => (
  <TouchableOpacity style={styles.activityItem}>
    <View style={styles.activityHeader}>
      <Text style={[
        styles.activityType,
        activity.type === 'Send' ? styles.sendActivity : 
        activity.type === 'Receive' ? styles.receiveActivity : styles.swapActivity
      ]}>
        {activity.type}
      </Text>
      <Text style={styles.activityAsset}>{activity.asset}</Text>
      <Text style={styles.activityTime}>{activity.time}</Text>
    </View>
    <View style={styles.activityDetails}>
      <Text style={styles.activityHash}>{activity.hash}</Text>
      <View style={[
        styles.statusBadge,
        activity.status === 'Confirmed' ? styles.confirmedStatus : styles.pendingStatus
      ]}>
        <Text style={styles.statusText}>{activity.status}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function WalletScreen() {
  const navigation = useNavigation<WalletScreenNavigationProp>();
  const { apps, loading } = usePortableApps();
  const [activeTab, setActiveTab] = useState('assets');
  
  // Calculate additional app properties
  const enhancedApps = apps ? apps.map((app: any) => ({
    ...app,
    rating: '4.5',
    users: '10k+',
    isFeatured: Math.random() > 0.7, // Randomly mark some apps as featured
    isNew: Math.random() > 0.8, // Randomly mark some apps as new
  })) : [];

  const featuredApps = enhancedApps.filter((app: any) => app.isFeatured);

  const handleAppPress = (app: any) => {
    navigation.navigate('App', { 
      appUrl: `https://interspace.fi/apps/${app.slug}` 
    });
  };

  const renderAppItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.appItem}
      onPress={() => handleAppPress(item)}
    >
      <View style={styles.appItemContent}>
        {item.logo ? (
          <Image 
            source={{ uri: item.logo }} 
            style={styles.appLogo} 
          />
        ) : (
          <View style={styles.appLogoPlaceholder}>
            <Text style={styles.appLogoText}>{item.name.charAt(0)}</Text>
          </View>
        )}
        <View style={styles.appDetails}>
          <Text style={styles.appName}>{item.name}</Text>
          <Text style={styles.appDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.appMetaContainer}>
            <Text style={styles.appMeta}>⭐ {item.rating}</Text>
            <Text style={styles.appMeta}>👥 {item.users} users</Text>
            {item.category && item.category[0] && (
              <Text style={styles.appCategory}>{item.category[0]}</Text>
            )}
          </View>
        </View>
        {item.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>New</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const handleConnectWallet = () => {
    // In a real app, this would trigger a wallet connection flow
    console.log('Connect wallet pressed');
  };

  if (!walletData.address) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>W</Text>
          </View>
          <Text style={styles.welcomeTitle}>Welcome to the Intersend Demo Wallet</Text>
          <Text style={styles.welcomeText}>Experience Intersend from an end user's perspective</Text>
          <TouchableOpacity 
            style={styles.connectButton}
            onPress={handleConnectWallet}
          >
            <Text style={styles.connectButtonText}>Connect Wallet</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLogo}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoIconText}>W</Text>
          </View>
          <Text style={styles.headerTitle}>Universal Wallet</Text>
        </View>
        <TouchableOpacity style={styles.addressButton}>
          <Text style={styles.addressText}>{walletData.address}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceAmount}>{walletData.dollarValue}</Text>
          <Text style={styles.balanceEth}>{walletData.balance}</Text>
          <Text style={styles.demoNote}>Note: All numbers and data are for demonstration purposes only</Text>
          
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Receive</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Swap</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'assets' && styles.activeTab]} 
            onPress={() => setActiveTab('assets')}
          >
            <Text style={[styles.tabText, activeTab === 'assets' && styles.activeTabText]}>Assets</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'activity' && styles.activeTab]} 
            onPress={() => setActiveTab('activity')}
          >
            <Text style={[styles.tabText, activeTab === 'activity' && styles.activeTabText]}>Activity</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'assets' ? (
          <View style={styles.tabContent}>
            {walletData.tokens.map((token, index) => (
              <TokenItem key={index} token={token} />
            ))}
          </View>
        ) : (
          <View style={styles.tabContent}>
            {walletData.recentActivity.map((activity, index) => (
              <ActivityItem key={index} activity={activity} />
            ))}
          </View>
        )}

        {/* dApps Section */}
        <View style={styles.appsSection}>
          <View style={styles.appsSectionHeader}>
            <Text style={styles.appsSectionTitle}>Explore dApps</Text>
            <View style={styles.poweredByContainer}>
              <Text style={styles.poweredByText}>Powered by Intersend</Text>
            </View>
          </View>

          {loading ? (
            <Text style={styles.loadingText}>Loading apps...</Text>
          ) : (
            <FlatList
              data={enhancedApps}
              renderItem={renderAppItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false} // Disable scrolling to nest inside ScrollView
              ListEmptyComponent={<Text style={styles.noAppsText}>No apps available</Text>}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  headerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#037DD6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoIconText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  addressButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  addressText: {
    fontSize: 12,
    color: '#6B7280',
  },
  balanceCard: {
    padding: 24,
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  balanceEth: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  demoNote: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#037DD6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#037DD6',
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#037DD6',
    fontWeight: '500',
  },
  tabContent: {
    paddingHorizontal: 16,
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tokenIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tokenIcon: {
    fontSize: 20,
  },
  tokenDetails: {
    flex: 1,
  },
  tokenName: {
    fontSize: 16,
    fontWeight: '500',
  },
  tokenBalance: {
    fontSize: 14,
    color: '#6B7280',
  },
  tokenValue: {
    alignItems: 'flex-end',
  },
  tokenDollarValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  tokenChange: {
    fontSize: 14,
  },
  positiveChange: {
    color: '#10B981',
  },
  negativeChange: {
    color: '#EF4444',
  },
  activityItem: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityType: {
    fontWeight: '500',
    marginRight: 8,
  },
  sendActivity: {
    color: '#EF4444',
  },
  receiveActivity: {
    color: '#10B981',
  },
  swapActivity: {
    color: '#037DD6',
  },
  activityAsset: {
    color: '#6B7280',
    marginRight: 8,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 'auto',
  },
  activityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityHash: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confirmedStatus: {
    backgroundColor: '#D1FAE5',
  },
  pendingStatus: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  appsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  appsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  appsSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  poweredByContainer: {
    backgroundColor: '#EBF5FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  poweredByText: {
    fontSize: 12,
    color: '#037DD6',
  },
  loadingText: {
    textAlign: 'center',
    padding: 16,
    color: '#6B7280',
  },
  noAppsText: {
    textAlign: 'center',
    padding: 16,
    color: '#6B7280',
  },
  appItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  appItemContent: {
    flexDirection: 'row',
    padding: 12,
  },
  appLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  appLogoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appLogoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  appDetails: {
    flex: 1,
  },
  appName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  appMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appMeta: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 8,
  },
  appCategory: {
    fontSize: 12,
    color: '#037DD6',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  newBadgeText: {
    fontSize: 10,
    color: '#065F46',
    fontWeight: '500',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#E0F2FE',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoText: {
    fontSize: 48,
    color: '#037DD6',
    fontWeight: 'bold',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  connectButton: {
    backgroundColor: '#037DD6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  }
});
