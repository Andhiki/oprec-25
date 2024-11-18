"use client";
import React, { useState } from "react";
import JadwalWawancara from "./JadwalWawancara";
import Popup from "./Popup";

interface PilihanWaktuProps {
  variant?: "omahti" | "himakom";
  slugWawancara: string;
  pilihanDivisi: any;
  wawancara: any;
  pilihan: any;
  onSelect?: () => void;
}

interface ScheduleSlot {
  id: string;
  sesi: Date;
  himakom: boolean;
  sessionId: string;
}

const PilihanWaktuCard = ({
  variant = "omahti",
  slugWawancara,
  pilihanDivisi,
  wawancara,
  pilihan,
}: PilihanWaktuProps) => {
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(
    pilihan && pilihan.sesi && pilihan.sesi.length > 0
      ? {
          id: pilihan._id,
          sesi: new Date(pilihan.sesi[0].jam),
          himakom: variant === "himakom",
          sessionId: pilihan.sesi[0]._id,
        }
      : null,
  );
  const [popupType, setPopupType] = useState<
    "gagal" | "berhasil" | "konfirmasi"
  >("gagal");

  const handleSlotSelect = (
    id: string,
    sesi: Date,
    himakom: boolean,
    sessionId: string,
  ) => {
    setSelectedSlot({ id, sesi, himakom, sessionId });
    console.log(selectedSlot);
    setPopupType("konfirmasi");
  };

  // Determine if the popup should be clickable
  const isPopupClickable = selectedSlot !== null;

  return (
    <div className="flex w-full flex-col items-center rounded-xl bg-custom-gray-dark p-2 sm:p-4">
      <div className="mb-2 flex w-full items-center justify-between sm:mb-4">
        {/* OMAHTI OR HIMAKOM */}
        <div
          className={`rounded-md bg-custom-black p-2 text-sm sm:text-base ${variant === "himakom" ? `text-custom-blue` : `text-custom-orange`}`}
        >
          {variant === "himakom" ? `Himakom` : `OmahTI`}
        </div>

        {/* Apply pointer-events based on selectedSlot */}
        <Popup
          disabled
          // disabled={Boolean(pilihan) ?? false}
          type={popupType}
          selectedSlot={selectedSlot}
        />
      </div>

      {/* Pass selectedSlot and handleSlotSelect to JadwalWawancara */}
      <JadwalWawancara
        variant={variant === "himakom" ? "himakom" : "omahti"}
        // disabled={Boolean(pilihan) ?? false}
        disabled
        slugWawancara={slugWawancara}
        pilihanDivisi={pilihanDivisi}
        wawancara={wawancara}
        selectedSlot={selectedSlot}
        onSlotSelect={handleSlotSelect}
      />
    </div>
  );
};

export default PilihanWaktuCard;
