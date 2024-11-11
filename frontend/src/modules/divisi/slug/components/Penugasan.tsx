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

  const handlePengumpulan = async (formData: any) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/divisi/${data.slug}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ link: formData.link, comment: " " }),
          credentials: "include",
        },
      );

      toast({
        title: `Tugas berhasil di-submit`,
        description: `Sampai jumpa di hari Wawancara! 😁`,
      });
      setLoading(false);

      if (!res.ok) {
        setLoading(false);
        throw new Error("Failed to submit the link");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

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

        {hasEnrolled && (
          <form
            onSubmit={
              existingPenugasan
                ? handleSubmit(handleUpdatePenugasan)
                : handleSubmit(handlePengumpulan)
            }
            className="space-y-1"
          >
            <h1 className="font-semibold">Pengumpulan</h1>
            <h2 className="text-[0.9rem]">
              Pengumpulan berupa link Google Drive/GitHub
            </h2>
            {existingPenugasan ? (
              <>
                <input
                  type="text"
                  placeholder={existingPenugasan.link}
                  {...register("existingLink", {
                    required: "Link is required.",
                    validate: (value) =>
                      !/\s/.test(value) || "Link cannot contain spaces.",
                  })}
                  className="w-full appearance-none rounded-sm bg-[#535362] p-2 text-left focus:border-none focus:outline-none focus:ring-2 focus:ring-custom-blue"
                />
                {errors.existingLink && (
                  <p className="text-sm text-red-500">
                    {errors.existingLink.message &&
                      typeof errors.existingLink.message === "string" &&
                      errors.existingLink.message}
                  </p>
                )}
                <Button size="lg" className="w-full text-base" type="submit">
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <LoaderCircle className="animate-spin" size={20} />
                    </div>
                  ) : (
                    `Update`
                  )}
                </Button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="https://github.com/..."
                  {...register("link", {
                    required: "Link is required.",
                    validate: {
                      noSpaces: (value) =>
                        !/\s/.test(value) || "Link cannot contain spaces.",
                      validUrl: (value) =>
                        /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
                          value,
                        ) || "Please enter a valid URL",
                    },
                  })}
                  className="w-full appearance-none rounded-sm bg-[#535362] p-2 text-left focus:border-none focus:outline-none focus:ring-2 focus:ring-custom-blue"
                />
                {errors.link && (
                  <p className="text-sm text-red-500">
                    {errors.link.message &&
                      typeof errors.link.message === "string" &&
                      errors.link.message}
                  </p>
                )}
                <Button size="lg" className="w-full text-base" type="submit">
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <LoaderCircle className="animate-spin" size={20} />
                    </div>
                  ) : (
                    `Submit`
                  )}
                </Button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Penugasan;
