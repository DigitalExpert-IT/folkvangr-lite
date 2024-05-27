import { Box, Heading, Stack, Text, Button, Image } from "@chakra-ui/react";
import { USDT_CONTRACT, WANGTOKEN_CONTRACT } from "constant/address";
import { CARD_IMAGE_MAP } from "constant/image";
import {
  useNftList,
  useAsyncCall,
  useUSDTContract,
  CURRENT_CHAIN_ID,
} from "hooks";
import { useWangTokenContract } from "hooks/useWangTokenContract";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CardListNFTProps {
  title: string;
  price: string;
  id: number;
}

const usdt = USDT_CONTRACT[CURRENT_CHAIN_ID as "0x38"];
const wang = WANGTOKEN_CONTRACT[CURRENT_CHAIN_ID as "0x38"];
export const CardListNFT: React.FC<CardListNFTProps> = (props) => {
  const { t } = useTranslation();
  const { buy } = useNftList();

  const { exec, isLoading } = useAsyncCall(buy, t("common.succesBuyNft"));

  const handleBuyUsdt = () => {
    exec(usdt, props.id);
  };

  const handleBuyWang = () => {
    exec(wang, props.id);
  };

  return (
    <Box textAlign="center" rounded="xl" overflow="hidden">
      <Heading textTransform="uppercase" py="1">
        {props.title}
      </Heading>
      <Stack
        rounded="xl"
        color="white"
        bgGradient="linear(130deg, #1C77CC, #02E5A3)"
        p="3px"
      >
        <Stack bgColor="#0A1022" p="1.4rem" rounded="xl">
          <Stack>
            <Box as="video" autoPlay loop muted rounded="xl">
              <source src={CARD_IMAGE_MAP[props.id as 0]} type="video/mp4" />
            </Box>
            <Box py="1rem">
              <Text fontWeight="600">
                Mint Price {props.price} WANG or {props.price} USDT
              </Text>
              {/* <Text color="#03E1A5" fontSize="md">
                Gacha: 0.7%, 0.8%, 0.9%, 1%, 1.1%, 1.3%, 1.5%
              </Text> */}
              <Stack alignItems="center" py="1rem">
                <Button
                  w="100%"
                  rounded="lg"
                  background="#0B5454"
                  _hover={{ background: "#073c3c" }}
                  onClick={() => handleBuyUsdt()}
                  isLoading={isLoading}
                >
                  Buy with {props.price} USDT
                </Button>
                <Button
                  w="100%"
                  rounded="lg"
                  background="#0B5454"
                  _hover={{ background: "#073c3c" }}
                  onClick={() => handleBuyWang()}
                  isLoading={isLoading}
                >
                  Buy with {props.price} WANG
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
