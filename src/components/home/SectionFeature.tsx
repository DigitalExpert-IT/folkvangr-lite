import React from "react";
import { t } from "i18next";
import { Trans } from "react-i18next";
import { WidgetFeature } from "components/widget";
import { PROMOTION_IMAGE_DATA } from "constant/dummy";
import { Box, Heading, Text, Stack } from "@chakra-ui/react";

export const SectionFeature = () => {
  return (
    <Box
      py="10rem"
      alignItems="center"
      display="flex"
      flexDir="column"
      overflow="hidden"
    >
      <Heading
        fontWeight="black"
        fontSize={{ base: "3xl", md: "7xl" }}
        textAlign="center"
        textTransform="uppercase"
        _after={{
          fontWeight: "black",
          background:
            "linear-gradient(90deg, rgba(156, 41, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          content: `'${t("pages.home.feature.title")}'`,
          display: "block",
          textAlign: "center",
          alignSelf: "center",
          textTransform: "uppercase",
          color: "whiteAlpha.100",
          transform: {
            base: "scale(3) translateY(-9px) translateX(1px)",
            md: "scale(3) translateY(-15px)",
            xl: "scale(4) translateY(-8px)",
          },
        }}
      >
        <Trans i18nKey="pages.home.feature.title" />
      </Heading>
      <Stack
        placeItems={"center"}
        textAlign="center"
        spacing="20"
        mt={{ base: "0", md: "-5rem" }}
      >
        <Text fontSize={{ base: "md", md: "2xl" }} fontWeight="200">
          {t("pages.home.feature.subtitle")}
        </Text>
        <WidgetFeature cardData={PROMOTION_IMAGE_DATA} />
      </Stack>
    </Box>
  );
};
