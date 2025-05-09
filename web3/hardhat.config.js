/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
require("@matterlabs/hardhat-zksync-deploy"); // For deploying to zkSync
require("@matterlabs/hardhat-zksync-solc"); // For compiling Solidity for zkSync
 // For contract verification (optional)
const PRIVATE_KEY =process.env.PRIVATE_KEY;
const RPC_URL = "https://zksync-sepolia.g.alchemy.com/v2/7oHM-4ALM3Y0U3qA_Vl25SY26_fxvY-8";
module.exports = {
  defaultNetwork: "zkSyncSepolia", // Set default to zkSync Sepolia
  networks: {
    hardhat: {
      chainId: 80001, // Kept for local testing; consider chainId 300 for zkSync local node
    },
    zkSyncSepolia: {
      url: RPC_URL,
      accounts:[`0x${PRIVATE_KEY}`], // Ensure PRIVATE_KEY is valid
      chainId: 300, // zkSync Sepolia chain ID
      zksync: true, // Enable zkSync-specific compilation
      verifyURL: "https://explorer.sepolia.zksync.dev/contract-verification", // For contract verification
    },
    // Uncomment if you need Polygon Mumbai later
    // polygon_mumbai: {
    //   url: "https://rpc.ankr.com/polygon_mumbai",
    //   accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    //   chainId: 80001,
    // },
  },
  solidity: {
    version: "0.8.17", // Updated to a more recent version compatible with zkSync
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  zksolc: {
    version: "latest", // Use the latest zkSync compiler version
    settings: {
      // zkSync-specific compiler settings
      optimizer: {
        enabled: true,
      },
    },
  },
};