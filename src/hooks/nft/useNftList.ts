import { BigNumber } from "ethers";
import { useState, useEffect } from "react";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { FalconDefi } from "falcon-lite/typechain-types";
import { useUSDTContract, useNFTWangContract, useAccountMap } from "hooks";
import { useWangTokenContract } from "hooks/useWangTokenContract";

type BaseCardType = Awaited<ReturnType<FalconDefi["list"]>>;
type NFTType = BaseCardType & {
  id: BigNumber;
};

export const useNftList = () => {
  const address = useAddress();
  const usdt = useUSDTContract();
  const wang = useWangTokenContract();
  const account = useAccountMap();
  const nft = useNFTWangContract();
  const nftBuy = useContractWrite(nft.contract, "buyNftWith");
  const nftBuyWith = useContractWrite(nft.contract, "buyNftWith");
  const approveUsdt = useContractWrite(usdt.contract, "approve");
  const approveWang = useContractWrite(wang.contract, "approve");
  const [data, setData] = useState<NFTType[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!nft.contract) return;

    try {
      const nftList = await Promise.all(
        new Array(6).fill(null).map(async (_, cardId) => {
          const nftItem = await nft.contract!.call("list", [cardId]);
          return {
            ...nftItem,
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

  const buy = async (addressToken: string, listId: number) => {
    if (!address || !nft.contract || !usdt.contract) return;
    const card = data[listId];
    const cardPrice = card.price;
    const usdtBalance = await usdt.contract.call("balanceOf", [address]);
    const wangBalance = await wang.contract?.call("balanceOf", [address]);
    const allowanceUSDT = await usdt.contract.call("allowance", [
      address,
      nft.contract?.getAddress(),
    ]);
    const allowanceWANG = await wang.contract?.call("allowance", [
      address,
      nft.contract.getAddress(),
    ]);

    if (!account.data?.status) {
      throw {
        code: "RegistrationRequired",
      };
    }

    if (addressToken === wang.contract?.getAddress()) {
      if (cardPrice.gt(wangBalance)) {
        throw {
          code: "NotEnoughWangBalance",
        };
      }

      if (cardPrice.gte(allowanceWANG)) {
        await approveWang.mutateAsync({
          args: [nft.contract?.getAddress(), cardPrice.mul(10)],
        });
      }

      const receipt = await nftBuyWith.mutateAsync({
        args: [addressToken, listId],
      });
      return receipt;
    }

    if (cardPrice.gt(usdtBalance)) {
      throw {
        code: "NotEnoughUsdtBalance",
      };
    }

    if (cardPrice.gte(allowanceUSDT)) {
      await approveUsdt.mutateAsync({
        args: [nft.contract?.getAddress(), cardPrice.mul(10)],
      });
    }

    const receipt = await nftBuyWith.mutateAsync({
      args: [addressToken, listId],
    });
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
