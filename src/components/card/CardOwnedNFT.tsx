import React from "react";
import { CARD_IMAGE_MAP } from "constant/image";
import { useContractRead } from "@thirdweb-dev/react";
import { useAsyncCall, useNFTWangContract, useNftOwned } from "hooks";
import {
  Stack,
  Box,
  Text,
  Button,
  Spinner,
  AspectRatio,
} from "@chakra-ui/react";
import { fromBn } from "evm-bn";
import { useTranslation } from "react-i18next";
import { RANK_NFT } from "constant/ranknft";

interface CardOwnedNFTProps {
  id: string;
}

export const CardOwnedNFT: React.FC<CardOwnedNFTProps> = (props) => {
  const { t } = useTranslation();
  const nft = useNFTWangContract();
  const { claimReward } = useNftOwned();
  const { data, isLoading } = useContractRead(
    nft.contract,
    "getTokenSoldById",
    [props.id]
  );
  const { exec, isLoading: claimLoading } = useAsyncCall(
    claimReward,
    t("form.message.claimSuccess")
  );

  const handleClaim = async () => {
    await exec(props.id);
  };

  return (
    <Box>
      <Stack
        p="0.5"
        mt="5"
        bgGradient="linear(130deg, #1C77CC, #02E5A3)"
        borderRadius="xl"
      >
        {isLoading ? (
          <Box display="flex" justifyContent="center" minH="55vh" w="100%">
            <Spinner size="sm" />
          </Box>
        ) : (
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
                    src={CARD_IMAGE_MAP[data.listId as "0"]}
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
                    RANK_NFT[data.listId as "0"]}
                </Text>
              </Box>
              <Stack direction="row" spacing={1} justify="space-between">
                <Text fontWeight="bold" fontSize="16px">
                  Daily Rewards : {fromBn(data.rewardPerday, 18)} USDT
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  {Number(data.pecentage) / 100 + "%"}
                </Text>
              </Stack>
              <Text fontWeight="bold" fontSize="md">
                Max Farm : {fromBn(data.maxFarm, 18)} USDT
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
              isLoading={claimLoading}
            >
              Claim
            </Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
};
