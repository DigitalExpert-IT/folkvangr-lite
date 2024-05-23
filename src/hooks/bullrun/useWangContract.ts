import { useContract } from "@thirdweb-dev/react";
import { WANGCAPITAL_CONTRACT } from "constant/address";
import wangcapital from "falcon-lite/artifacts/contracts/NetworkReferral.sol/NetworkReferral.json";
export const CURRENT_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;

const contractAddress = WANGCAPITAL_CONTRACT[CURRENT_CHAIN_ID as "0x38"];

export const useWangContract = () => {
  return useContract(contractAddress, wangcapital.abi);
};
