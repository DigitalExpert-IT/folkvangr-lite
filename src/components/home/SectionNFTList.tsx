import {
  Box,
  Container,
  Heading,
  Spinner,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { CardListNFT } from "components/card";
import { useNftList } from "hooks";
import { prettyBn } from "utils";
// import { prettyBn } from "utils";

export const SectionNFTList = () => {
  const { data, isLoading } = useNftList();

  return (
    <>
      <Box
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        overflow="hidden"
        display="flex"
        w="full"
        pt="40"
      >
        <Heading
          _after={{
            content: `'NFT'`,
            display: "block",
            textAlign: "center",
            alignSelf: "center",
            color: "whiteAlpha.100",
            transform: {
              md: "scale(3) translateY(-20px)",
              base: "scale(3) translateY(-10px)",
            },
          }}
          textTransform="uppercase"
          fontSize={{ md: "6xl", base: "4xl" }}
        >
          nft pocket
        </Heading>
      </Box>
      <Container maxW={"container.xxl"}>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <Spinner size="xl" />
          </Box>
        ) : null}

        <Wrap
          justifyContent="space-between"
          spacing="20"
          align="center"
          justify="center"
        >
          {data.map((e, idx) => (
            <WrapItem w={{ md: "25%", sm: "45%", base: "100%" }} key={idx}>
              <CardListNFT
                title={`WANGNFT ${e.id.add(1)}`}
                price={prettyBn(e.price, 18)}
                id={Number(e.id)}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Container>
    </>
  );
};
