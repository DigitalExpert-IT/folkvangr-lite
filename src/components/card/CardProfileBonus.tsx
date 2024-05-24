import { t } from "i18next";
import {
  CURRENT_CHAIN_ID,
  useAccountMap,
  useAsyncCall,
  useNFTWangContract,
} from "hooks";
import { HStack, Stack, Text } from "@chakra-ui/react";
import {
  useContractRead,
  useBalance,
  useContractWrite,
} from "@thirdweb-dev/react";
import { WANGTOKEN_CONTRACT } from "constant/address";
import { WidgetProfileBalance, WidgetProfileBtn } from "components/widget";
import { fromBn } from "evm-bn";

export const CardProfileBonus = () => {
  const nft = useNFTWangContract();
  const { data } = useAccountMap();
  const wang = useBalance(WANGTOKEN_CONTRACT[CURRENT_CHAIN_ID as "0x38"]);
  const sponsorReward = useContractRead(nft.contract, "totalSponsorReward");

  const claimSponsorReward = useContractWrite(nft.contract, "claimSponsor");
  const claimSponsorRewardAsync = useAsyncCall(claimSponsorReward.mutateAsync);

  const handleClaimSponsorReward = async () => {
    await claimSponsorRewardAsync.exec({ args: [] });
    // await sponsorReward
  };

  return (
    <Stack>
      <Stack gap={"3"} w={"full"}>
        <WidgetProfileBalance bg="#0B5454" px="1rem" rounded="xl">
          <HStack w={"full"} justifyContent={"space-between"}>
            <Text>{t("common.PersonalNft")}</Text>
            <Text textAlign={"end"}>
              {/* {`${prettyBn(personalBuy, 18)} ${fld.data?.symbol}`} */}
              20
            </Text>
          </HStack>
        </WidgetProfileBalance>
        <WidgetProfileBalance bg="#0B5454" px="1rem" rounded="xl">
          <HStack w={"full"} justifyContent={"space-between"}>
            <Text>{t("common.TotalNetworkMember")}</Text>
            <Text textAlign={"end"}>{`${data?.downline} Member`}</Text>
          </HStack>
        </WidgetProfileBalance>
        <WidgetProfileBalance bg="#0B5454" px="1rem" rounded="xl">
          <HStack w={"full"} justifyContent={"space-between"}>
            <Stack>
              <Text>{t("common.sponsor")}</Text>
              <Text>{`${sponsorReward.data && fromBn(sponsorReward.data, 18)} ${
                wang.data?.symbol
              }`}</Text>
            </Stack>
            <WidgetProfileBtn
              onClick={handleClaimSponsorReward}
              isLoading={claimSponsorRewardAsync.isLoading}
            >
              {t("common.claim")}
            </WidgetProfileBtn>
          </HStack>
        </WidgetProfileBalance>
      </Stack>
    </Stack>
  );
};
