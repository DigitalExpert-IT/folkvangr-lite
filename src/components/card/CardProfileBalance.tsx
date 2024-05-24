import { prettyBn } from "utils";
import { BigNumber } from "ethers";
import { Trans } from "react-i18next";
import { useUSDTContract } from "hooks";
import { useEffect, useState } from "react";
import { ZERO_ADDRESS } from "constant/address";
import { CardProfileBonus } from "./CardProfileBonus";
import { WidgetProfileBalance } from "components/widget";
import { useAddress, useBalance } from "@thirdweb-dev/react";
import { HStack, Image, Stack, Text } from "@chakra-ui/react";
import { useWangTokenContract } from "hooks/useWangTokenContract";

export const CardProfileBalance = () => {
  const balance = useBalance();
  const address = useAddress() ?? ZERO_ADDRESS;
  const usdt = useUSDTContract();
  const wang = useWangTokenContract();

  const [wangBalance, setWangBalance] = useState<BigNumber>();
  const [usdtBalance, setUsdtBalance] = useState<BigNumber>();

  const getBalance = async () => {
    setWangBalance((await wang.contract?.call("balanceOf", [address])) ?? 0);
    setUsdtBalance((await usdt.contract?.call("balanceOf", [address])) ?? 0);
  };

  useEffect(() => {
    if (address !== ZERO_ADDRESS) {
      getBalance();
    }
  }, [address]);

  return (
    <Stack
      bg="#091E2A"
      rounded="2.5rem"
      p={{ base: "5", lg: "10" }}
      height="full"
      justify="center"
    >
      <Text fontSize={"xl"} textAlign={"left"}>
        <Trans i18nKey="common.balance" />
      </Text>
      <Stack gap={"2"} w={"full"}>
        <WidgetProfileBalance
          bg="transparent"
          border="1px solid white"
          px="1rem"
          rounded="xl"
        >
          <Image src="/assets/logo/folkvangr-mini.png" alt="Logo FLD" w={10} />
          <HStack w={"full"} justifyContent={{ base: "end", xs: "center" }}>
            <Text>{prettyBn(wangBalance, 18)} WANG</Text>
          </HStack>
        </WidgetProfileBalance>
        <WidgetProfileBalance
          bg="transparent"
          border="1px solid white"
          px="1rem"
          rounded="xl"
        >
          <Image
            src="/assets/logo/bnb-logo.png"
            alt="Logo Polygon"
            w={10}
            left={"0"}
          />
          <HStack w={"full"} justifyContent={{ base: "end", xs: "center" }}>
            <Text>
              {prettyBn(balance.data?.value, 18)} {balance.data?.symbol}
            </Text>
          </HStack>
        </WidgetProfileBalance>
        <WidgetProfileBalance
          bg="transparent"
          border="1px solid white"
          px="1rem"
          rounded="xl"
        >
          <Image
            src="/assets/logo/tether-logo-white.png"
            alt="Logo Tether"
            w={10}
            left={"0"}
          />
          <HStack w={"full"} justifyContent={{ base: "end", xs: "center" }}>
            <Text>{prettyBn(usdtBalance, 18)} USDT</Text>
          </HStack>
        </WidgetProfileBalance>
      </Stack>
      <CardProfileBonus />
    </Stack>
  );
};
