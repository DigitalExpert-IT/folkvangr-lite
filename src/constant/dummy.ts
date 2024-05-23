import { t } from "i18next";

export interface IRankSystem {
  share: string;
  percent: string;
}

export interface IRankNetwork {
  rank: string;
  level: string;
  sponsor: string;
  matching: string;
  turnover: string;
  personalBuy: string;
}

export const RANKSYSTEM: Array<IRankSystem> = [
  {
    share: "Referral",
    percent: "10%",
  },
  {
    share: "Marketing",
    percent: "30%",
  },
  {
    share: "Address Bridge",
    percent: "30%",
  },
  {
    share: "Swap to Shiba Liquidity",
    percent: "15%",
  },
  {
    share: "Swap to XRP Liquidity",
    percent: "15%",
  },
];

export const RANKNETWORK: Array<IRankNetwork> = [
  {
    rank: "Classic",
    level: "Level 1",
    sponsor: "5%",
    matching: "20%",
    turnover: "",
    personalBuy: "20",
  },
  {
    rank: "Silver",
    level: "Level 2",
    sponsor: "3%",
    matching: "10%",
    turnover: "500",
    personalBuy: "100",
  },
  {
    rank: "Gold",
    level: "Level 3",
    sponsor: "2%",
    matching: "10%",
    turnover: "2000",
    personalBuy: "100",
  },
  {
    rank: "Platinum",
    level: "Level 4",
    sponsor: "",
    matching: "10%",
    turnover: "8000",
    personalBuy: "100",
  },
  {
    rank: "Diamond",
    level: "Level 5",
    sponsor: "",
    matching: "10%",
    turnover: "15000",
    personalBuy: "500",
  },
  {
    rank: "Priority",
    level: "Level 6",
    sponsor: "",
    matching: "10%",
    turnover: "30000",
    personalBuy: "500",
  },
];

export const PROMOTION_IMAGE_DATA = [
  {
    uri: "https://ik.imagekit.io/msxxxaegj/folkvangr/feature1.png?updatedAt=1695276346436",
    title: t("pages.home.sectionFeature.fullTransparency.title"),
    subtitle: t("pages.home.sectionFeature.fullTransparency.subtitle"),
    bgColor: "#0B5454",
    imgCenter: false,
  },
  {
    uri: "https://ik.imagekit.io/msxxxaegj/folkvangr/feature2.png?updatedAt=1695276346397",
    title: t("pages.home.sectionFeature.fullAutomation.title"),
    subtitle: t("pages.home.sectionFeature.fullAutomation.subtitle"),
    bgColor: "#005AB8",
    imgCenter: false,
  },
  {
    uri: "https://ik.imagekit.io/msxxxaegj/folkvangr/feature3.png?updatedAt=1695276346467",
    title: t("pages.home.sectionFeature.smartContract.title"),
    subtitle: t("pages.home.sectionFeature.smartContract.subtitle"),
    bgColor: "#18072F",
    imgCenter: true,
  },
  {
    uri: "https://ik.imagekit.io/msxxxaegj/folkvangr/feature4.png?updatedAt=1695276346424",
    title: t("pages.home.sectionFeature.decentralized.title"),
    subtitle: t("pages.home.sectionFeature.decentralized.subtitle"),
    bgColor: "#AA59FB",
    imgCenter: true,
  },
];

export const PARTNERSHIP = [
  {
    name: "partner1",
    image:
      "https://ik.imagekit.io/msxxxaegj/folkvangr/binance-logo.png?updatedAt=1695370706279",
  },
  {
    name: "partner2",
    image:
      "https://ik.imagekit.io/msxxxaegj/folkvangr/solidproofV2.png?updatedAt=1695015631926",
  },
  {
    name: "partner3",
    image:
      "https://ik.imagekit.io/msxxxaegj/wangcapital/Lettermark%20White.png?updatedAt=1716354827007",
  },
];
