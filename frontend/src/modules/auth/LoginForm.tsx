"use client";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Info, LoaderCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(true);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [loadingReset, setLoadingReset] = useState<boolean>(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const email = watch("email");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" , "Accept": "application/json"},
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Incorrect email or password.");

      const user = await response.json();

      if (user.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/divisi");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Failed to log in");
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email to reset your password.");
      return;
    }

    try {
      setLoadingReset(true);
      setResetMessage(null);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/request-password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Failed to send password reset email.");
      setLoadingReset(false);
      setResetMessage("A password reset email has been sent to your email address.");
    } catch (err: any) {
      setLoadingReset(false);
      setError(err.message || "Failed to send reset email");
    }
  };

  return (
    <>
      {error && <ErrorToast message={error} onClick={() => setError(null)} />}
      {resetMessage && <p className="text-sm text-green-500">{resetMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-sm flex-col gap-4 rounded-lg">
        <div className="space-y-2">
          <label className={`${errors.email && "text-red-500"}`} htmlFor="email">
            Email address
          </label>
          <input
            type="text"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className={`w-full rounded-lg border border-white/10 bg-black/10 px-4 py-2 text-custom-silver placeholder-custom-gray-light focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-blue ${errors.email && "border border-red-500"}`}
            autoFocus
          />
          {errors.email && (
            <p className="flex gap-1.5 text-sm text-red-500">
              <Info size={10} className="mt-1 shrink-0" /> Invalid email address.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <label className={`${errors.password && "text-red-500"}`} htmlFor="password">
              Password
            </label>
            {loadingReset ? (
            <div className="flex items-center justify-center gap-2">
              <LoaderCircle className="animate-spin" size={20} />
            </div>
          ) : (
            <button
              type="button"
              onClick={handlePasswordReset}
              tabIndex={-1}
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </button>
          )}
          </div>

          <div className="relative">
            <input
              type={hide ? "password" : "text"}
              {...register("password", { required: true })}
              autoComplete="off"
              className={`w-full rounded-lg border border-white/10 bg-black/10 px-4 py-2 text-white placeholder-custom-gray-light focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-blue ${errors.password && "border-red-500"}`}
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2">
              <div className="cursor-pointer p-2 text-custom-silver" onClick={() => setHide(!hide)}>
                {hide ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </span>
            {errors.password && (
              <p className="mt-2 flex gap-1.5 text-sm text-red-500">
                <Info size={10} className="mt-1 shrink-0" /> Invalid password.
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          variant={`white`}
          size={`lg`}
          className="mt-2 w-full text-base"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <LoaderCircle className="animate-spin" size={20} />
            </div>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </>
  );
};

// toast for error
const ErrorToast = ({ message, onClick }: { message: string; onClick: () => void }) => (
  <div className="flex w-full max-w-sm items-center justify-between rounded-lg border-2 border-red-800 bg-red-900/30 p-4 font-medium text-custom-silver">
    <span>{message}</span>
    <X size={18} onClick={onClick} className="cursor-pointer text-custom-silver" />
  </div>
);

export default LoginForm;
