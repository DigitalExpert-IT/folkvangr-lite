import { t } from "i18next";
import {
  CURRENT_CHAIN_ID,
  useAccountMap,
  useAsyncCall,
  useNFTWangContract,
  useWangNetContract,
} from "hooks";
import { HStack, Skeleton, Stack, Text } from "@chakra-ui/react";
import {
  useContractRead,
  useBalance,
  useContractWrite,
  useAddress,
} from "@thirdweb-dev/react";
import { WANGTOKEN_CONTRACT } from "constant/address";
import { WidgetProfileBalance, WidgetProfileBtn } from "components/widget";
import { fromBn } from "evm-bn";

export const CardProfileBonus = () => {
  const nft = useNFTWangContract();
  const wangNet = useWangNetContract();
  const address = useAddress();

  const { data: affiliate, isLoading: isLoad } = useContractRead(
    wangNet.contract,
    "getTotalDownlineUpToTenLevel",
    [address]
  );

  const wang = useBalance(WANGTOKEN_CONTRACT[CURRENT_CHAIN_ID as "0x38"]);
  const personalBuy = useContractRead(nft.contract, "getTotalInvest", [
    address,
  ]);

  const sponsorReward = useContractRead(nft.contract, "sponsorReward", [
    address,
  ]);
  const matchingReward = useContractRead(nft.contract, "matchReward", [
    address,
  ]);

  const claimSponsorReward = useContractWrite(nft.contract, "claimSponsor");
  const claimSponsorRewardAsync = useAsyncCall(claimSponsorReward.mutateAsync);

  const claimMatchingReward = useContractWrite(nft.contract, "claimMatch");
  const claimMatchingRewardAsync = useAsyncCall(
    claimMatchingReward.mutateAsync
  );

  const handleClaimSponsorReward = async () => {
    await claimSponsorRewardAsync.exec({ args: [] });
    await sponsorReward.refetch();
  };

  const handleClaimMatchingReward = async () => {
    await claimMatchingRewardAsync.exec({ args: [] });
    await matchingReward.refetch();
  };

  return (
    <Stack>
      <Stack gap={"3"} w={"full"}>
        <WidgetProfileBalance bg="#0B5454" px="1rem" rounded="xl">
          <HStack w={"full"} justifyContent={"space-between"}>
            <Text>{t("common.PersonalNft")}</Text>
            <Text textAlign={"end"}>
              {personalBuy.data && fromBn(personalBuy.data, 18)}
            </Text>
          </HStack>
        </WidgetProfileBalance>
        <WidgetProfileBalance bg="#0B5454" px="1rem" rounded="xl">
          <HStack w={"full"} justifyContent={"space-between"}>
            <Text>{t("common.TotalNetworkMember")}</Text>
            <Skeleton isLoaded={!isLoad}>
              <Text textAlign={"end"}>{`${affiliate ?? "0"} Member`}</Text>
            </Skeleton>
          </HStack>
        </WidgetProfileBalance>
        <WidgetProfileBalance bg="#0B5454" px="1rem" rounded="xl">
          <HStack w={"full"} justifyContent={"space-between"}>
            <Stack>
              <Text>{t("common.sponsor")}</Text>
              <Text>{`${
                sponsorReward.data && fromBn(sponsorReward.data, 18)
              } WANG`}</Text>
            </Stack>
            <WidgetProfileBtn
              onClick={handleClaimSponsorReward}
              isLoading={claimSponsorRewardAsync.isLoading}
            >
              {t("common.claim")}
            </WidgetProfileBtn>
          </HStack>
        </WidgetProfileBalance>
        <WidgetProfileBalance bg="#0B5454" px="1rem" rounded="xl">
          <HStack w={"full"} justifyContent={"space-between"}>
            <Stack>
              <Text>{t("common.matchingBonus")}</Text>
              <Text>
                {`${matchingReward.data && fromBn(matchingReward.data, 18)} ${
                  wang.data?.symbol
                }`}
              </Text>
            </Stack>
            <WidgetProfileBtn
              onClick={handleClaimMatchingReward}
              isLoading={claimMatchingRewardAsync.isLoading}
            >
              {t("common.claim")}
            </WidgetProfileBtn>
          </HStack>
        </WidgetProfileBalance>
      </Stack>
    </Stack>
  );
};
