import { CURRENT_CHAIN_ID } from "./wang";
import { useWangTokenContract } from "./useWangTokenContract";
import { BigNumber } from "ethers";
import { useUSDTContract } from "./useUSDTContract";
import { SWAP_CONTRACT } from "constant/address";
import { useSwapContract } from "./useSwapContract";
import { useAccountBalance } from "./useAccountBalance";
import ee from "ee";
import { useEffect } from "react";
import { fromBn } from "evm-bn";

export const useSwap = () => {
  const {
    contract: Wang,
    refetch: refetchWang,
    isInitialLoading: isLoadingWang,
    isRefetching: isRefetchingWang,
  } = useWangTokenContract();
  const {
    contract: usdt,
    refetch: refetchUSDT,
    isInitialLoading: isLoadingUSDT,
    isRefetching: isRefetchingUSDT,
  } = useUSDTContract();
  const { contract: swap, isInitialLoading: isLoadingSwap } = useSwapContract();

  const refetch = async () => {
    refetchWang();
    refetchUSDT();
  };

  useEffect(() => {
    ee.addListener("swap-SwapToken", refetch);

    return () => {
      ee.removeListener("swap-SwapToken", refetch);
    };
  }, [swap]);

  const {
    balanceWang,
    balanceUSDT,
    isLoading: isLoadingAccountBalance,
  } = useAccountBalance();

  const approveUSDT = async (amount: BigNumber) => {
    if (!usdt || !balanceUSDT) return;
    const allowance = await usdt.erc20.allowance(
      SWAP_CONTRACT[CURRENT_CHAIN_ID as "0x38"]
    );
    if (balanceUSDT.value.lt(amount)) {
      throw {
        code: "NotEnoughBalance",
      };
    }
    if (allowance.value.gt(amount)) return;
    const tx = await usdt.erc20.setAllowance(
      SWAP_CONTRACT[CURRENT_CHAIN_ID as "0x38"],
      fromBn(amount.mul(10), 18)
    );
    return tx.receipt;
  };

  const approveWang = async (amount: BigNumber) => {
    if (!Wang || !balanceWang) return;
    const allowance = await Wang.erc20.allowance(
      SWAP_CONTRACT[CURRENT_CHAIN_ID as "0x38"]
    );
    if (balanceWang.value.lt(amount)) {
      throw {
        code: "NotEnoughBalance",
      };
    }
    if (allowance.value.gt(amount)) return;
    const tx = await Wang.erc20.setAllowance(
      SWAP_CONTRACT[CURRENT_CHAIN_ID as "0x38"],
      fromBn(amount.mul(10), 18)
    );
    return tx.receipt;
  };

  const swapWang = async (amount: BigNumber) => {
    await approveUSDT(amount);
    const tx = await swap?.call("swapToWang", [amount]);
    return tx;
  };

  const swapUSDT = async (amount: BigNumber) => {
    await approveWang(amount);
    const tx = await swap?.call("swapToUSDT", [amount]);
    return tx;
  };

  return {
    swapWang,
    swapUSDT,
    isInitializing:
      isLoadingWang &&
      isLoadingSwap &&
      isLoadingUSDT &&
      isLoadingAccountBalance &&
      isRefetchingWang &&
      isRefetchingUSDT,
  };
};