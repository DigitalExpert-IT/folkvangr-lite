import ee from "ee";
import { useEffect } from "react";
import { ZERO_ADDRESS } from "constant/address";
import { NetworkReferral } from "falcon-lite/typechain-types";
import { useWangContract } from "./useWangContract";
import { useContractRead, useAddress } from "@thirdweb-dev/react";

type AccountMapType = Awaited<ReturnType<NetworkReferral["userProfile"]>>;

export const useAccountMap = (byPassAddress?: string | null) => {
  const contract = useWangContract();
  let address = useAddress();

  if (byPassAddress) address = byPassAddress;

  const { data, ...rest } = useContractRead(contract.contract, "userProfile", [
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
