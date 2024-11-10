"use client";
import Image from "next/image";
import { Logos } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { EyeIcon, LoaderCircle, UserRoundCheck } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const AdminDashboard = ({ allUsers, admin }: { allUsers: any; admin: any }) => {
  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  // Helper function to format the date
  const formatDate = (isoString: Date) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper function to find dipilihOleh and jam from sesi (now supports an array of user IDs)
  const getDipilihOlehAndJam = (sesi: any[], userId: string) => {
    const sesiMatched = sesi?.find((sesiItem) =>
      sesiItem.dipilihOleh?.includes(userId),
    );
    if (sesiMatched) {
      return { dipilihOleh: sesiMatched.dipilihOleh, jam: sesiMatched.jam };
    }
    return { dipilihOleh: null, jam: null };
  };

  const handleApprove = async (userId: string, acceptDivisionId: string) => {
    try {
      setPending(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/adminonly/admin/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, acceptDivisionId }),
        },
      );

      toast({
        title: "User approved",
        description: "User has been approved and accepted to the division.",
      });

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Failed to approve user",
          description: "Sorry, something went wrong. Please try again later.",
        });
        throw new Error("Failed to approve user");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to approve user",
        description: "Sorry, something went wrong. Please try again later.",
      });
      console.error(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen space-y-4 bg-custom-black text-custom-silver">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Image
          src={Logos[admin.username as keyof typeof Logos]}
          alt=""
          width={0}
          height={0}
          className="w-[2rem] sm:w-[3rem]"
        />
        <h1 className="flex h-full items-center text-[2rem] font-semibold sm:text-[3rem]">
          {admin.username.toUpperCase()}
        </h1>
      </div>

      <div className="flex w-full max-w-xs justify-between rounded-md bg-custom-gray-dark p-3 sm:ml-auto">
        <h1>
          <span className="font-medium text-custom-lavender">Status</span>{" "}
          Pendaftar
        </h1>
        <h1 className="font-bold">{allUsers.length}</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-custom-gray-dark">
        <div className="px-6 py-4 text-lg font-semibold">
          Informasi Pendaftar
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-custom-gray *:px-6 *:py-3 *:text-start *:text-[0.9rem] *:font-semibold">
              <th>No</th>
              <th>Nama</th>
              <th>
                Tanggal Wawancara{" "}
                <span className="text-custom-blue">HIMAKOM</span>
              </th>
              <th>
                Tanggal Wawancara{" "}
                <span className="text-custom-orange">OMAHTI</span>
              </th>
              <th>Penugasan</th>
              <th>Status Penerimaan</th>
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
                    className="border-t border-gray-700 *:px-6 *:py-4 *:text-sm"
                  >
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    {/* Tanggal Pilihan Hima */}
                    <td>
                      {dipilihHima ? (
                        <>{formatDate(jamHima)}</>
                      ) : (
                        <p className="opacity-50">Belum memilih</p>
                      )}
                    </td>
                    {/* Tanggal Pilihan OTI */}
                    <td>
                      {dipilihOti ? (
                        <>{formatDate(jamOti)}</>
                      ) : (
                        <p className="opacity-50">Belum memilih</p>
                      )}
                    </td>
                    <td className="">
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
                        <p className="text-sm opacity-50">
                          Belum ada penugasan
                        </p>
                      )}
                    </td>
                    <td className="">
                      {!user.diterimaDi ? (
                        <Button
                          size={`lg`}
                          className=""
                          variant={`whiteOutline`}
                          onClick={() =>
                            handleApprove(user._id, user.adminDivision._id)
                          }
                          disabled
                        >
                          {pending ? (
                            <>
                              <LoaderCircle
                                size={16}
                                className="animate-spin"
                              />
                              Approving...
                            </>
                          ) : (
                            <>
                              <UserRoundCheck size={16} />
                              Terima ke divisi
                            </>
                          )}
                        </Button>
                      ) : (
                        <p className="text-sm">
                          Sudah diterima di{" "}
                          <span className="text-custom-orange">
                            {" "}
                            {user.diterimaDi.judul}
                          </span>
                        </p>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
