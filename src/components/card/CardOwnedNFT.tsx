import React, { useLayoutEffect, useRef } from "react";
import { CARD_IMAGE_MAP } from "constant/image";
import { useAsyncCall, useNFTWangContract, useNftOwned } from "hooks";
import {
  Stack,
  Box,
  Text,
  Button,
  AspectRatio,
  useToast,
} from "@chakra-ui/react";
import { fromBn } from "evm-bn";
import { useTranslation } from "react-i18next";
import { RANK_NFT } from "constant/ranknft";
import { OwnedNftType } from "hooks";
import { BigNumber } from "ethers";
import { differenceInSeconds } from "date-fns";
import { useContractWrite } from "@thirdweb-dev/react";

export const CardOwnedNFT = ({
  listId,
  price,
  maxFarm,
  pecentage,
  rewardPerday,
  lastClaimAt,
  tokenuri,
  id,
}: OwnedNftType) => {
  const toast = useToast();
  const { t } = useTranslation();
  const nft = useNFTWangContract();
  const claim = useContractWrite(nft.contract, "grind");
  const claimAsync = useAsyncCall(claim.mutateAsync);
  const intervalRef = useRef<NodeJS.Timer>();
  const farmTextRef = useRef<HTMLParagraphElement>(null);
  const lastFarmedAtRef = useRef<BigNumber>(lastClaimAt);

  const handleClaim = async () => {
    const claiming = await claimAsync.exec({ args: [id] });
    const isSuccesClaim = claiming.receipt?.status === 1;
    if (isSuccesClaim) {
      toast({ status: "success", description: t("form.message.claimSuccess") });
      lastFarmedAtRef.current = BigNumber.from(
        Math.round(new Date().getTime() / 1000)
      );
    }
  };

  useLayoutEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!farmTextRef.current) return;

      const farmPerDay = price.mul(pecentage).div(10000);
      const farmPerSec = farmPerDay.div(86400);
      const secDiff = differenceInSeconds(
        new Date(),
        new Date(Number(lastFarmedAtRef.current) * 1000)
      );
      const farmValue = farmPerSec.mul(secDiff);
      farmTextRef.current.innerText = fromBn(farmValue, 18);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Box>
      <Stack
        p="0.5"
        mt="5"
        bgGradient="linear(130deg, #1C77CC, #02E5A3)"
        borderRadius="xl"
      >
        <Box
          borderRadius="xl"
          bg="#1E1E1E"
          px={{ base: 1.5, sm: 2, md: 5 }}
          py={5}
        >
          <Box rounded="xl" overflow="hidden" m="2">
            <AspectRatio w={{ base: "2xs", md: "xs" }} ratio={1}>
              <Box as="video" autoPlay loop muted rounded="xl">
                <source
                  src={CARD_IMAGE_MAP[Number(listId) as 0]}
                  type="video/mp4"
                />
              </Box>
            </AspectRatio>
          </Box>
          <Stack my="5">
            <Box>
              <Text
                fontWeight="bold"
                textTransform="capitalize"
                color="#05D9A8"
                fontSize="16px"
              >
                {t("common.globalNetworkFarm") +
                  " " +
                  RANK_NFT[Number(listId) as 0]}
              </Text>
            </Box>
            <Stack direction="row" spacing={1} justify="space-between">
              <Text fontWeight="bold" fontSize="16px">
                Daily Rewards : {fromBn(rewardPerday, 18)} USDT
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                {Number(pecentage) / 100 + "%"}
              </Text>
            </Stack>
            <Text fontWeight="bold" fontSize="md">
              Max Farm : {fromBn(maxFarm, 18)} USDT
            </Text>
          </Stack>
          <Button
            w="full"
            rounded="lg"
            size="sm"
            variant="solid"
            colorScheme="teal"
            color="white"
            onClick={handleClaim}
            isLoading={claimAsync.isLoading}
          >
            <Text ref={farmTextRef} mr="1" as="span">
              0
            </Text>
            Claim
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
