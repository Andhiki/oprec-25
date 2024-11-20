import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

const DivisionTable = ({ allUsers, admin }: { allUsers: any; admin: any }) => {
  const getDipilihOlehAndJam = (sesi: any[], userId: string) => {
    const sesiMatched = sesi?.find((sesiItem) =>
      sesiItem.dipilihOleh?.includes(userId),
    );
    if (sesiMatched) {
      return { dipilihOleh: sesiMatched.dipilihOleh, jam: sesiMatched.jam };
    }
    return { dipilihOleh: null, jam: null };
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-custom-gray *:px-4 *:py-3 *:text-start *:text-[0.9rem] *:font-semibold *:transition-all">
          <th className="hover:bg-custom-black/10">No</th>
          <th className="hover:bg-custom-black/10">Nama</th>
          <th className="hover:bg-custom-black/10">Divisi Pilihan</th>
          <th className="text-center hover:bg-custom-black/10">
            Tanggal Wawancara{" "}
            <span className="text-custom-lavender">HIMAKOM</span>
          </th>
          <th className="text-center hover:bg-custom-black/10">
            Tanggal Wawancara <span className="text-custom-orange">OMAHTI</span>
          </th>
          <th className="text-center hover:bg-custom-black/10">Penugasan</th>
        </tr>
      </thead>
      <tbody>
        {allUsers && allUsers.length > 0 ? (
          allUsers.map((user: any, index: number) => {
            // Get dipilihOleh and jam for both tanggalPilihanHima and tanggalPilihanOti
            const { dipilihOleh: dipilihHima, jam: jamHima } =
              user.tanggalPilihanHima
                ? getDipilihOlehAndJam(
                    user.tanggalPilihanHima.tanggalId.sesi,
                    user._id,
                  )
                : { dipilihOleh: null, jam: null };

            const { dipilihOleh: dipilihOti, jam: jamOti } =
              user.tanggalPilihanOti
                ? getDipilihOlehAndJam(
                    user.tanggalPilihanOti.tanggalId.sesi,
                    user._id,
                  )
                : { dipilihOleh: null, jam: null };

            return (
              <tr
                key={user._id}
                className="border-t border-gray-700 transition-all *:px-4 *:py-4 *:text-sm hover:bg-custom-black/20"
              >
                <td className="text-center">{index + 1}</td>

                <td>{user.username}</td>
                <td className="space-y-1.5">
                  {user.divisiPilihan && user.divisiPilihan.length > 0 ? (
                    user.divisiPilihan
                      .slice()
                      .sort(
                        (a: any, b: any) =>
                          a.urutanPrioritas - b.urutanPrioritas,
                      )
                      .map((divisi: any) => (
                        <div
                          key={divisi._id}
                          className="flex flex-nowrap items-center"
                        >
                          <div
                            className={`mr-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border ${
                              divisi.divisiId.himakom
                                ? "border-custom-lavender text-custom-lavender"
                                : "border-custom-orange text-custom-orange"
                            } `}
                          >
                            {divisi.urutanPrioritas}
                          </div>
                          {divisi.divisiId?.slug.toUpperCase()}
                        </div>
                      ))
                  ) : (
                    <p className="opacity-50">Belum memilih</p>
                  )}
                </td>

                {/* Tanggal Pilihan Hima */}
                <td>
                  {dipilihHima && user.enrolledSlugHima === admin.username ? (
                    formatDate(jamHima)
                  ) : (
                    <p className="opacity-50">Belum memilih</p>
                  )}
                </td>

                {/* Tanggal Pilihan OTI */}
                <td>
                  {dipilihOti && user.enrolledSlugOti === admin.username ? (
                    formatDate(jamOti)
                  ) : (
                    <p className="opacity-50">Belum memilih</p>
                  )}
                </td>

                <td>
                  {user.tugas.length > 0 ? (
                    <Link
                      href={user.tugas[0].link}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Button
                        size={`sm`}
                        variant={`white`}
                        className="max-w-32 truncate rounded-full"
                      >
                        <EyeIcon size={14} className="mr-1 shrink-0" />
                        <span className="truncate">
                          {user.tugas[0].link.replace(/^https?:\/\//, "")}
                        </span>
                      </Button>
                    </Link>
                  ) : (
                    <p className="text-sm opacity-50">Belum ada penugasan</p>
                  )}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
              Belum ada pendaftar.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DivisionTable;
