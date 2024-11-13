import Divisi from "@/modules/divisi/divisi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Divisi",
  description: "Daftar Divisi HIMAKOM dan OmahTI",
};

export default function Page(): JSX.Element {
  return <Divisi />;
}