import { prettyBn } from "utils";
import { BigNumber } from "ethers";
import { useState, useEffect } from "react";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { Bullcuan } from "pass-bullrun/typechain-types";
import {
  useUSDTContract,
  useNFTBullRunContract,
  useBullRunContract,
  useAccountMap,
} from "hooks";

type BaseCardType = Awaited<ReturnType<Bullcuan["listPreMinted"]>>;
type NFTType = BaseCardType & {
  id: BigNumber;
  price: BigNumber;
};

export const useNftList = () => {
  const address = useAddress();
  const usdt = useUSDTContract();
  const account = useAccountMap();
  const nft = useNFTBullRunContract();
  const nftBuy = useContractWrite(nft.contract, "buyNft");
  const approveUsdt = useContractWrite(usdt.contract, "approve");
  const [data, setData] = useState<NFTType[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!nft.contract) return;

    try {
      const nftList = await Promise.all(
        new Array(6).fill(null).map(async (_, cardId) => {
          const nftItem = await nft.contract!.call("listPreMinted", [cardId]);
          return {
            ...nftItem,
            price: BigNumber.from(nftItem),
            id: BigNumber.from(cardId),
          };
        })
      );
      setData(nftList);
    } catch (error) {
      console.log("Error fetching NFT:", error);
    } finally {
      setLoading(false);
    }
  };

  const buy = async (listId: number) => {
    if (!address || !nft.contract || !usdt.contract) return;
    const card = data[listId];
    const cardPrice = card.price;
    const usdtBalance = await usdt.contract.call("balanceOf", [address]);
    const allowance = await usdt.contract.call("allowance", [
      address,
      nft.contract?.getAddress(),
    ]);

    if (!account.data?.status) {
      throw {
        code: "RegistrationRequired",
      };
    }

    if (cardPrice.gt(usdtBalance)) {
      throw {
        code: "NotEnoughUSDTBalance",
      };
    }

    if (cardPrice.gte(allowance)) {
      await approveUsdt.mutateAsync({
        args: [nft.contract?.getAddress(), cardPrice.mul(10)],
      });
    }

    const receipt = await nftBuy.mutateAsync({ args: [listId] });
    return receipt;
  };

  useEffect(() => {
    fetchData();
  }, [nft.contract]);

  return {
    isLoading: isLoading || nft.isLoading,
    data,
    buy,
  };
};
