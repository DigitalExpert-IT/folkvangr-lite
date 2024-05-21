import { t } from "i18next";
import { useAccountMap } from "hooks";
import { HStack, Stack, Text } from "@chakra-ui/react";
import { WidgetProfileBalance } from "components/widget";

export const CardProfileBonus = () => {
  const accountMap = useAccountMap();

  return (
    <Stack>
      <Stack gap={"3"} w={"full"}>
        <WidgetProfileBalance bg="#F16623" p="1rem" rounded="xl">
          <HStack w={"full"} justifyContent={"space-between"}>
            <Text>{t("common.TotalNetworkMember")}</Text>
            <Text
              textAlign={"end"}
            >{`${accountMap.data?.directDown} Member`}</Text>
          </HStack>
        </WidgetProfileBalance>
      </Stack>
    </Stack>
  );
};
