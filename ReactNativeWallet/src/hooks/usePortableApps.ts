/**
 * App Discovery Hook
 * 
 * This file imports and re-exports the usePortableApps hook from the
 * Universal Portability SDK. The hook provides access to the catalog of 
 * available dApps that can be integrated with the wallet.
 * 
 * The hook returns:
 * - apps: Array of available applications with their metadata
 * - loading: Boolean indicating if apps are being fetched
 * - error: Any error that occurred during fetching
 * 
 * This is used in AppStoreScreen and WalletScreen to display available dApps.
 */
import { usePortableApps } from 'universal-portability';

export { usePortableApps };
