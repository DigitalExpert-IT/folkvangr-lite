import React from "react";
import { fromBn } from "evm-bn";
import { useNFTWangContract } from "hooks";
import { CardProfile } from "./CardProfile";
import { Heading, Stack, Spinner } from "@chakra-ui/react";
import { useAddress, useContractRead } from "@thirdweb-dev/react";

export const CardProfileRank = () => {
  const nft = useNFTWangContract();
  const address = useAddress();
  const { data: totalInvest, isLoading } = useContractRead(
    nft.contract,
    "getTotalInvest",
    [address]
  );

  const getRank = () => {
    if (!totalInvest || totalInvest.length === 0) return 0;

    const investAmount = Number(fromBn(totalInvest, 18));
    if (isNaN(investAmount)) return 0;

    const rankings = [
      { threshold: 10000, rank: "Priority" },
      { threshold: 5000, rank: "Solid Gold" },
      { threshold: 1000, rank: "Gold" },
      { threshold: 500, rank: "Silver" },
      { threshold: 300, rank: "Bronze" },
      { threshold: 100, rank: "Classic" },
      { threshold: 0, rank: "-" },
    ];

    for (const { threshold, rank } of rankings) {
      if (investAmount >= threshold) {
        return rank;
      }
    }

    return "-";
  };

  if (isLoading) return <Spinner />;

  return (
    <CardProfile
      py={"4"}
      bgGradient="linear-gradient(118deg, #1D73CD 4.67%, #02E4A4 97.62%)"
      height="15em"
    >
      <Stack
        gap={{ base: "4", sm: "8", lg: "0" }}
        justify={"center"}
        placeItems={"center"}
        spacing={{ base: "none", md: 5 }}
      >
        <Heading>NFT Investment</Heading>
        <Heading
          fontSize="5xl"
          mt={"4"}
          textAlign={{ base: "start", lg: "center" }}
        >
          {getRank()}
        </Heading>
      </Stack>
    </CardProfile>
  );
};
