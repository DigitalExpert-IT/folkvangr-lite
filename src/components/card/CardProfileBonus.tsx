import { t } from "i18next";
import { useAccountMap } from "hooks";
import { HStack, Stack, Text } from "@chakra-ui/react";
import { WidgetProfileBalance, WidgetProfileBtn } from "components/widget";

export const CardProfileBonus = () => {
  const accountMap = useAccountMap();

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
            {/* <Text textAlign={"end"}>{`${account?.totalDownline} Member`}</Text> */}
            <Text textAlign={"end"}>{`100 Member`}</Text>
          </HStack>
        </WidgetProfileBalance>
        <WidgetProfileBalance bg="#0B5454" px="1rem" rounded="xl">
          <HStack w={"full"} justifyContent={"space-between"}>
            <Stack>
              <Text>{t("common.sponsor")}</Text>
              <Text>
                {/* {`${sponsorReward.data && fromBn(sponsorReward.data, 18)} ${
                  fld.data?.symbol
                }`} */}
                20
              </Text>
            </Stack>
            <WidgetProfileBtn
            // onClick={handleClaimSponsorReward}
            // isLoading={claimSponsorRewardAsync.isLoading}
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
                {/* {`${matchingReward.data && fromBn(matchingReward.data, 18)} ${
                  fld.data?.symbol
                }`} */}
                20
              </Text>
            </Stack>
            <WidgetProfileBtn
            // onClick={handleClaimMatchingReward}
            // isLoading={claimMatchingRewardAsync.isLoading}
            >
              {t("common.claim")}
            </WidgetProfileBtn>
          </HStack>
        </WidgetProfileBalance>
      </Stack>
    </Stack>
  );
};
