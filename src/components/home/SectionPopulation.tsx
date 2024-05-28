import { Box, Heading, Text, Image } from "@chakra-ui/react";
import { Trans } from "react-i18next";

export const SectionPopulation = () => {
  return (
    <Box
      display="flex"
      flexDir={{ base: "column", lg: "row" }}
      alignItems="center"
    >
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb="10"
      >
        <Image
          src="/assets/world-globe.png"
          alt="folk-globe"
          w={{ base: "100%", md: "500px", xl: "600px", lg: "600px" }}
          height="auto"
        />
      </Box>

      <Box
        w={{ lg: "60%", base: "100%" }}
        textAlign={{ base: "center", lg: "left" }}
        px="1rem"
        flex={1}
      >
        <Heading
          mb="6"
          size={{ base: "lg", md: "3xl" }}
          lineHeight="101%"
          fontWeight="extrabold"
        >
          <Trans
            i18nKey="pages.home.populationSection.title"
            components={{
              strong: (
                <Text
                  as="span"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  fontWeight="bold"
                  bgClip="text"
                  bgGradient="linear-gradient(90deg, #05D8A8 0%, #FFF 100%)"
                  _after={{
                    content: "''",
                    display: "block",
                  }}
                />
              ),
            }}
          />
        </Heading>
        <Text fontSize={{ base: "md", md: "2xl" }} maxW={"4xl"}>
          <Trans
            i18nKey="pages.home.populationSection.content"
            components={{
              strong: <Text as="span" fontWeight="bold" color="#04A87B" />,
            }}
          />
        </Text>
      </Box>
    </Box>
  );
};
