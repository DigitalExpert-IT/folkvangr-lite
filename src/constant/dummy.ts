import { t } from "i18next";

export interface IRankSystem {
  share: string;
  percent: string;
}

export interface IRankNetwork {
  rank: string;
  subscription: string;
  matchinglvl: string;
  matchingrwd: string;
  maxfarm: string;
  dailyfarm: string;
  directsponsor: string;
}

export const RANKSYSTEM: Array<IRankSystem> = [
  {
    share: "Investment Pool",
    percent: "35%",
  },
  {
    share: "Liquidity Pool",
    percent: "35%",
  },
  {
    share: "Community Development Pool",
    percent: "15%",
  },
  {
    share: "Marketing",
    percent: "7.5%",
  },
  {
    share: "Reserve",
    percent: "7.5%",
  },
];

export const RANKNETWORK: Array<IRankNetwork> = [
  {
    rank: "Classic                   ",
    subscription: "100 USDT / WANG ",
    matchinglvl: "3 Level",
    matchingrwd: "10%",
    maxfarm: "200%",
    directsponsor: "10%",
    dailyfarm: "0.25%",
  },
  {
    rank: "Bronze",
    subscription: "300 USDT / WANG",
    matchinglvl: "4 Level",
    matchingrwd: "10%",
    maxfarm: "250%",
    directsponsor: "10%",
    dailyfarm: "0.30%",
  },
  {
    rank: "Silver",
    subscription: "500 USDT / WANG",
    matchinglvl: "5 Level",
    matchingrwd: "10%",
    maxfarm: "300%",
    directsponsor: "10%",
    dailyfarm: "0.40%",
  },
  {
    rank: "Gold",
    subscription: "1000 USDT / WANG",
    matchinglvl: "6 Level",
    matchingrwd: "10%",
    maxfarm: "350%",
    directsponsor: "10%",
    dailyfarm: "0.50%",
  },
  {
    rank: "Solid Gold",
    subscription: "5000 USDT / WANG",
    matchinglvl: "7 Level",
    matchingrwd: "10%",
    maxfarm: "500%",
    directsponsor: "10%",
    dailyfarm: "0.60%",
  },
  {
    rank: "Priority",
    subscription: "10000 USDT / WANG",
    matchinglvl: "10 Level",
    matchingrwd: "10%",
    maxfarm: "700%",
    directsponsor: "10%",
    dailyfarm: "0.70%",
  },
];

export const PROMOTION_IMAGE_DATA = [
  {
    uri: "/assets/feature-1-new.png",
    title: t("pages.home.sectionFeature.fullTransparency.title"),
    subtitle: t("pages.home.sectionFeature.fullTransparency.subtitle"),
    bgColor: "#0B5454",
    imgCenter: false,
  },
  {
    uri: "/assets/feature-2-new.png",
    title: t("pages.home.sectionFeature.fullAutomation.title"),
    subtitle: t("pages.home.sectionFeature.fullAutomation.subtitle"),
    bgColor: "#005AB8",
    imgCenter: false,
  },
  {
    uri: "/assets/feature-3-new.png",
    title: t("pages.home.sectionFeature.smartContract.title"),
    subtitle: t("pages.home.sectionFeature.smartContract.subtitle"),
    bgColor: "#18072F",
    imgCenter: true,
  },
  {
    uri: "/assets/feature-4-new.png",
    title: t("pages.home.sectionFeature.decentralized.title"),
    subtitle: t("pages.home.sectionFeature.decentralized.subtitle"),
    bgColor: "#AA59FB",
    imgCenter: true,
  },
];

export const PARTNERSHIP = [
  {
    name: "partner1",
    image: "/assets/partnership/bnb-part.png",
  },
  {
    name: "partner2",
    image: "/assets/partnership/solid-proof.png",
  },
  {
    name: "partner3",
    image: "/assets/logo/wang-white.png",
  },
];
