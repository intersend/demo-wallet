import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePortableApps } from 'universal-portability';
import { useRouter } from 'next/router';

export function WalletInterface() {
  const { address } = useAccount();
  const { apps } = usePortableApps();

  const router = useRouter();

  const handleAppClick = (app: any) => {
    router.push(`/app/${app.slug}`);
  };


  // Fake wallet data
  const walletData = {
    balance: '4.2831 ETH',
    dollarValue: '$8,245.12',
    tokens: [
      { symbol: 'USDC', balance: '1,234.56', icon: '💰' },
      { symbol: 'MATIC', balance: '2,500', icon: '🔷' },
    ]
  };

  if (!address) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-8">Welcome to Demo Wallet</h1>
          <ConnectButton />
        </motion.div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="bg-[#1a1a1a] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-medium">Demo Wallet</span>
          <ConnectButton />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Wallet Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 mb-8"
        >
          <p className="text-gray-200">Total Balance</p>
          <h2 className="text-4xl font-bold mb-2">{walletData.balance}</h2>
          <p className="text-gray-200">{walletData.dollarValue} USD</p>
        </motion.div>

        {/* Tokens Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {walletData.tokens.map((token) => (
            <motion.div
              key={token.symbol}
              whileHover={{ scale: 1.02 }}
              className="bg-[#1a1a1a] rounded-xl p-4"
            >
              <span className="text-2xl mb-2">{token.icon}</span>
              <h3 className="font-medium">{token.symbol}</h3>
              <p className="text-gray-400">{token.balance}</p>
            </motion.div>
          ))}
        </div>

        {/* dApps Section */}
        <h2 className="text-2xl font-bold mb-6">Explore dApps</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <motion.div
            key={app.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#1a1a1a] rounded-xl p-6 cursor-pointer"
            onClick={() => handleAppClick(app)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={app.logo}
                alt={app.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium">{app.name}</h3>
                <p className="text-sm text-gray-400">{app.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </main>
    </div>
  );
}