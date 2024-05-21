import { useContract } from "@thirdweb-dev/react";
import { BULLRUN_CONTRACT } from "constant/address";
import bullrun from "pass-bullrun/artifacts/contracts/Network.sol/Network.json";
export const CURRENT_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;

const contractAddress = BULLRUN_CONTRACT[CURRENT_CHAIN_ID as "0x38"];

export const useBullRunContract = () => {
  return useContract(contractAddress, bullrun.abi);
};
