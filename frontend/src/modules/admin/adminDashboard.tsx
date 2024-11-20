import MakomtiTable from "./components/makomti-table";
import DivisionTable from "./components/division-table";
import NumberTicker from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import HyperText from "@/components/ui/hyper-text";
import Image from "next/image";
import { Logos } from "@/utils/types";
import { User } from "lucide-react";

const AdminDashboard = ({ allUsers, admin }: { allUsers: any; admin: any }) => {
  allUsers = allUsers.filter(
    (user: any) =>
      !user.email.includes("omahti.oke") &&
      !user.email.includes("himakom.mantap") &&
      !user.username.includes("MAKOMTI"),
  );

  return (
    <div className="min-h-screen space-y-4 bg-custom-black text-custom-silver">
      {/* Header */}
      <div className="flex items-center gap-4">
        {admin.username === "MAKOMTI" || (
          <Image
            src={Logos[admin.username as keyof typeof Logos]}
            alt=""
            width={0}
            height={0}
            className="w-[2.5rem] sm:w-[3rem]"
          />
        )}

        {/* page title */}
        <HyperText
          text={admin.username}
          className="font-poppins-semibold text-[2.5rem] sm:text-[3rem]"
        />
      </div>

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        <h2 className="text-custom-silver/80">
          Penerimaan pendaftar ke dalam divisi akan dilakukan saat{" "}
          <span className="font-semibold text-custom-silver">Mubes.</span>
        </h2>
        <div className="relative flex w-full justify-between rounded-md bg-custom-gray-dark p-3 sm:max-w-xs">
          <h1>
            <span className="font-medium text-custom-lavender">Status</span>{" "}
            Pendaftar
          </h1>
          <NumberTicker
            value={allUsers.length}
            className="font-bold text-custom-silver"
          />

          <BorderBeam />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg bg-custom-gray-dark">
        <div className="px-6 py-4 text-lg font-semibold">
          Informasi Pendaftar
        </div>
        {admin.username === "MAKOMTI" ? (
          <MakomtiTable allUsers={allUsers} admin={admin} />
        ) : (
          <DivisionTable allUsers={allUsers} admin={admin} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
