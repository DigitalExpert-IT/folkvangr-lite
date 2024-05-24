import { useNftOwned } from "hooks";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CardOwnedNFT } from "components/card";
import {
  Box,
  Heading,
  Wrap,
  WrapItem,
  Stack,
  Container,
  Spinner,
} from "@chakra-ui/react";
import { useConnectionStatus } from "@thirdweb-dev/react";

export const SectionOwnedNFT = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useNftOwned();
  console.log(data);
  const statusConnect = useConnectionStatus();

  return (
    <Box mt="40" pos="relative">
      <Box textAlign="center">
        <Heading
          textTransform="uppercase"
          fontSize={{ base: "4xl", md: "5xl" }}
        >
          {t("pages.profile.myNFT")}
        </Heading>
      </Box>
      <Container maxW={"container.xxl"} w={{ base: "100%", md: "90%" }}>
        <Stack align="center" justify="center" py="10">
          <Wrap
            bg="rgba(11, 84, 84, 0.75)"
            w="100%"
            align="center"
            justify="center"
            rounded="50px"
            p="5"
            backdropFilter="auto"
            backdropBlur="2.5px"
            spacing="30px"
          >
            {statusConnect === "connected" ? (
              isLoading ? (
                <Box display="flex" justifyContent="center" minH="55vh">
                  <Spinner size="xl" />
                </Box>
              ) : data?.length === 0 ? (
                <Box
                  textAlign="center"
                  display="flex"
                  alignItems="center"
                  my="10"
                  minH="55vh"
                >
                  <Heading>{t("error.notOwnedNft")}</Heading>
                </Box>
              ) : (
                data?.map((item: any) => (
                  <WrapItem key={item.metadata.id}>
                    <CardOwnedNFT id={item.metadata.id} />
                  </WrapItem>
                ))
              )
            ) : (
              <Box
                textAlign="center"
                display="flex"
                alignItems="center"
                my="10"
                minH="55vh"
              >
                <Heading>Please connect wallet</Heading>
              </Box>
            )}
          </Wrap>
        </Stack>
      </Container>
    </Box>
  );
};
