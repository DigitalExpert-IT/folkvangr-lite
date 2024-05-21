import { t } from "i18next";

import { Heading, Stack, Flex, Box } from "@chakra-ui/react";
import {
  CardProfileRank,
  CardProfileAddress,
  CardProfileBalance,
} from "components/card";

export const SectionProfile = () => {
  return (
    <Stack maxW={"container.xl"} mx={{ base: "4", lg: "auto" }} mt="10rem">
      <Heading
        fontWeight="black"
        fontSize={{ base: "3xl", md: "7xl" }}
        textAlign="center"
        textTransform="uppercase"
        _after={{
          display: "block",
          textAlign: "center",
          alignSelf: "center",
          color: "whiteAlpha.100",
          textTransform: "uppercase",
          content: `'${t("pages.profile.account")}'`,
          mt: { xl: "-36", lg: "-32", md: "-28", xs: "-70px", base: "-55px" },
          fontSize: { xl: "250", lg: "180", md: "130", xs: "75", base: "56" },
        }}
      >
        {t("pages.profile.header")}
      </Heading>

      <Flex direction={{ base: "column", lg: "row" }} gap="10" p="2">
        <Box
          flex={0}
          bgGradient="linear-gradient(118deg, #1D73CD 4.67%, #02E4A4 97.62%)"
          rounded="2.5rem"
          p="1"
        >
          <Stack
            h="100%"
            w="100%"
            rounded="2.5rem"
            direction="column"
            justify="space-between"
            background="#091E2A"
          >
            <Box minW={{ base: "100%", md: "35%" }}>
              <CardProfileRank />
            </Box>
            <Box w="100%">
              <CardProfileAddress />
            </Box>
          </Stack>
        </Box>

        <Stack
          bgGradient="linear-gradient(118deg, #1D73CD 4.67%, #02E4A4 97.62%)"
          rounded="2.5rem"
          w="100%"
          flex={2}
          p="1"
        >
          <CardProfileBalance />
        </Stack>
      </Flex>
    </Stack>
  );
};
