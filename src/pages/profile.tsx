import { withConnection } from "hoc";
import { Box, Image } from "@chakra-ui/react";
import { LayoutMain, SectionProfile, SectionOwnedNFT } from "components";

const Profile = () => {
  return (
    <LayoutMain>
      <Box
        pt="40"
        bgGradient="linear-gradient(180deg, #0A232D 0%, #0A1424 23.05%, #0A2830 71.87%, #0A1424 100%)"
      >
        <Box
          position={"absolute"}
          w={"full"}
          pt="36"
          display={{ base: "none", lg: "block" }}
        >
          <Image
            src="/assets/pattern-2.png"
            alt="matching-image"
            mx={"auto"}
            objectFit="cover"
            w={"full"}
            minH={"100vh"}
          />
        </Box>
        <SectionProfile />
        <SectionOwnedNFT />
      </Box>
    </LayoutMain>
  );
};

export default withConnection(Profile);
