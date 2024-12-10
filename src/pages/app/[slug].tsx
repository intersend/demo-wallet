// pages/app/[slug].tsx
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { Port } from 'universal-portability';
import { usePortHandler } from '../../hooks/usePortHandler';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AppPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { address } = useAccount();
  
  // enable postMessage communication with the iframe
  usePortHandler();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <nav className="bg-[#1a1a1a] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <motion.button 
              whileHover={{ x: -5 }}
              className="text-gray-400 hover:text-white flex items-center gap-2"
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
        </div>
      </nav>

      {/* Full-screen Port component */}
      <div className="h-[calc(100vh-64px)]">
        <Port
          src={`https://app.intersend.io/apps/${slug}`}
          address={address}
          rpcUrl={'https://polygon-bor-rpc.publicnode.com'}
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default AppPage;