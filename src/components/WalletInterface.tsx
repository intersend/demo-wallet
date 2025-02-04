import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePortableApps } from 'universal-portability';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function WalletInterface() {
  const { address } = useAccount();
  const { apps } = usePortableApps();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('assets');

  const handleAppClick = (app: any) => {
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
      <div className="min-h-screen bg-[#037DD6] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {/* <img 
            src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
            alt="MetaMask Logo"
            className="w-32 h-32 mx-auto mb-8"
          /> */}
          <h1 className="text-4xl font-bold text-white mb-8">Welcome to Demo Wallet</h1>
          <ConnectButton />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#24272A]">
      {/* MetaMask-style header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-[420px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
              alt="MetaMask Logo"
              className="w-8 h-8"
            /> */}
            <span className="text-xl font-medium">XYZ Wallet</span>
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
        <h2 className="text-xl font-bold mt-8 mb-4">Explore dApps</h2>
        <div className="grid grid-cols-1 gap-4">
          {apps.map((app) => (
            <motion.div
              key={app.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer"
              onClick={() => handleAppClick(app)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={app.logo}
                  alt={app.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{app.name}</h3>
                  <p className="text-sm text-gray-500">{app.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}