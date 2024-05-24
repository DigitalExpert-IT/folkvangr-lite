import { WANGTOKEN_CONTRACT } from "constant/address";
import { useContract } from "@thirdweb-dev/react";
import { CURRENT_CHAIN_ID } from "./wang";
import wang from "falcon-lite/artifacts/contracts/Roi.sol/Roi.json";

const contractAddress = WANGTOKEN_CONTRACT[CURRENT_CHAIN_ID as "0x38"];

export const useWangTokenContract = () => {
  return useContract(contractAddress, wang.abi);
};
