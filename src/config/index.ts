/*
 * @Author: wuqiang
 * @Date: 2024-06-03 22:41:13
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-04 14:38:53
 */
import { http, createConfig } from 'wagmi'
// Keep sepolia and zkSync imports as reference (used in comments)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { sepolia, zkSync, bscTestnet } from 'wagmi/chains'
import { bscTestnet, bsc } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

// Determine if it's production environment based on environment variables
// VITE_ENV can be 'production' or 'test', default is 'test'
const isProduction = import.meta.env.VITE_ENV === 'production' || import.meta.env.MODE === 'production'

// Contract address mapping
const contractAddressMap = {
  [bscTestnet.id]: '0x03De2b59EA8BCFc983c7886a381912d1E1e3aB72', // BSC Testnet
  [bsc.id]: '0xc5E8D00f37c1d7cAfDd2265780D967796E3EE5B4', // BSC Mainnet
}

// Select chain and contract address based on environment
const selectedChain = isProduction ? bsc : bscTestnet
export const contractAddress = contractAddressMap[selectedChain.id]

// API base URL (can be configured via environment variables)
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://palminer-api.example.app'

// RPC URL configuration (can be configured via environment variables to avoid rate limiting)
const getRpcUrl = () => {
  if (isProduction) {
    // BSC Mainnet RPC
    return import.meta.env.VITE_BSC_RPC_URL || 'https://bsc-dataseed1.binance.org'
  } else {
    // BSC Testnet RPC
    return import.meta.env.VITE_BSC_TESTNET_RPC_URL || 'https://data-seed-prebsc-1-s1.binance.org:8545'
  }
}

export const config = createConfig({
  chains: [selectedChain],
  transports: {
    [selectedChain.id]: http(getRpcUrl()),
  } as Record<typeof selectedChain.id, ReturnType<typeof http>>,
  connectors: [
    metaMask({
      defaultReadOnlyChainId: selectedChain.id,
    })
  ],
})