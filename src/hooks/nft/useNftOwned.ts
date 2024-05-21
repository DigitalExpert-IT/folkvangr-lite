import { useNFTBullRunContract } from "hooks";
import {
  useAddress,
  useOwnedNFTs,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";

export const useNftOwned = () => {
  const nft = useNFTBullRunContract();
  const address = useAddress() ?? null;
  const claim = useContractWrite(nft.contract, "claimNft");
  const isStartedClaim = useContractRead(nft.contract, "isStartedClaim");
  const nftOwned = useOwnedNFTs(nft.contract, address);

  const claimReward = async (tokenId: string) => {
    const claimNft = await claim.mutateAsync({ args: [tokenId] });
    return claimNft;
  };

  return {
    ...nftOwned,
    claimReward,
    isStartedClaim,
  };
};
