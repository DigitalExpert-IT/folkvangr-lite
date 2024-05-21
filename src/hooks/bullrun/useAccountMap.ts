import ee from "ee";
import { useEffect } from "react";
import { ZERO_ADDRESS } from "constant/address";
import { Network } from "pass-bullrun/typechain-types";
import { useBullRunContract } from "./useBullRunContract";
import { useContractRead, useAddress } from "@thirdweb-dev/react";

type AccountMapType = Awaited<ReturnType<Network["profile"]>>;

export const useAccountMap = (byPassAddress?: string | null) => {
  const contract = useBullRunContract();
  let address = useAddress();

  if (byPassAddress) address = byPassAddress;

  const { data, ...rest } = useContractRead(contract.contract, "profile", [
    address ?? ZERO_ADDRESS,
  ]);

  useEffect(() => {
    ee.addListener("bullrun-register", rest.refetch);

    return () => {
      ee.removeListener("bullrun-register", rest.refetch);
    };
  }, []);

  return {
    data: data as undefined | AccountMapType,
    ...rest,
  };
};
