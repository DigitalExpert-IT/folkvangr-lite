import {
  Box,
  Text,
  Icon,
  Stack,
  Button,
  SimpleGrid,
  AspectRatio,
  Image,
  HStack,
} from "@chakra-ui/react";
import { fromBn, toBn } from "evm-bn";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FormInput, FormSelect } from "components/form/form-utils";
import { ButtonConnectWrapper } from "components/button";
import { getWangRate, getUsdtRate, prettyBn, shortenAddress } from "utils";
import {
  USDT_CONTRACT,
  WANGTOKEN_CONTRACT,
} from "constant/address";
import { BigNumber } from "ethers";
import { IoCopyOutline } from "react-icons/io5";
import { CURRENT_CHAIN_ID, useAsyncCall } from "hooks";

import _ from "lodash";
import { CopiableText } from "components/CopiableText";
import {useAccountBalance} from "hooks/useAccountBalance";
import { useSwap } from "hooks/useSwap";

interface ISwapToken {
  amountTop: string;
  amountBottom: string;
  currency: string;
}

interface IFieldCurrency {
  [key: string]: string;
}

export const FormSwap = () => {
  const addressWang = WANGTOKEN_CONTRACT[CURRENT_CHAIN_ID as "0x38"];
  const addressUsdt = USDT_CONTRACT[CURRENT_CHAIN_ID as "0x38"];
  const { t } = useTranslation();
  const [symbol, setSymbol] = useState(false);
  const [fee, setFee] = useState<BigNumber>(toBn("0", 18));
  const { handleSubmit, control, watch, getValues, setValue, resetField } =
    useForm<ISwapToken>();
  const watchCurrency = watch("currency");
  const watchAmountTop = watch("amountTop");

  const { balanceWang, balanceUSDT } = useAccountBalance();

  const swap = useSwap();

  const { exec, isLoading: isSwapLoading } = useAsyncCall(
    swap.swapWang,
    t("form.message.swapSucces")
  );

  const { exec: execUSDT, isLoading: isSwapLoadingUSDT } = useAsyncCall(
    swap.swapUSDT,
    t("form.message.swapSucces")
  );

  const inputMax = () => {
    const { currency } = getValues();
    let result;

    if (currency === "WANG") {
      if (!balanceUSDT?.value) return setValue("amountTop", "0");

      result = balanceUSDT.value;
    } else {
      if (!balanceWang?.value || balanceWang?.value.isZero())
        return setValue("amountTop", "0");

      result = balanceWang.value.mul(toBn("9", 18)).div(toBn("10", 18));
    }

    setValue("amountTop", fromBn(result, 18));
    handleChangeInput("amountTop");
  };

  useEffect(() => {
    const currency = watchCurrency;
    if (currency === "WANG") setSymbol(true);
    else setSymbol(false);

    // should reset amountTop and amountBottom
    // after change the currency
    resetField("amountTop");
    resetField("amountBottom");
    setFee(toBn("0", 18));
  }, [watchCurrency]);

  const handleChangeInput = useCallback(
    _.debounce((field: string) => {
      const { amountTop, amountBottom, currency } = getValues();
      const value = field === "amountTop" ? amountTop : amountBottom;

      // define what the top and bottom fields are
      const fieldTarget = field === "amountTop" ? "amountBottom" : "amountTop";

      let swapResult = "";

      if (!value) {
        setFee(toBn("0", 18));
      }

      let swapFee = toBn("0", 18);

      if (currency === "WANG") {
        swapResult = fromBn(getUsdtRate(value ? value : "0"), 18);
      }
      if (currency === "USDT") {
        if (fieldTarget === "amountTop") {
          if (value) {
            swapFee = toBn(value, 18).mul(toBn("10", 18)).div(toBn("90", 18));
            setFee(swapFee);
          }

          swapResult = fromBn(getWangRate(value ? value : "0").add(swapFee), 18);
        } else {
          if (value) {
            swapFee = toBn(value, 18).mul(toBn("10", 18)).div(toBn("100", 18));
            setFee(swapFee);
          }

          swapResult = fromBn(getWangRate(value ? value : "0").sub(swapFee), 18);
        }
      }

      setValue(fieldTarget, swapResult);
    }, 200),
    []
  );

  const isDisableButtonSwap = useMemo(() => {
    const { amountTop } = getValues();

    if (!amountTop) return false;

    return toBn(amountTop, 18) <= toBn("0", 18);
  }, [watchAmountTop]);

  const onSubmit = handleSubmit(async (data) => {
    const { amountTop } = getValues();

    if (data.currency === "WANG") {
      exec(toBn(amountTop, 18));
    } else {
      execUSDT(toBn(amountTop, 18));
    }
  });

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      gap={{ base: "8", md: "20" }}
      pos={"relative"}
    >
      <Stack
        as="form"
        onSubmit={onSubmit}
        align="center"
        order={{ base: 2, md: 1 }}
      >
        <Stack alignItems="center" mb="5" spacing={"3"}>
          <HStack w="full">
            <Box
              position={"relative"}
              border={"1px"}
              borderColor="#091E2A"
              borderRadius={"lg"}
              overflow={"hidden"}
              w="100%"
            >
              <Text
                position={"absolute"}
                textAlign={"center"}
                fontWeight={"bold"}
                bg="#091E2A"
                py={"2"}
                px={"6"}
                borderLeftRadius="lg"
                zIndex={"3"}
              >
                {t("form.label.from")}
              </Text>
              <FormInput
                flex={1}
                ml={"10"}
                textAlign="center"
                textColor={"white"}
                borderRadius={"3xl"}
                bg="#091e2abd"
                _focus={{
                  border: "none",
                  bg: "whiteAlpha.200",
                }}
                _hover={{
                  border: "none",
                  bg: "whiteAlpha.300",
                }}
                control={control}
                onKeyUp={() => handleChangeInput("amountTop")}
                name="amountTop"
                placeholder={"0.0"}
                type="number"
                isDisabled={isSwapLoading || isSwapLoadingUSDT}
              />
            </Box>
            <Button
              backgroundColor={"#091E2A"}
              rounded="lg"
              _hover={{
                opacity: 0.6,
              }}
              onClick={inputMax}
            >
              {t("common.max")}
            </Button>
          </HStack>
          <Text
            as={"span"}
            fontSize={"sm"}
            color={"whiteAlpha.700"}
            textAlign={"center"}
          >
            {t("form.helperText.fee", {
              value: fromBn(fee, 18),
              symbol: symbol ? "USDT" : "WANG",
            })}
          </Text>

          <Stack py={"2"} w={"full"}>
            <SimpleGrid
              columns={2}
              placeItems={"center"}
              bg={"#091E2A"}
              w={"full"}
              rounded={"xl"}
              overflow={"hidden"}
              pos={"relative"}
            >
              <Text fontWeight={"bold"}>{t("form.label.swap")}</Text>
              <Icon pos={"absolute"} zIndex={"3"} fontSize={"xl"} color="white">
                <AiOutlineArrowRight />
              </Icon>
              <FormSelect
                bg={"#091e2abd"}
                textAlign={"center"}
                control={control}
                _focus={{
                  border: "none",
                  bg: "gray.700",
                }}
                _hover={{
                  border: "none",
                  bg: "gray.600",
                }}
                name="currency"
                option={[
                  { value: "USDT", label: "USDT" },
                  { value: "WANG", label: "WANG" },
                ]}
                isDisabled={isSwapLoading || isSwapLoadingUSDT}
                defaultValue="USDT"
              />
            </SimpleGrid>
          </Stack>

          <Stack w={"full"} pt={"4"}>
            <Box
              position={"relative"}
              w={"full"}
              border={"1px"}
              borderColor="#091E2A"
              borderRadius={"lg"}
              overflow={"hidden"}
            >
              <Text
                position={"absolute"}
                textAlign={"center"}
                fontWeight={"bold"}
                py={"2"}
                px={"6"}
                borderRadius={"md"}
                bg="#091E2A"
                zIndex={"3"}
              >
                {t("form.label.to")}
              </Text>
              <FormInput
                ml={"10"}
                textAlign="center"
                textColor={"gray.100"}
                borderRadius={"3xl"}
                bg="#091e2abd"
                _focus={{
                  border: "none",
                  bg: "whiteAlpha.200",
                }}
                _hover={{
                  border: "none",
                  bg: "whiteAlpha.300",
                }}
                control={control}
                onKeyUp={() => handleChangeInput("amountBottom")}
                name="amountBottom"
                placeholder={"0.0"}
                type="number"
                isDisabled={isSwapLoading || isSwapLoadingUSDT}
              />
            </Box>
          </Stack>
          <ButtonConnectWrapper>
            <Button
              type="submit"
              w="100%"
              isLoading={isSwapLoading || isSwapLoadingUSDT}
              bgGradient="linear-gradient(92deg, #1D76CD 4.65%, #06C196 96.4%)"
              _hover={{
                bg: "linear-gradient(92deg, #135186 4.65%, #0B4649 96.4%)",
              }}
              isDisabled={isDisableButtonSwap}
            >
             {t("common.swap")}
            </Button>
          </ButtonConnectWrapper>
        </Stack>
      </Stack>
      <Box
        display={{ base: "none", md: "block" }}
        pos={"absolute"}
        right={"0"}
        left={"0"}
        my={"8"}
        w={"0.5"}
        h={"40"}
        mx={"auto"}
        borderRight={"1px"}
        borderColor="gray.400"
      />
      <Stack
        height={"fit-content"}
        pos="relative"
        mb={{ base: 10, md: 0 }}
        px="3"
        order={{ base: 1, md: 2 }}
      >
        <Box zIndex={1}>
          <Stack
            direction="column"
            p={2}
            rounded="xl"
            backgroundColor="#091E2A"
            my="4"
            boxShadow="lg"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              w="full"
              px="8"
              pt="3"
            >
              <AspectRatio ratio={2} width="24px">
                <Image src="/assets/logo/wang-white.png" alt="logo-image" />
              </AspectRatio>
              <Text
                as={"span"}
                fontSize={"sm"}
                color={"whiteAlpha.700"}
                textAlign={"center"}
              >
                {Number(fromBn(balanceWang?.value ?? toBn("0", 18), 18)) < 1
                  ? fromBn(balanceWang?.value ?? toBn("0", 18), 18)
                  : prettyBn(balanceWang?.value, 18)}{" "}
                WANG
              </Text>
            </Stack>
            <HStack
              borderTop="1px"
              borderColor="gray.500"
              textAlign="center"
              p="3"
              justifyContent="space-between"
            >
              <Text fontSize="sm">Import WANG</Text>
              <Box display="flex" alignItems="center">
                <CopiableText
                  value={addressWang}
                  display="flex"
                  alignItems="center"
                  gap="2"
                >
                  {shortenAddress(addressWang)}
                  <IoCopyOutline />
                </CopiableText>
              </Box>
            </HStack>
          </Stack>
          <Stack
            direction="column"
            rounded="xl"
            p={2}
            backgroundColor="#091E2A"
            my="4"
            boxShadow="lg"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              w="full"
              px="8"
              pt="3"
            >
              <AspectRatio ratio={1} width="24px">
                <Image
                  src="/assets/logo/tether-logo-white.png"
                  alt="logo-image"
                />
              </AspectRatio>
              <Text
                as={"span"}
                fontSize={"sm"}
                color={"whiteAlpha.700"}
                textAlign={"center"}
              >
                {Number(fromBn(balanceUSDT?.value ?? toBn("0", 18), 18)) < 1
                  ? fromBn(balanceUSDT?.value ?? toBn("0", 18), 18)
                  : prettyBn(balanceUSDT?.value, 18)}{" "}
                USDT
              </Text>
            </Stack>
            <HStack
              borderTop="1px"
              borderColor="gray.500"
              textAlign="center"
              p="3"
              justifyContent="space-between"
            >
              <Text fontSize="sm">Import USDT</Text>
              <Box display="flex" alignItems="center">
                <CopiableText
                  value={addressUsdt}
                  display="flex"
                  alignItems="center"
                  gap="2"
                >
                  {shortenAddress(addressUsdt)}
                  <IoCopyOutline />
                </CopiableText>
              </Box>
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </SimpleGrid>
  );
};
