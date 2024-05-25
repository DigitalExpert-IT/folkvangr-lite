import { toBn } from "evm-bn";

export const getUsdtRate = (usdtAmount: string) => {
  const ratePerGnet = toBn("1", 18);
  const formatAmount = toBn(usdtAmount, 18);
  const unit = toBn("1", 18);
  const wangAmount = formatAmount.mul(unit).div(ratePerGnet);

  return wangAmount;
};

export const getWangRate = (wangAmount: string) => {
  const ratePerUsdt = toBn("1", 18);
  const unit = toBn("1", 18);
  const ratePerUnit = ratePerUsdt.div(unit);
  const usdtAmount = toBn(wangAmount, 18).div(ratePerUnit);

  return usdtAmount;
};