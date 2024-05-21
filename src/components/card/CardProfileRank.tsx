import React from "react";
// import { RANK_LEVEL } from "constant/rankLevel";
// import { useAccountMap } from "hooks/valhalla";
import { CardProfile } from "./CardProfile";
import { Heading, Stack, Spinner } from "@chakra-ui/react";
// import { useAddress, useContractRead } from "@thirdweb-dev/react";
// import { useNFTFolkContract } from "hooks/useNFTFolkContract";
// import { fromBn } from "evm-bn";

export const CardProfileRank = () => {
  // const nft = useNFTFolkContract();
  // const address = useAddress();
  // const { data, isLoading } = useAccountMap();
  // const { data: personalBuy } = useContractRead(nft.contract, "personalBuy", [
  //   address,
  // ]);

  // const getRank = () => {
  //   if (data === undefined || personalBuy === undefined) return 0;
  //   if (data?.isLeader === true) return 12;
  //   return (
  //     RANK_LEVEL.find((rank, idx) => {
  //       if (idx + 1 === RANK_LEVEL.length) return RANK_LEVEL[idx];
  //       return (
  //         (Number(fromBn(data.omzet, 18)) >= rank.omzet &&
  //           Number(fromBn(data.omzet, 18)) < RANK_LEVEL[idx + 1].omzet) ||
  //         (Number(fromBn(personalBuy, 18)) >= rank.personalBuy &&
  //           Number(fromBn(personalBuy, 18)) < RANK_LEVEL[idx + 1].personalBuy)
  //       );
  //     })?.level ?? 0
  //   );
  // };

  // if (isLoading) return <Spinner />;

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
        <Heading>Rank</Heading>
        <Heading
          fontSize="8xl"
          mt={"4"}
          textAlign={{ base: "start", lg: "center" }}
        >
          #S
        </Heading>
      </Stack>
    </CardProfile>
  );
};
