import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  Wrap,
  WrapItem,
  Stack,
  Heading,
  Link,
  Image as Images,
} from "@chakra-ui/react";

interface IPartnershipV2 {
  name: string;
  image: string;
  link?: string;
}

interface SectionPartnershipV2Props {
  data: IPartnershipV2[];
}

export const SectionPartnership: React.FC<SectionPartnershipV2Props> = (
  props
) => {
  const { t } = useTranslation();
  return (
    <Stack py={{ base: "10", md: "20" }} w="full" overflow="hidden">
      <Heading
        fontWeight="black"
        fontSize={{ base: "3xl", md: "7xl" }}
        textAlign="center"
        textTransform="uppercase"
        mb={{ sm: "8" }}
        _after={{
          content: `'${t("pages.home.partnershipSection")}'`,
          alignSelf: "center",
          display: "block",
          fontSize: { xl: "200", lg: "145", md: "110", xs: "60", base: "45" },
          mt: { xl: "-36", lg: "-32", md: "-28", xs: "-14", base: "-12" },
          color: "whiteAlpha.100",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {t("pages.home.partnershipSection")}
      </Heading>
      <Stack
        alignContent="center"
        justifyItems="center"
        w="full"
        h="auto"
        position="relative"
      >
        <Image
          src="/assets/partnership/bg-partnership.png"
          alt="background partnership"
          loading="lazy"
          style={{
            position: "absolute",
            opacity: "0.5",
            top: "20%",
            objectFit: "fill",
          }}
          priority={false}
          fill
        />
        <Image
          src="/assets/partnership/bg-support.png"
          alt="background partnership"
          loading="lazy"
          style={{
            position: "absolute",
            opacity: "0.5",
            top: "-35px",
            objectFit: "fill",
          }}
          priority={false}
          fill
        />
        <Wrap spacing="5" justify="center" zIndex={1} m="auto">
          {props.data.map((item, idx) => (
            <WrapItem key={idx} w={{ base: "5rem", md: "10rem", lg: "15rem" }}>
              {item.link ? (
                <Link href={item.link} isExternal>
                  <Images
                    src={item.image}
                    alt={`partner-${item.name}`}
                    w={{ base: "auto", lg: "250px" }}
                    h={{ base: "auto", lg: "260px" }}
                  />
                </Link>
              ) : (
                <Images
                  src={item.image}
                  alt={`partner-${item.name}`}
                  w={{ base: "100px", lg: "250px" }}
                  h={{ base: "90px", lg: "260px" }}
                />
              )}
            </WrapItem>
          ))}
        </Wrap>
      </Stack>
    </Stack>
  );
};
