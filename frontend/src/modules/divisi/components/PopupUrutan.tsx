"use client";
import { useState } from "react";
import { SquareCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PopupDivisiBerhasil from "./PopupDivisiBerhasil";
import Cookies from "js-cookie";
import ErrorPopup from "@/components/ErrorPopup";
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";
type PopUpMilihProps = {
  className?: string;
  hasEnrolled: boolean;
  hasMax: boolean;
  params: string;
  prioritiesTaken: number[];
  enrolledDivisionsSorted?: {
    priority: number;
    name: string;
    slug: string;
    himakom: boolean;
  }[];
};

const PopupUrutan = ({
  className,
  hasEnrolled,
  hasMax,
  params,
  prioritiesTaken,
  enrolledDivisionsSorted,
}: PopUpMilihProps) => {
  const router = useRouter();
  const priorityNumbers = [1, 2, 3, 4];
  const [clickedButtons, setClickedButtons] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const handleButtonClick = (number: number) => {
    if (clickedButtons === number) {
      setClickedButtons(null);
    } else {
      setClickedButtons(number);
    }
  };

  const handleSubmit = async () => {
    console.error("Pendaftaran ditutup!")
  }

  // const handleSubmit = async () => {
  //   if (clickedButtons !== null && !hasMax) {
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/divisi/${params}/choose`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ urutanPrioritas: clickedButtons }),
  //           credentials: "include",
  //         },
  //       );
  //       const responseJson = await res.json();
  //       if (!res.ok) {
  //         setErrorMessage(responseJson.message);
  //         setShowErrorModal(true);
  //       } else {
  //         Cookies.set("accessToken", responseJson.accessToken);
  //         Cookies.set("refreshToken", responseJson.refreshToken);
  //         setShowSuccessModal(true); // Show success modal on success
  //       }
  //     } catch (error) {
  //       setShowErrorModal(true);
  //       setErrorMessage("");
  //     }
  //   }
  // };

  const handleClose = () => {
    setShowSuccessModal(false);
    router.refresh;
  };

  const handleErrorClose = () => {
    setShowErrorModal(false);
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger disabled asChild>
          <Button className="lg:text-md w-full text-sm tracking-wide">
            {hasMax
              ? `Batas pilihan divisi tercapai`
              : hasEnrolled
                ? `Divisi terpilih`
                : `Pilih divisi`}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="h-auto w-[90vw] scale-[80%] rounded-lg bg-custom-gray-dark p-0 xxs:w-[75vw] xs:w-[55vw] sm:scale-[75%] md:w-[40vw] lg:w-[38vw] lg:scale-[72%] xl:w-[30vw] xl:scale-[90%] 2xl:w-[25vw]">
          <div className="h-14 rounded-t-lg bg-custom-black sm:h-20 lg:h-24" />

          <div className="absolute left-1/2 top-[25px] -translate-x-1/2 sm:top-[35px] lg:top-[40px]">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white bg-custom-black p-3 sm:h-20 sm:w-20 sm:p-4 lg:h-28 lg:w-28 lg:p-6">
              <SquareCheck className="h-10 w-10 text-custom-silver sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
            </div>
          </div>

          <div className="mt-8 px-4 text-center *:text-custom-silver lg:mt-12">
            <p className="text-[0.9rem]">Konfirmasi jadwal</p>
            <AlertDialogTitle className="my-1.5 text-2xl">
              Kamu Sudah Yakin?
            </AlertDialogTitle>
            <p className="mb-2 text-[0.9rem]">
              Pilihan jadwal tidak dapat diubah
            </p>
          </div>

          <div className="mt-2 px-4 text-center">
            <p className="text-[0.9rem] text-white lg:mb-2">Urutan Prioritas</p>
            <div className="grid grid-cols-4 gap-2 pt-2 sm:gap-3">
              {priorityNumbers.map((number) => (
                <Button
                  key={number}
                  variant="outline"
                  onClick={() => handleButtonClick(number)}
                  disabled={prioritiesTaken.includes(number)}
                  className={`h-12 w-full text-base font-medium text-custom-silver hover:text-custom-silver sm:h-14 lg:h-16 ${
                    clickedButtons === number &&
                    "bg-custom-gray text-custom-silver hover:bg-custom-gray/80 hover:text-custom-silver"
                  } ${
                    prioritiesTaken.includes(number) && "cursor-not-allowed"
                  } ${
                    prioritiesTaken.includes(number) && enrolledDivisionsSorted?.find(div => div.priority === number)?.himakom
                    ? "border-custom-blue"
                    : prioritiesTaken.includes(number)
                    ? "border-custom-orange"
                    : ""
                  }`}
                >
                  {number}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col-reverse items-center justify-center gap-2 p-3 pt-0 xxs:flex-row sm:px-4">
            <AlertDialogCancel className="mt-0 w-full xxs:w-1/2" asChild>
              <Button
                variant={"outline"}
                size={`lg`}
                className="w-full text-[0.9rem] lg:w-1/2"
              >
                Batal
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction className="w-full xxs:w-1/2" asChild>
              <Button
                onClick={handleSubmit}
                size={`lg`}
                className="text-[0.9rem]"
              >
                Pilih
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Modal */}
      {showSuccessModal && (
        <PopupDivisiBerhasil open={showSuccessModal} onClose={handleClose} />
      )}
      {showErrorModal && (
        <ErrorPopup
          errorMessage={errorMessage || ""}
          open={showErrorModal}
          onErrorClose={handleErrorClose}
        />
      )}
    </>
  );
};

export default PopupUrutan;
