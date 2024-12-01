import { Smile } from "lucide-react";
import PopupPengumuman from "./components/PopupPengumuman";
import { getPenerimaanUser } from "@/utils/fetch";
import { cookies } from "next/headers";
import { formatDate } from "@/lib/utils";

const Pengumuman = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const { diterimaDi } = await getPenerimaanUser(accessToken as string);
  // Set your announcement release date here
  const releaseDate = new Date("2024-12-04T00:00:00Z");
  const currentDate = new Date();
  console.log(`pengumuman.tsx: releaseDate: ${releaseDate}`);

  // const isAnnouncementAvailable = currentDate >= releaseDate;
  const isAnnouncementAvailable = true;

  return (
    <main className="space-y-8">
      <Title
        isAnnouncementAvailable={isAnnouncementAvailable}
        releaseDate={releaseDate}
      />

      <div className="flex h-96 flex-col items-center justify-center gap-4 rounded-xl bg-custom-gray-dark p-6">
        <Smile size={100} />
        {isAnnouncementAvailable ? (
          <>
            <h1 className="text-center text-xl font-medium">
              Kamu dapat membuka pengumuman
            </h1>
            <PopupPengumuman diterimaDi={diterimaDi} />
          </>
        ) : (
          <h1 className="text-center text-xl font-medium">
            Pengumuman belum tersedia. Silakan cek kembali pada tanggal{" "}
            {releaseDate.toLocaleDateString("id-ID")}.
          </h1>
        )}
      </div>
    </main>
  );
};

// title
const Title = async ({
  isAnnouncementAvailable,
  releaseDate,
}: {
  isAnnouncementAvailable: boolean;
  releaseDate: Date;
}) => (
  <>
    {isAnnouncementAvailable ? (
      <section>
        <h1 className="text-2xl font-semibold sm:text-4xl">Pengumuman</h1>
        <p>
          Kamu dapat membuka hasil pengumuman{" "}
          <span className="font-semibold">Open recruitment</span>
        </p>
      </section>
    ) : (
      <section>
        <h1 className="text-2xl font-semibold sm:text-4xl">Pengumuman</h1>
        <p>
          Kamu dapat membuka hasil pengumuman pada{" "}
          <span className="font-semibold">
            {formatDate(releaseDate)}
          </span>
        </p>
      </section>
    )}
  </>
);

export default Pengumuman;
