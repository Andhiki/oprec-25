"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

interface PenugasanData {
  deskripsiPenugasan: string;
  toolsPenugasan: string;
  linkPenugasan: string;
}

const Penugasan = ({
  data,
  existingPenugasan,
  hasEnrolled,
}: {
  data: {
    himakom: boolean;
    slug: string;
    penugasan: PenugasanData;
  };
  existingPenugasan: any; // Adjust type as necessary
  hasEnrolled: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();

  // const handlePengumpulan = async (formData: any) => {
  //   try {
  //     setLoading(true);
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/divisi/${data.slug}/submit`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ link: formData.link, comment: " " }),
  //         credentials: "include",
  //       },
  //     );

  //     toast({
  //       title: `Tugas berhasil di-submit`,
  //       description: `Sampai jumpa di hari Wawancara! 😁`,
  //     });
  //     setLoading(false);

  //     if (!res.ok) {
  //       setLoading(false);
  //       throw new Error("Failed to submit the link");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setLoading(false);
  //   }
  // };

  const handleUpdatePenugasan = async (formData: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/divisi/${existingPenugasan._id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ link: formData.existingLink, comment: " " }),
          credentials: "include",
        },
      );

      toast({
        title: `Tugas berhasil di-update`,
        description: `Sampai jumpa di hari Wawancara! 😁`,
      });

      if (!res.ok) {
        throw new Error("Failed to update penugasan data");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-auto rounded-lg bg-custom-gray-dark p-4 xl:ml-0 xl:h-full xl:w-[30%]">
      <h1
        className={`${data.himakom ? "text-custom-blue" : "text-custom-orange"} mb-4`}
      >
        Penugasan
      </h1>

      <div className="mt-2 space-y-3">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold">Brief Penugasan</h1>
          <div className="w-full text-justify text-[0.9rem] leading-relaxed">
            {data.penugasan.deskripsiPenugasan}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-base font-semibold">Tools</h1>
          <div className="w-full text-pretty text-[0.9rem] leading-relaxed">
            {data.penugasan.toolsPenugasan}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="font-semibold">Penugasan</h1>
          <Link
            href={data.penugasan.linkPenugasan}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size={`lg`} className="w-full text-base">
              <Download className="mr-2 h-5 w-5" /> Download Penugasan
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Penugasan;
