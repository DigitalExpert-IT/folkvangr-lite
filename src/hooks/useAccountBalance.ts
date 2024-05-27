import { useBalance } from "@thirdweb-dev/react";
import { WANGTOKEN_CONTRACT, USDT_CONTRACT } from "constant/address";
import { CURRENT_CHAIN_ID } from "./wang";

export const useAccountBalance = () => {
  const {
    data: balanceUSDT,
    isLoading: isLoadingUSDT,
    refetch: refetchUSDT,
    isInitialLoading,
  } = useBalance(USDT_CONTRACT[CURRENT_CHAIN_ID as "0x38"]);
  const {
    data: balanceWang,
    isLoading: isLoadingWang,
    refetch: refetchWang,
  } = useBalance(WANGTOKEN_CONTRACT[CURRENT_CHAIN_ID as "0x38"]);

  return {
    balanceWang,
    balanceUSDT,
    isLoading: isLoadingWang || isLoadingUSDT,
  };
};
