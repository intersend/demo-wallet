import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePortableApps } from 'universal-portability';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { App } from '../types/app';

interface EnhancedApp extends App {
  rating?: string;
  users?: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

export function WalletInterface() {
  const { address } = useAccount();
  const { apps } = usePortableApps();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('assets');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Categories for dApps
  const categories = [
    { id: 'all', name: 'All dApps' },
    { id: 'defi', name: 'DeFi' },
    { id: 'nft', name: 'NFTs' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'social', name: 'Social' }
  ];

  // Enhanced apps with additional metadata
  const enhancedApps = (apps as App[]).map(app => ({
    ...app,
    rating: '4.5',
    users: '10k+',
    isFeatured: Math.random() > 0.7, // Randomly mark some apps as featured
    isNew: Math.random() > 0.8, // Randomly mark some apps as new
  })) as EnhancedApp[];

  const filteredApps = enhancedApps.filter(app => 
    selectedCategory === 'all' || app.category.includes(selectedCategory.toUpperCase())
  );

  const featuredApps = enhancedApps.filter(app => app.isFeatured);

  const handleAppClick = (app: EnhancedApp) => {
    router.push(`/app/${app.slug}`);
  };

  // Enhanced fake wallet data
  const walletData = {
    mainBalance: '4.2831 ETH',
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

  if (!address) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#037DD6] to-[#1a5f9c] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-32 h-32 mx-auto mb-8 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-20 h-20 text-[#037DD6]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Universal Wallet by Intersend</h1>
          <p className="text-white/80 mb-8">A replica wallet to demonstrate how Intersend experience feels like</p>
          <div className="flex items-center justify-center">
            <ConnectButton />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#24272A]">
      {/* MetaMask-style header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[420px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#037DD6] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-medium">Universal Wallet</span>
          </div>
          <ConnectButton />
        </div>
      </nav>

      <main className="max-w-[420px] mx-auto px-4 py-6">
        {/* Account Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl font-bold mb-2">{walletData.dollarValue}</h2>
          <p className="text-gray-600">{walletData.mainBalance}</p>
          <p className="text-gray-400 text-xs mt-1 italic">Note: All numbers and data shown are for demonstration purposes only</p>
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button className="bg-[#037DD6] text-white px-6 py-2 rounded-full flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Send
            </button>
            <button className="bg-[#037DD6] text-white px-6 py-2 rounded-full flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Receive
            </button>
            <button className="bg-[#037DD6] text-white px-6 py-2 rounded-full flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Swap
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`flex-1 py-2 text-center ${activeTab === 'assets' ? 'border-b-2 border-[#037DD6] text-[#037DD6]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('assets')}
          >
            Assets
          </button>
          <button
            className={`flex-1 py-2 text-center ${activeTab === 'activity' ? 'border-b-2 border-[#037DD6] text-[#037DD6]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
        </div>

        {/* Assets Tab Content */}
        {activeTab === 'assets' && (
          <div className="space-y-4">
            {walletData.tokens.map((token) => (
              <motion.div
                key={token.symbol}
                whileHover={{ scale: 1.01 }}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{token.icon}</span>
                  <div>
                    <h3 className="font-medium">{token.name}</h3>
                    <p className="text-sm text-gray-500">{token.balance} {token.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{token.dollarValue}</p>
                  <p className={`text-sm ${token.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {token.change}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Activity Tab Content */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            {walletData.recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`
                      ${activity.type === 'Send' ? 'text-red-500' : ''}
                      ${activity.type === 'Receive' ? 'text-green-500' : ''}
                      ${activity.type === 'Swap' ? 'text-blue-500' : ''}
                    `}>
                      {activity.type}
                    </span>
                    <span className="text-gray-500">{activity.asset}</span>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{activity.hash}</p>
                  <span className={`text-sm px-2 py-1 rounded ${
                    activity.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* dApps Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">Explore dApps</h2>
              <div className="animate-pulse">
                <span className="bg-[#037DD6]/10 text-[#037DD6] text-xs px-2 py-1 rounded-full border border-[#037DD6]/20">
                  Powered by Intersend
                </span>
              </div>
            </div>
          </div>

          {/* Categories */}
          {/* <div className="mb-6 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-[#037DD6] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div> */}

          {/* Featured Apps */}
          {selectedCategory === 'all' && featuredApps.length > 0 && (
            <div className="mb-6">
              {/* <h3 className="text-lg font-semibold mb-4">Featured dApps</h3> */}
              <div className="grid grid-cols-1 gap-4">
                {featuredApps.map((app) => (
                  <motion.div
                    key={app.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-[#037DD6]/10 to-transparent border border-[#037DD6]/20 rounded-lg p-4 cursor-pointer relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#037DD6]/10 hover:border-[#037DD6]/40 hover:scale-[1.02]"
                    onClick={() => handleAppClick(app)}
                  >
                    <div className="absolute top-2 right-2">
                      <span className="bg-[#037DD6] text-white text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <img
                        src={app.logo}
                        alt={app.name}
                        className="w-12 h-12 rounded-xl shadow-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{app.name}</h3>
                          {app.isNew && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2">{app.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-500">⭐ {app.rating}</span>
                          <span className="text-xs text-gray-500">👥 {app.users} users</span>
                          <span className="text-xs text-[#037DD6]">{app.category[0]}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* All/Filtered Apps */}
          <div className="grid grid-cols-1 gap-4">
            {filteredApps.map((app) => (
              <motion.div
                key={app.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer relative transition-all duration-300 hover:shadow-lg hover:shadow-[#037DD6]/10 hover:border-[#037DD6]/30 hover:scale-[1.02]"
                onClick={() => handleAppClick(app)}
              >
                {app.isNew && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <img
                    src={app.logo}
                    alt={app.name}
                    className="w-12 h-12 rounded-xl shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{app.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{app.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500">⭐ {app.rating}</span>
                      <span className="text-xs text-gray-500">👥 {app.users} users</span>
                      <span className="text-xs text-[#037DD6]">{app.category[0]}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
