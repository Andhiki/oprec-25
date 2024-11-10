import Image from "next/image";
import LoadingGif from "@/../public/assets/components/Loading.gif";

const Loading = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Image unoptimized src={LoadingGif} className="h-auto w-48" alt="Loading GIF" />
    </div>
  );
};

export default Loading;
