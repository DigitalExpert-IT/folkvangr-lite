import { LayoutMain } from "components";
import { TableNetworkRank, TableSystem } from "components/table";
import {
  SectionHeader,
  SectionNFTList,
  SectionFeature,
  SectionPopulation,
  SectionCommunity,
} from "components/home";
import { Box, Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <LayoutMain>
      <SectionHeader />
      <Container
        maxW="container.2xl"
        bgGradient="linear-gradient(to-b, #0A1424 56.97%, #092B31 149.83%)"
      >
        <SectionNFTList />
        <SectionFeature />
      </Container>
      <Box bgGradient="linear-gradient(180deg, #0A2830 -39.17%, #0A1424 46.16%, #092A31 100.87%)">
        <SectionPopulation />
        <TableNetworkRank />
        <TableSystem />
        <SectionCommunity />
      </Box>
    </LayoutMain>
  );
}
