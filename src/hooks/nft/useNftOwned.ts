import { useNFTWangContract } from "hooks";
import { FalconDefi } from "falcon-lite/typechain-types";
import {
  useAddress,
  useOwnedNFTs,
  useContractWrite,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { BigNumber } from "ethers";

type OwnedNftMap = Awaited<ReturnType<FalconDefi["getTokenSoldById"]>>;
export type OwnedNftType = OwnedNftMap & {
  id: BigNumber;
  tokenuri: string;
};

export const useNftOwned = () => {
  const nft = useNFTWangContract();
  const address = useAddress() ?? null;
  const { data: ownedNfts, isLoading } = useOwnedNFTs(
    nft.contract,
    address ?? null
  );
  const claim = useContractWrite(nft.contract, "grind");
  const [data, setData] = useState<OwnedNftType[]>([]);

  const fetch = async () => {
    if (!nft.contract || !ownedNfts) return;
    try {
      const nfts = await Promise.all(
        ownedNfts.map(async (item) => {
          const ownedNft = await nft.contract!.call("getTokenSoldById", [
            item.metadata.id,
          ]);
          const tokenUri = `/api/nft/${item.metadata.id}`;
          return {
            ...ownedNft,
            id: BigNumber.from(item.metadata.id),
            tokenuri: tokenUri,
          };
        })
      );
      setData(nfts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!address || isLoading) return;
    fetch();
  }, [address, nft.contract, ownedNfts]);

  const claimReward = async (tokenId: string) => {
    const claimNft = await claim.mutateAsync({ args: [tokenId] });
    return claimNft;
  };

  return {
    isLoading,
    claimReward,
    data,
  };
};
