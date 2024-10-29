import Header from "@/modules/beranda/components/Header";
import Container from "@/components/Container";
import Image from "next/image";

const linimasaDetail = [
  {
    title: "Pilih Divisi",
    date: "23 Nov - 24 Nov",
    description:
      "Memilih 2 divisi Himakom (Opsional) dan 2 divisi OmahTI (Opsional)",
  },
  {
    title: "Penugasan",
    date: "23 Nov - 24 Nov",
    description: "Melakukan penugasan sesuai divisi",
  },
  {
    title: "Wawancara",
    date: "23 Nov - 24 Nov",
    description:
      "Wawancara Himakomd dan OmahTI sesuai divisi yang telah dipilih",
  },
  {
    title: "Pengumuman",
    date: "23 Nov - 24 Nov",
    description: "Hasil Pengumuman OmahTI dan Himakom",
  },
];

const Linimasa = () => {
  return (
    <Container>
      <Header>
        Timeline <span className="text-custom-orange">Open</span>{" "}
        <span className="text-custom-blue">Recruitment</span>
      </Header>

      <div className="grid grid-cols-1 sm:grid-rows-2 lg:grid-rows-1 lg:gap-8 lg:grid-cols-2 gap-3 lg:auto-cols-fr sm:auto-rows-fr">
        {/* image */}
        <ImageCard />

        {/* timeline */}
        <div className="grid auto-rows-fr grid-cols-1 lg:gap-6 sm:grid-cols-2 gap-3">
          {linimasaDetail.map((detail, i) => (
            <LinimasaCard
              key={i}
              title={detail.title}
              date={detail.date}
              description={detail.description}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

const ImageCard = () => (
  <div className="relative h-full min-h-40 w-full overflow-hidden rounded-xl">
    <Image
      className="object-cover"
      sizes="100%"
      src={`placeholder.svg`}
      alt="Placeholder"
      fill
    />
  </div>
);

const LinimasaCard = ({
  title,
  date,
  description,
}: {
  title: string;
  date: string;
  description: string;
}) => (
  <div className="flex w-full flex-col justify-between space-y-2 rounded-xl bg-custom-gray-dark p-4">
    {/* top part */}
    <div className="*:font-medium">
      <h1 className="text-lg">{title}</h1>
      <h2 className="text-sm">{date}</h2>
    </div>

    {/* bottom part */}
    <p className="text-pretty text-sm">{description}</p>
  </div>
);

export default Linimasa;