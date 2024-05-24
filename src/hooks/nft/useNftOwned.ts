import { useNFTWangContract } from "hooks";
import {
  useAddress,
  useOwnedNFTs,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";

export const useNftOwned = () => {
  const nft = useNFTWangContract();
  const address = useAddress() ?? null;
  const nftOwned = useOwnedNFTs(nft.contract, address);
  const claim = useContractWrite(nft.contract, "claimNft");

  const claimReward = async (tokenId: string) => {
    const claimNft = await claim.mutateAsync({ args: [tokenId] });
    return claimNft;
  };

  return {
    ...nftOwned,
    claimReward,
  };
};
