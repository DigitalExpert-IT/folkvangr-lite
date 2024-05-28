import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Box, Text, Flex, AspectRatio } from "@chakra-ui/react";
import Image from "next/image";
import pattern from "../../../public/assets/dashboard/bg-billboard.png";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box as="footer" w="full" position={"relative"} bg={"#092A31"}>
      <Box bg="#0B4649" w="full" h="full" position="static" overflow={"hidden"}>
        <Image
          src={pattern}
          alt="background-footer"
          loading="lazy"
          placeholder="blur"
          style={{ objectFit: "cover" }}
          priority={false}
          fill
        />
        <Container maxW="container.lg" py={"2rem"} px={30}>
          <Flex
            justify={"center"}
            gap={{ base: 6, md: 20 }}
            flexDirection={{ base: "column-reverse", md: "row" }}
            w={"full"}
            h={{ base: "unset", md: 100 }}
          >
            <Flex
              alignItems={"center"}
              flex={"1 1 0 "}
              w={{ base: "full", md: 0 }}
            >
              <Text textAlign={{ base: "center", md: "right" }}>
                {t("common.footer.description")}
              </Text>
            </Flex>
            <Box
              w={"1px"}
              opacity={0.7}
              bg={"white"}
              display={{ base: "none", md: "block" }}
            />
            <Box
              display={"flex"}
              flex={"1 1 0"}
              alignItems={"center"}
              justifyContent={{ base: "center", md: "start" }}
              w={{ base: "full", md: 0 }}
            >
              <AspectRatio ratio={{ base: 2 / 0.5, md: 1 }} minWidth="250">
                <Image
                  style={{
                    objectFit: "contain",
                  }}
                  sizes="(max-width: 768px) 100vw,"
                  fill
                  loading="lazy"
                  src={"/assets/logo/wang-new.png"}
                  alt="logo-image"
                  priority={false}
                />
              </AspectRatio>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Flex justify={"center"} py={2}>
        <Text fontSize={{ base: "sm", sm: "md" }}>
          &#169; {new Date().getFullYear()} Wang Capital, All right reserved
        </Text>
      </Flex>
    </Box>
  );
};
