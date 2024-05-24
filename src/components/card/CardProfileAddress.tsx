import { t } from "i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CardProfile } from "./CardProfile";
import { IoCopyOutline } from "react-icons/io5";
import { useAddress } from "@thirdweb-dev/react";
import { WANGNETWORK_CONTRACT, WANGTOKEN_CONTRACT } from "constant/address";
import { CopiableText } from "components/CopiableText";
import { CURRENT_CHAIN_ID, useAccountMap } from "hooks";
import { WidgetProfileBalance } from "components/widget";
import { Center, Text, VStack } from "@chakra-ui/react";

const wangContract = WANGTOKEN_CONTRACT[CURRENT_CHAIN_ID as "0x38"];

export const CardProfileAddress = () => {
  const router = useRouter();
  const [defaultHost, setDefaultHost] = useState("");
  const accountMap = useAccountMap();
  const address = useAddress() ?? "0x0";

  useEffect(() => {
    if (router.isReady) {
      setDefaultHost(
        `${window.location.protocol}//${window.location.host}/register?ref=`
      );
    }
  }, [router.isReady]);

  return (
    <CardProfile placeContent="left" align="left">
      <VStack gap={"8"} mt="1rem">
        <WidgetProfileBalance w="full" justifyContent="center">
          <Center py={"2"}>
            <CopiableText
              alignItems={"left"}
              textAlign={"left"}
              gap={2}
              fontSize={{ base: "2xs", sm: "xs", xl: "sm" }}
              value={wangContract}
            >
              <Text
                as={"span"}
                display={"flex"}
                justifyContent={"left"}
                alignItems={"left"}
                gap={"2"}
                fontSize={"lg"}
              >
                {t("common.contractWang")}
                <IoCopyOutline />
              </Text>
              {wangContract?.toUpperCase()}
            </CopiableText>
          </Center>
        </WidgetProfileBalance>
        <WidgetProfileBalance justifyContent={"center"}>
          <Center py={"2"}>
            <CopiableText
              alignItems={"center"}
              textAlign={"center"}
              gap={2}
              fontSize={{ base: "2xs", sm: "xs", xl: "sm" }}
              value={defaultHost + address}
            >
              <Text
                as={"span"}
                display={"flex"}
                justifyContent={"left"}
                alignItems={"left"}
                gap={"2"}
                fontSize={"lg"}
              >
                {t("common.referralLink")}
                <IoCopyOutline />
              </Text>
              {address?.toUpperCase()}
            </CopiableText>
          </Center>
        </WidgetProfileBalance>
        <WidgetProfileBalance justifyContent={"center"} w="full">
          <Center py={"2"}>
            <Text
              alignItems={"center"}
              textAlign={"center"}
              gap={2}
              fontSize={{ base: "2xs", sm: "xs", xl: "sm" }}
            >
              <Text
                as={"span"}
                display={"flex"}
                justifyContent={"left"}
                alignItems={"left"}
                gap={"2"}
                fontSize={"xl"}
              >
                {t("common.myReferrer")}
              </Text>
              {accountMap.data?.referral.toUpperCase()}
            </Text>
          </Center>
        </WidgetProfileBalance>
      </VStack>
    </CardProfile>
  );
};
