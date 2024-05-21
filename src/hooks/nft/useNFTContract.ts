import { useContract } from "@thirdweb-dev/react";
import { NFT_BULLRUN } from "constant/address";
import { CURRENT_CHAIN_ID } from "hooks/bullrun";
import nft from "pass-bullrun/artifacts/contracts/Nft.sol/Bullcuan.json";

const contractAddress = NFT_BULLRUN[CURRENT_CHAIN_ID as "0x38"];

export const useNFTBullRunContract = () => {
  return useContract(contractAddress, nft.abi);
};
