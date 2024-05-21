import "locales";
import ee from "ee";
import theme from "theme";
import Head from "next/head";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { getActiveChain } from "lib/chain";
import { useBullRunContract } from "hooks";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import {
  ChakraProvider,
  useColorMode,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  trustWallet,
  useWallet,
  useChain,
  useSwitchChain,
} from "@thirdweb-dev/react";

const CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB || "0x38";
const targetChain = getActiveChain();

export default function App(props: AppProps) {
  return (
    <ThirdwebProvider
      clientId={CLIENT_ID}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        trustWallet(),
      ]}
      activeChain={targetChain}
    >
      <ChakraProvider theme={theme}>
        <NiceModal.Provider>
          <Main {...props} />
        </NiceModal.Provider>
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

const Main = ({ Component, pageProps }: AppProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();
  const wallet = useWallet();
  const chain = useChain();
  const bullrun = useBullRunContract();
  const switchChain = useSwitchChain();
  const isConnectThroughIncorrectChain =
    wallet && chain && chain.chainId && chain.chainId !== targetChain?.chainId;

  const handleSwitchChain = () => {
    try {
      switchChain(targetChain?.chainId);
    } catch (error) {}
  };

  // Event Handler
  useEffect(() => {
    if (!bullrun.contract) return;

    const unsubscribeBullrunEvents = bullrun.contract.events.listenToAllEvents(
      event => {
        ee.emit(`bullrun-${event.eventName}`, event.data);
      }
    );

    return () => {
      unsubscribeBullrunEvents();
    };
  }, [bullrun.contract]);

  // mode handler
  useEffect(() => {
    if (colorMode !== "dark") {
      toggleColorMode();
    }
  }, [colorMode]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/svg+xml" />
      </Head>
      <>
        <Component {...pageProps} />
        {isConnectThroughIncorrectChain ? (
          <Box
            bg="gray.800"
            w="full"
            py="4"
            textAlign="center"
            position="fixed"
            bottom="0"
            left="0"
            zIndex={99999}
          >
            <Text textAlign="center">
              {t("common.banner.invalidChainMessage")}
            </Text>
            <Button onClick={handleSwitchChain} mt="2">
              {t("common.banner.switchChain", { name: targetChain?.name })}
            </Button>
          </Box>
        ) : null}
      </>
    </>
  );
};
