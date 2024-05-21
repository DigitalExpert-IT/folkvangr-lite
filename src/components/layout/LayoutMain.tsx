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
        author="Bullcuan"
        description="The Bullcuan aims to revolutionize the world of network marketing by decentralizing millions of users through web3 applications"
      />
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
};
