import { clsx, type ClassValue } from "clsx";
import { toZonedTime } from "date-fns-tz";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// MAX ENROLLMENT
export const MAX_ENROLLMENTS = 4;


// LINIMASA / RECRUITMENT TIMELINE
// --------------------------------------------------------------------
export const LINIMASA_DETAIL = [
  {
    title: "Pilih Divisi & Penugasan",
    date: "10 Nov - 17 Nov",
    description:
      "Memilih 2 divisi Himakom (Opsional) dan 2 divisi OmahTI (Opsional)",
  },
  {
    title: "Wawancara",
    date: "18 - 21 Nov & 24 Nov",
    description:
      "Wawancara Himakom dan OmahTI sesuai divisi dan waktu yang telah dipilih",
  },
  {
    title: "Pengumuman",
    date: "4 Desember",
    description: "Hasil Pengumuman OmahTI dan Himakom",
  },
  
  {
    title: "First Gathering",
    date: "14 Desember",
    description: "First Gathering dengan anggota baru!!!",
  },
];
// --------------------------------------------------------------------

// FAQ QUESTIONS AND ANSWERS
// --------------------------------------------------------------------
export const OMAHTI_FAQ = [
  {
    question: "Siapa saja yang bisa mendaftar ke OMAHTI?",
    answer: "Mahasiswa dari jurusan ilmu komputer yang tertarik di bidang Teknologi Informasi dipersilakan untuk mendaftar.",
  },
  {
    question: "Apa saja kegiatan yang dilakukan di OMAHTI?",
    answer: "OMAHTI menyelenggarakan kegiatan berdasarkan 4 pilar, pelatihan, perlombaan, penelitian, dan projek.",
  },
  {
    question: "Apakah perlu pengalaman khusus untuk bergabung?",
    answer: "Tidak, semua level pengalaman diterima, baik yang masih belajar maupun yang sudah berpengalaman di bidang TI. Namun, terdapat penugasan sesuai divisi yang dipilih.",
  },
  {
    question: "Bagaimana proses seleksi di OMAHTI?",
    answer: "Proses seleksi melibatkan proses penugasan dan wawancara di pilihan yang lebih diprioritaskan",
  },
];
export const HIMAKOM_FAQ = [
  {
    question: "Apa saja syarat untuk bergabung dengan HIMAKOM?",
    answer: "Syarat utama adalah mahasiswa aktif jurusan Ilmu Komputer yang bersemangat dalam mengembangkan potensi di bidang teknologi.",
  },
  {
    question: "Apakah harus sudah mahir dalam coding untuk mendaftar?",
    answer: "Tidak, HIMAKOM membuka kesempatan bagi semua level kemampuan. Baik pemula maupun yang sudah berpengalaman dapat bergabung!",
  },
  {
    question: "Bagaimana proses seleksi anggota HIMAKOM?",
    answer: "Proses seleksi melibatkan tahap pemilihan divisi, penugasan sesuai divisi, dan wawancara.",
  },
  {
    question: "Apakah HIMAKOM hanya untuk mahasiswa Ilmu Komputer?",
    answer: "Ya, HIMAKOM dikhususkan untuk mahasiswa Ilmu Komputer. Namun, dalam beberapa kegiatan, kami membuka kolaborasi dengan jurusan lain.",
  },
];
// --------------------------------------------------------------------

// date formatter
// --------------------------------------------------------------------
export function formatDate(isoString: Date) {
    const jakartaDate = toZonedTime(new Date(isoString), 'Asia/Jakarta');
    return jakartaDate.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}
// --------------------------------------------------------------------