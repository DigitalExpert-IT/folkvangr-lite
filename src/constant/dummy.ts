import { t } from "i18next";

export interface IRankSystem {
  share: string;
  percent: string;
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
