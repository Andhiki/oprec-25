import Container from "@/components/Container";
import Pengumuman from "@/modules/pengumuman/pengumuman";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengumuman",
  description: "Pengumuman Open Recruitment Himakom & OmahTI",
};

export default function Page(): JSX.Element {
  return <Pengumuman />;
}
