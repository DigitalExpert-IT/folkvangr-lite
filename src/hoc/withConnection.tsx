import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { LayoutIllustration, LayoutLoading } from "components";
import {
  useConnectedWallet,
  useConnectionStatus,
  ConnectWallet,
} from "@thirdweb-dev/react";

export const withConnection = (Component: () => JSX.Element | null) => {
  const ConnectionWrapper = () => {
    const wallet = useConnectedWallet();
    const connectionStatus = useConnectionStatus();

    if (connectionStatus === "connecting") return <LayoutLoading />;
    if (!wallet && connectionStatus === "disconnected") {
      return <ConnectWalletRequred />;
    }

    return <Component />;
  };

  return ConnectionWrapper;
};

const ConnectWalletRequred = () => {
  const { t } = useTranslation();

  return (
    <LayoutIllustration
      illustrationUri="/assets/illustration/connect-W.png"
      title={t("hoc.connection.title")}
      description={t("hoc.connection.description")}
    >
      <Box mt={2}>
        <ConnectWallet theme="dark" />
      </Box>
    </LayoutIllustration>
  );
};
