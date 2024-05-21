import {
  Heading,
  Text,
  Card,
  CardBody,
  Box,
  Stack,
  Image,
} from "@chakra-ui/react";
import { FormRegister, LayoutMain } from "components";
import { Trans } from "react-i18next";

const Registerv2 = () => {
  return (
    <LayoutMain>
      <Image
        src="/images/bg-failconnect.png"
        alt="bg-register"
        pos="absolute"
        zIndex="0"
        w="100vw"
        h="100vh"
      />
      <Stack bgGradient="linear-gradient(180deg, #0E222F 0%, #0A1525 100%)">
        <Stack alignItems={"center"} minH={"100vh"} gap={"8"} pb={"10"}>
          <Box
            as="header"
            textAlign="center"
            px={{ base: "8", lg: "4" }}
            letterSpacing={{ base: "normal", md: "0.2em" }}
          >
            <Heading
              pt={{ base: "24", sm: "36" }}
              as="h1"
              textAlign="center"
              textTransform={"uppercase"}
            >
              <Trans
                i18nKey="pages.register.title"
                components={{
                  strong: (
                    <Text
                      as="span"
                      variant="gradient"
                      colorScheme="orange:pink"
                    />
                  ),
                }}
              />
            </Heading>
            <Text mt="4" fontSize="2xl" fontWeight={"hairline"}>
              <Trans
                i18nKey="pages.register.subtitle"
                components={{
                  strong: <Text as="span" />,
                }}
              />
            </Text>
          </Box>

          <Card
            bg={"white"}
            rounded={{ base: "3xl", lg: "50px" }}
            w="full"
            mx="auto"
            maxW="4xl"
            overflow={"hidden"}
          >
            <CardBody
              display={"flex"}
              flexDir={{ base: "column", lg: "row" }}
              p="0"
            >
              <Box
                w={{ base: "full", lg: "50%" }}
                borderRight={{ base: "none", lg: "8px" }}
                color={"blackAlpha.300"}
                zIndex={"1"}
              >
                <Box
                  bgGradient="linear-gradient(90deg, #1C79CC 0%, #04DFA7 100%)"
                  py={"20"}
                  zIndex={"99"}
                  backgroundPosition={"center"}
                  backgroundSize={"contain"}
                >
                  <Image
                    src="/images/register-image.png"
                    alt="pattern2"
                    mx={"auto"}
                  />
                </Box>
              </Box>
              <Stack
                w={{ base: "full", lg: "50%" }}
                minH={"sm"}
                px={{ base: "4", md: "12" }}
                color={"black"}
                borderLeft={{ base: "8px", lg: "none" }}
                borderColor={"blackAlpha.300"}
                pos={"relative"}
                justifyContent={"center"}
              >
                <FormRegister />
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </Stack>
    </LayoutMain>
  );
};

export default Registerv2;
