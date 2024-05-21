import {Binance, BinanceTestnet} from "@thirdweb-dev/chains"

const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID || "0x38") as "0x38";

const chainMap = {
  "0x38": Binance,
  "0x61": BinanceTestnet
}

export const getActiveChain = () => {
  return chainMap[CURRENT_CHAIN_ID] as any;
};