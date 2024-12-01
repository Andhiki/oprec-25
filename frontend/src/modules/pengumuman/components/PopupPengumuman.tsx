import { X, CalendarDays } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Logos } from "@/utils/types";
import ButtonLink from "@/components/ui/ButtonLink";
export default function PopupPengumuman({ className, diterimaDi }: any) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-base" size="lg" variant="white">
          Buka Pengumuman
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-auto w-[99vw] scale-95 rounded-lg bg-custom-gray-dark p-0 xxs:w-[80vw] xs:w-[55vw] md:w-[40vw] lg:w-[38vw] xl:w-[30vw]">
        <div className="h-14 rounded-t-lg bg-custom-black sm:h-20 lg:h-24" />

        <div className="absolute left-1/2 top-[25px] -translate-x-1/2 sm:top-[35px] lg:top-[40px]">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white bg-custom-black p-3 sm:h-20 sm:w-20 sm:p-4 lg:h-28 lg:w-28 lg:p-6">
            {diterimaDi ? (
              <Image
                src={Logos[diterimaDi.slug as keyof typeof Logos]}
                alt={`${diterimaDi.judul} Logo`}
                width={298}
                height={113}
                className="h-6 w-auto sm:h-8 lg:h-12"
              />
            ) : (
              <X className="h-10 w-10 text-white sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
            )}
          </div>
        </div>

        <div className="mt-8 px-4 text-center lg:mt-12">
          {diterimaDi ? (
            <>
              <p className="text-[0.9rem]">Kamu berhasil diterima di divisi</p>
              <AlertDialogTitle className="mx-2 mb-8 mt-1 text-xl sm:text-3xl">
                {diterimaDi.judulPanjang}
              </AlertDialogTitle>
              <p className="text-[0.9rem]">
                Jangan lupa untuk bergabung dengan grup
              </p>
            </>
          ) : (
            <>
              <AlertDialogTitle className="mb-8 mt-3 text-xl">
                Maaf kamu belum diterima dalam <br /> periode rekruitmen ini
              </AlertDialogTitle>
              <p className="text-[0.9rem]">
                Jangan menyerah dan tetap semangat!
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col-reverse items-center justify-center gap-2 p-4 pt-0 xxs:flex-row sm:px-4 lg:flex-row lg:pt-2">
          {diterimaDi ? (
            <>
              <AlertDialogCancel className="mt-0" asChild>
                <Button variant="outline" size="lg" className="w-full lg:w-1/2">
                  Kembali
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link
                  href={
                    diterimaDi.himakom
                      ? "https://line.me/ti/g/gNSyy59_RZ"
                      : "https://chat.whatsapp.com/FhlKtDCYd0ZEYThKqjVJvt"
                  }
                  passHref
                >
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-[0.9rem] lg:w-1/2 block bg-gray-200 p-4 text-center rounded-lg"
                  >
                    Grup
                  </a>
                </Link>
              </AlertDialogAction>
            </>
          ) : (
            <AlertDialogAction asChild>
              <Button size="lg" className="w-full">
                Selesai
              </Button>
            </AlertDialogAction>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
