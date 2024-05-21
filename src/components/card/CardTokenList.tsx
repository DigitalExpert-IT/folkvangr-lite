import { Stack, Box, Avatar, Text } from "@chakra-ui/react";

type TokenType = {
  image: string;
  amount: string;
  name: string;
};

export const TokenList = ({ image, amount, name }: TokenType) => {
  return (
    <Stack direction="row" align="center" justify="space-between">
      <Box display="flex" flexDirection="row" alignItems="center">
        <Avatar
          size="sm"
          name={name}
          src={image}
          mr="1rem"
          background="white"
        />
        <Text fontSize="lg" textTransform="uppercase">
          {name}
        </Text>
      </Box>
      <Text>{amount}</Text>
    </Stack>
  );
};
