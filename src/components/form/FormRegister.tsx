import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useModal } from "@ebay/nice-modal-react";
import { validateRequired, validateAddress, shortenAddress } from "utils";
import { useAsyncCall, useBullRunContract } from "hooks";
import { FormInput, ModalDiscalimer, ButtonConnectWrapper } from "components";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { ZERO_ADDRESS } from "constant/address";
import {
  Button,
  Stack,
  Badge,
  Box,
  Text,
  Center,
  FormLabel,
} from "@chakra-ui/react";

type FormType = {
  referrer: string;
};

export const FormRegister = () => {
  const bullrun = useBullRunContract();
  const address = useAddress() ?? ZERO_ADDRESS;
  const { t } = useTranslation();
  const bullrunRegis = useContractWrite(bullrun.contract, "register");

  const register = useAsyncCall(
    bullrunRegis.mutateAsync,
    t("form.message.registrationSuccess"),
    () => router.replace("/")
  );
  const { control, setValue, handleSubmit } = useForm<FormType>();
  const disclaimerModal = useModal(ModalDiscalimer);
  const router = useRouter();

  useEffect(() => {
    setValue("referrer", router.query.ref as string);
  }, [router.query.ref]);

  const onSubmit = handleSubmit(data => {
    disclaimerModal.show().then(async () => {
      await register.exec({
        args: [data.referrer],
      });
    });
  });

  return (
    <Stack spacing="2" as="form" onSubmit={onSubmit}>
      <Box pos={"absolute"} top={{ base: "6", lg: "8" }} left={"-2"}>
        <Badge
          bg={"#F16623"}
          minW={"48"}
          py={"2"}
          px={"6"}
          fontSize={"xl"}
          fontWeight={"semibold"}
          textAlign={"right"}
          roundedRight={"50px"}
          roundedLeft={"0"}
        >
          {shortenAddress(address)}
        </Badge>
      </Box>
      <FormLabel
        py={"8"}
        textAlign={"center"}
        fontSize={{ base: "xl", sm: "3xl" }}
      >
        {t("form.label.referrer")}*
      </FormLabel>
      <FormInput
        control={control}
        name="referrer"
        px={"0"}
        fontSize={{ base: "sm", sm: "medium" }}
        placeholder={t("form.placeholder.referrer") ?? ""}
        rules={{
          required: validateRequired(t("form.label.referrer")),
          validate: validateAddress,
        }}
        helpertext={t("form.helperText.referrer")}
        _placeholder={{ color: "brand.400", opacity: "0.5" }}
        rounded={"none"}
        borderBottom={"1px"}
        bg={"white"}
        _hover={{
          bg: "white",
          borderBottomColor: "brand.500",
          borderBottom: "2px",
        }}
        _focus={{
          border: "none",
          borderBottom: "2px",
          bg: "white",
        }}
      />
      <Text fontSize={{ base: "sm", sm: "md" }}>
        {t("form.helperText.referrer")}
      </Text>
      <Center pt={"10"}>
        <ButtonConnectWrapper type="submit" border={"1px"} px={"16"}>
          <Button
            isLoading={register.isLoading}
            type="submit"
            border={"1px"}
            color="white"
            _hover={{
              bgGradient:
                "linear-gradient(92deg, #9d4216 4.65%, #7f5226 96.4%)",
            }}
            bgGradient="linear-gradient(92deg, #F16623 4.65%, #FBA77E 96.4%)"
            px={"16"}
          >
            {t("common.register")}
          </Button>
        </ButtonConnectWrapper>
      </Center>
    </Stack>
  );
};
