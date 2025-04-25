/**
 * App Store Screen
 * 
 * This screen displays a catalog of dApps that can be integrated with the wallet.
 * Data is fetched from the Universal Portability SDK, which provides a list of 
 * compatible applications that can be embedded in the wallet.
 */
import React from 'react';
// React Native components
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Navigation
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
// Universal Portability SDK
import { usePortableApps } from 'universal-portability';

/**
 * Type definition for app data from SDK
 */
interface PortableApp {
  id: string;
  name: string;
  description: string;
  logo: string;
  slug: string;
  category?: string[];
}

/**
 * Type for the navigation prop
 */
type AppStoreScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AppStore'>;

/**
 * App Store Screen Component
 * 
 * Displays a list of available dApps from the Universal Portability SDK
 */
export default function AppStoreScreen() {
  // Navigation hook to navigate between screens
  const navigation = useNavigation<AppStoreScreenNavigationProp>();
  
  // Fetch apps from the SDK - this hook provides:
  // - apps: Array of available applications
  // - loading: Boolean loading state
  const { apps, loading } = usePortableApps();
  
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
      <Image 
        source={{ uri: item.logo }} 
        style={styles.appLogo} 
      />
      <View style={styles.appDetails}>
        <Text style={styles.appName}>{item.name}</Text>
        <Text style={styles.appDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Store</Text>
        <View style={{ width: 40 }} />
      </View>
      
      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Intersend Apps</Text>
        <Text style={styles.bannerSubtitle}>
          Discover and use crypto apps without leaving your wallet
        </Text>
      </View>
      
      {/* App List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading apps...</Text>
        </View>
      ) : (
        <FlatList
          data={apps}
          renderItem={renderAppItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <Text style={styles.sectionTitle}>All Apps</Text>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No apps available</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
  },
  backButtonText: {
    color: '#037DD6',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  banner: {
    backgroundColor: '#EBF5FF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#BFDBFE',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 15,
    color: '#3B82F6',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 24,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  appItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  appLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  appDetails: {
    flex: 1,
    marginLeft: 16,
  },
  appName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});
