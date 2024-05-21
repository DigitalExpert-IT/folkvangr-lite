import { useAccountMap } from "hooks";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Button, Stack } from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";

type Props = {
  direction?: "row" | "column";
};

export const ButtonConnectWallet = (props: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const accountMap = useAccountMap();

  const handleNavigate = () => {
    router.push("/register");
  };

  return (
    <Stack spacing="4" direction={props.direction ?? "row"} align="center">
      {accountMap.data?.status ? null : (
        <Button
          isLoading={accountMap.isLoading && !accountMap.isFetched}
          px="6"
          size="sm"
          variant="outline"
          onClick={handleNavigate}
        >
          {t("common.register")}
        </Button>
      )}
      <ConnectWallet theme="dark" />
    </Stack>
  );
};
