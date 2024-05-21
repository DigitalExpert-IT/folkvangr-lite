import { Heading, Container, Box, Text, Image, Stack } from "@chakra-ui/react";

type Props = {
  illustrationUri: string;
  title: string;
  description: string;
  children?: JSX.Element | null;
};

export const LayoutIllustration = (props: Props) => {
  const { illustrationUri, title, description, children } = props;
  return (
    <Box bgGradient="#0B1A29" pos="relative" display="flex">
      <Image
        src="/images/bg-failconnect.png"
        alt="background"
        pos="absolute"
        zIndex={1}
        objectFit="cover"
        h="100vh"
        w="100vw"
      />
      <Container
        zIndex={1000}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        maxW="3xl"
        h="100vh"
      >
        <Image mb="6" w="64" src={illustrationUri} alt={title} />
        <Stack textAlign="center" spacing={4}>
          <Heading size="lg">{title}</Heading>
          <Text fontSize="xl">{description}</Text>
          {children}
        </Stack>
      </Container>
    </Box>
  );
};
