import Link from "next/link";
import LoginForm from "@/modules/auth/LoginForm";
import himakom from "@/logos/himakom.svg";
import omahti from "@/logos/omahti.svg";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <div className="relative gap-4 bg-custom-black rounded-lg border border-custom-silver/15 p-4 pt-20 flex w-full max-w-md flex-col items-center">
        <Logos />
        <h1 className="text-center text-3xl font-semibold text-white">
          Welcome back!
        </h1>

        {/* form component */}
        <LoginForm />

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
  <div className="mt-8 text-center flex w-full items-center justify-center rounded-sm  bg-custom-gray-dark/50 p-2">
    <span className="font-medium">
      Don&apos;t have an account?{" "}
      <Link href="/auth/register" className="text-blue-500 hover:underline">
        Sign Up
      </Link>
    </span>
  </div>
);
