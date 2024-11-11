import Link from "next/link";
import himakom from "@/logos/himakom.svg";
import omahti from "@/logos/omahti.svg";
import Image from "next/image";
import RegisterForm from "@/modules/auth/RegisterForm";

export default function LoginPage() {
  return (
    <>
      <div className="relative flex w-full max-w-md flex-col gap-4 items-center rounded-lg border border-custom-silver/15 bg-custom-black p-4 pt-20">
        <Logos />
        <h1 className="text-center text-3xl font-semibold text-white">
          Welcome to Open Recruitment 2024!
        </h1>

        {/* form component */}
        <RegisterForm />

        {/* redirect to sign up if user doesn't have an account */}
        <RedirectBox />
      </div>
    </>
  );
}

const Logos = () => (
  <div className="z-20 flex items-center gap-2">
    <Image src={himakom} alt="Logo Himakom" className="h-8 w-auto" />
    <Image src={omahti} alt="Logo OmahTI" className="h-8 w-auto" />
  </div>
);

const RedirectBox = () => (
  <div className="mt-8 flex w-full text-center items-center justify-center rounded-sm bg-custom-gray-dark/50 p-2">
    <span className="font-medium">
      Already have an account?{" "}
      <Link href="/auth/login" className="text-blue-500 hover:underline">
        Sign In
      </Link>
    </span>
  </div>
);
