"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import { ChevronDown, LoaderCircle, UserRoundCheck } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MakomtiRowProps = {
  user: any;
  index: number;
};

const MakomtiRow = ({ user, index }: MakomtiRowProps) => {
  const [pending, setPending] = useState(false);
  const [approved, setApproved] = useState(false);
  const { toast } = useToast();
  const [selectedDivision, setSelectedDivision] = useState<{
    [userId: string]: string;
  }>({});
  const mubesDate = new Date("2024-11-30T00:00:00.000Z");
  const currentDate = Date.now();
  const currentDateParah = new Date(currentDate);

  const handleDivisionChange = (userId: string, divisionId: string) => {
    setSelectedDivision((prev) => ({
      ...prev,
      [userId]: divisionId,
    }));
  };

  // function to get jam pilihan
  const getDipilihOlehAndJam = (sesi: any[], userId: string) => {
    const sesiMatched = sesi?.find((sesiItem) =>
      sesiItem.dipilihOleh?.includes(userId),
    );
    if (sesiMatched) {
      return { dipilihOleh: sesiMatched.dipilihOleh, jam: sesiMatched.jam };
    }
    return { dipilihOleh: null, jam: null };
  };

  //   get dipilih oleh and jam for hima and oti
  const { dipilihOleh: dipilihHima, jam: jamHima } = user.tanggalPilihanHima
    ? getDipilihOlehAndJam(user.tanggalPilihanHima.tanggalId.sesi, user._id)
    : { dipilihOleh: null, jam: null };
  const { dipilihOleh: dipilihOti, jam: jamOti } = user.tanggalPilihanOti
    ? getDipilihOlehAndJam(user.tanggalPilihanOti.tanggalId.sesi, user._id)
    : { dipilihOleh: null, jam: null };

  // approve user
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
      setApproved(true);
    }
  };

  return (
    <tr
      key={user._id}
      className="border-t border-gray-700 transition-all *:px-4 *:py-4 *:text-sm hover:bg-custom-black/20"
    >
      <td className="text-center">{index + 1}</td>
      <td className="max-w-[200px] overflow-x-hidden text-ellipsis text-wrap">
        {user.username}
      </td>
      <td className="space-y-1.5">
        {user.divisiPilihan && user.divisiPilihan.length > 0 ? (
          user.divisiPilihan
            .slice()
            .sort((a: any, b: any) => a.urutanPrioritas - b.urutanPrioritas)
            .map((divisi: any) => (
              <div key={divisi._id} className="flex flex-nowrap items-center">
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
      <td>
        {dipilihHima ? (
          formatDate(jamHima)
        ) : (
          <p className="opacity-50">Belum memilih</p>
        )}
      </td>
      <td>
        {dipilihOti ? (
          formatDate(jamOti)
        ) : (
          <p className="opacity-50">Belum memilih</p>
        )}
      </td>
      <td>
        {!user.diterimaDi ? (
          <td className="flex items-center gap-2">
            <Select
              value={selectedDivision[user._id] || ""}
              onValueChange={(value) => handleDivisionChange(user._id, value)}
            >
              <SelectTrigger className="w-[150px] overflow-hidden text-ellipsis">
                <SelectValue placeholder="Pilih divisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {user.divisiPilihan.length > 0 ? (
                    user.divisiPilihan.map((divisi: any) => (
                      <SelectItem
                        key={divisi._id}
                        className="text-[0.7rem]"
                        value={divisi.divisiId?._id || ""}
                      >
                        {divisi.divisiId?.judul || ""}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectLabel className="text-[0.7rem] font-normal text-custom-black/80">
                      Tidak mendaftar
                    </SelectLabel>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>

            {approved ? (
              <p className="text-sm">
                Sudah diterima di{" "}
                <span className="text-custom-orange">
                  {user.diterimaDi?.judul}
                </span>
              </p>
            ) : (
              <Button
                variant="whiteOutline"
                onClick={() =>
                  handleApprove(user._id, selectedDivision[user._id])
                }
                disabled={
                  currentDateParah < mubesDate ||
                  pending ||
                  !selectedDivision[user._id]
                }
                className="p-3"
              >
                {pending ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <UserRoundCheck size={16} />
                )}
              </Button>
            )}
          </td>
        ) : (
          <p className="text-sm">
            Sudah diterima di{" "}
            <span className="text-custom-orange">{user.diterimaDi?.judul}</span>
          </p>
        )}
      </td>
    </tr>
  );
};

export default MakomtiRow;
