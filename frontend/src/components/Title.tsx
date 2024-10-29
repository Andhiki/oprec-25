import Image from "next/image";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import Link from "next/link";

const Title = () => {
  return (
    <>
      <div className="flex items-center gap-[13px]">
        <div className="relative aspect-square size-[38px]">
          <Image
            alt="Logo"
            className="object-cover"
            src="https://img.freepik.com/free-psd/3d-illustration-bald-person-with-glasses_23-2149436184.jpg?w=826&t=st=1729060915~exp=1729061515~hmac=dc911f470a5362d31529331c2e5ba014647fd3219c2e050b0d34e03a59d6002e"
            sizes="100%"
            fill
          />
        </div>
        <Link href={`/`}>
          <h1 className="leading-slug leading text-wrap font-semibold">
            <div className="flex flex-col">
              <AnimatedGradientText className="border-none bg-transparent p-0 font-semibold outline-none">
                <span className="inline animate-gradient bg-gradient-to-r from-custom-peach via-custom-blue to-custom-peach bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
                  Open Recruitment
                </span>
              </AnimatedGradientText>
              <span>Makomti 2024</span>
            </div>
          </h1>
        </Link>
      </div>
    </>
  );
};

export default Title;
