import { Card, CardProps } from "@chakra-ui/react";

export const CardProfile = (props: CardProps) => {
  const { children, ...rest } = props;
  return (
    <Card
      py={"8"}
      px={{ base: "4", md: "12" }}
      h={"full"}
      placeContent={"center"}
      rounded={"2.5rem"}
      bg="gray.900"
      {...rest}
    >
      {children}
    </Card>
  );
};
