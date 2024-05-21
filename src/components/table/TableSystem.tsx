import React from "react";
import { t } from "i18next";
import { Trans } from "react-i18next";
import { TableData } from "./TableData";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { RANKSYSTEM, IRankSystem } from "constant/dummy";
import { createColumnHelper } from "@tanstack/react-table";
import { WidgetSwipe } from "components/widget/WidgetSwipe";
import { Stack, Heading, Text, Icon } from "@chakra-ui/react";

const columnHelper = createColumnHelper<IRankSystem>();

const columns = [
  columnHelper.accessor("share", {
    cell: info => (
      <Stack
        direction="row"
        align="center"
        w={{ base: 40, md: 80 }}
        whiteSpace="pre-wrap"
      >
        <Icon
          as={MdOutlineDoubleArrow}
          color="orange"
          w={{ base: "3", md: "5" }}
          h={{ base: "3", md: "7" }}
        />
        <Text
          fontSize={{ base: "sm", md: "xl" }}
          textTransform="capitalize"
          color="gray.300"
        >
          {info.getValue()}
        </Text>
      </Stack>
    ),
    header: t("common.nftAllocation") ?? "",
  }),

  columnHelper.accessor("percent", {
    cell: info => (
      <Text
        fontSize="md"
        textTransform="capitalize"
        textAlign="center"
        w={{ base: "4xs", md: "5xs", lg: "3xs", xl: "4xs" }}
      >
        {info.getValue().length !== 0 ? info.getValue() : "-"}
      </Text>
    ),
    header: t("common.percent") ?? "",
  }),
];

export const TableSystem = () => {
  return (
    <Stack
      my="10rem"
      pt="2rem"
      display="flex"
      align="center"
      textAlign="center"
      pos="relative"
      overflow="hidden"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Heading
        _after={{
          content: `'system'`,
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
        bullrun nft system
      </Heading>

      <TableData
        columns={columns}
        data={RANKSYSTEM}
        tableCustom={{
          variant: "valhallaV2",
          maxWidth: "50%",
          zIndex: "2",
          size: "xs",
        }}
      />
      {/* <WidgetSwipe display={{ base: "flex", md: "none" }} /> */}
    </Stack>
  );
};
