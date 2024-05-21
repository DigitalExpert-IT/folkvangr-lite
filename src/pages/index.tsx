import { LayoutMain } from "components";
import { TableSystem } from "components/table";
import {
  SectionHeader,
  SectionNFTList,
  SectionOwnedNFT,
  // SectionProfile,
  SectionFeature,
} from "components/home";

export default function Home() {
  return (
    <LayoutMain>
      <SectionHeader />
      <SectionNFTList />
      <SectionFeature />
      <SectionOwnedNFT />
      <TableSystem />
    </LayoutMain>
  );
}
