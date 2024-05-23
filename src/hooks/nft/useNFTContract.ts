import { useContract } from "@thirdweb-dev/react";
import { NFT_WANG } from "constant/address";
import { CURRENT_CHAIN_ID } from "hooks/bullrun";
import nft from "falcon-lite/artifacts/contracts/nft.sol/FalconDefi.json";

const contractAddress = NFT_WANG[CURRENT_CHAIN_ID as "0x38"];

export const useNFTWangContract = () => {
  return useContract(contractAddress, nft.abi);
};
