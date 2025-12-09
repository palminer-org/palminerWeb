import { useWriteContract, useReadContract } from 'wagmi';
import { abi } from '../config/abi';
import { contractAddress } from '../config';

export function useKeyBalances(address: `0x${string}`) {
  return useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'keyBalances',
    args: [address],
  });
}

export function useClaim() {
  const { writeContract, data, status } = useWriteContract();
  const write = () => writeContract({ 
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'claim',
    args: [],
 });
 return { write, data, status };
}