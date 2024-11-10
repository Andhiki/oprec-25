"use client";
import { LoaderCircle, LogOut as LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Logout({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      router.push("/");
      router.refresh();
      toast({
        title: "Logout Berhasil",
        description: "Anda telah keluar dari akun Anda.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Gagal",
        description: "Gagal keluar dari akun. Silakan coba lagi",
      });
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`flex aspect-square shrink-0 items-center justify-center gap-4 rounded-md bg-custom-gray px-2 py-3 text-white hover:bg-custom-gray/90 lg:aspect-auto ${className}`}
      >
        <LogOutIcon className="h-5" />
        <p className="hidden lg:block">Log Out</p>
      </AlertDialogTrigger>
      <AlertDialogContent className="scale-90 rounded-lg lg:scale-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Keluar</AlertDialogTitle>
          <AlertDialogDescription className="text-[0.9rem]">
            Apakah Anda yakin ingin keluar? Anda perlu masuk kembali untuk
            mengakses akun Anda.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="*:text-[0.9rem]">
          <AlertDialogCancel disabled={loading}>Kembali</AlertDialogCancel>
          <Button
            variant={`destructive`}
            size={`lg`}
            disabled={loading}
            onClick={handleLogout}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <LoaderCircle className="animate-spin" size={25} />
              </div>
            ) : (
              "Log Out"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
