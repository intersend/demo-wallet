// pages/app/[slug].tsx
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { Port } from 'universal-portability';
import { usePortHandler } from '../../hooks/usePortHandler';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePortableApps } from 'universal-portability';
import { useState, useEffect } from 'react';
import { App } from '../../types/app';

const AppPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { address } = useAccount();
  const { apps } = usePortableApps();
  const [currentApp, setCurrentApp] = useState<App | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // enable postMessage communication with the iframe
  usePortHandler();

  useEffect(() => {
    if (apps && slug) {
      const foundApp = apps.find((a: any) => a.slug === slug);
      if (foundApp) {
        // Convert PortableApp to App type with required fields
        const appData: App = {
          id: foundApp.id,
          name: foundApp.name,
          slug: foundApp.slug,
          logo: foundApp.logo,
          description: foundApp.description,
          category: foundApp.category,
          url: `https://app.intersend.io/apps/${foundApp.slug}`,
          privacy_policy: '',
          terms: '',
          screenshots: [],
          about: '',
          features: [],
          developer: 'Unknown Developer',
          link: '',
          developer_website: '#',
          createdAt: new Date().toISOString(),
          kyc: false,
          banner: foundApp.logo
        };
        setCurrentApp(appData);
      }
    }
  }, [apps, slug]);

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      {/* MetaMask-style header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[420px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <motion.button 
              whileHover={{ x: -2 }}
              className="text-[#037DD6] flex items-center gap-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              Back to Wallet
            </motion.button>
          </Link>
          {currentApp && (
            <div className="flex items-center gap-2">
              <img
                src={currentApp.logo}
                alt={currentApp.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="font-medium text-sm">{currentApp.name}</span>
            </div>
          )}
        </div>
      </nav>

      {/* App Info Banner */}
      {currentApp && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[420px] mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentApp.logo}
                  alt={currentApp.name}
                  className="w-12 h-12 rounded-xl shadow-md"
                />
                <div>
                  <h1 className="font-bold text-lg">{currentApp.name}</h1>
                  <p className="text-sm text-gray-500">by {currentApp.developer}</p>
                </div>
              </div>
              {/* <a
                href={currentApp.developer_website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#037DD6] text-sm hover:underline"
              >
                Visit Website
              </a> */}
            </div>
          </div>
        </div>
      )}

      {/* Port Component Container */}
      <div className="max-w-[420px] mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden relative"
        >
          {/* Universal Portability Badge */}
          {/* <div className="absolute top-4 right-4 z-10">
            <div className="bg-[#037DD6] text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Universal Portability</span>
            </div>
          </div> */}

          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 bg-white z-20 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#037DD6]"></div>
            </div>
          )}

          {/* Port Component */}
          <div className="relative">
            <Port
              src={`https://fd5a-142-115-84-241.ngrok-free.app/apps/${slug}`}
              address={address}
              rpcUrl={'https://polygon-bor-rpc.publicnode.com'}
              height="600px"
              width="100%"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 bg-[#037DD6]/5 rounded-lg p-4 border border-[#037DD6]/10"
        >
          <h3 className="text-sm font-medium text-[#037DD6] mb-2">Intersend in Action</h3>
          <p className="text-sm text-gray-600">
            This is a demo of seamless dApp integration. The app above runs in a secure iframe that acts as a bridge between user's wallet and the dApp. The user's wallet address is shared with the app, and connected automatically.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <a 
              href="https://intersend.mintlify.app/waas/overview-waas" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-[#037DD6] hover:underline flex items-center gap-1"
            >
              Get Started
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <span className="text-xs text-gray-500">Add this app in less than 5 minutes</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AppPage;
