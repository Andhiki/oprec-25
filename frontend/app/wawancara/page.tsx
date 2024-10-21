import Wawancara from "@/modules/wawancara/wawancara";
import Container from "@/components/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wawancara",
  description: "ISINYA WAWANCARA DEH",
};

export default function Page(): JSX.Element {
  return (
    <Container parentClass={`pt-0 lg:pt-8`}>
      <Wawancara />
    </Container>
  );
}
