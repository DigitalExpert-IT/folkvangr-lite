import React from "react";
import Link from "next/link";
import { Box, Image } from "@chakra-ui/react";
import { Footer, Navbar, Metadata } from "components";

interface MainProps {
  children: React.ReactNode;
}

export const LayoutMain: React.FC<MainProps> = ({ children }) => {
  return (
    <Box>
      <Metadata
        language="en"
        author="WANGCAPITAL"
        description="WANG CAPITAL, Hongkong Web3 Investment Corporation - Decentralized Autonomous Organization (DAO)"
      />
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
};
