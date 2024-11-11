import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/Container";

const Loading = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-custom-gray to-custom-black to-30%">
      <Container className="flex flex-col gap-4 xl:flex-row" parentClass="bg-transparent">
        {/* left side 70% */}
        <div className="space-y-6 xl:w-[70%]">
          {/* Back button skeleton */}
          <Skeleton className="h-10 w-24 bg-custom-gray-dark" />

          {/* Title section skeleton */}
          <div className="flex flex-col justify-between space-y-3 md:flex-row md:items-end">
            <div className="flex items-end gap-4">
              <Skeleton className="h-32 w-32 bg-custom-gray-dark" /> {/* Logo skeleton */}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-12 w-48 bg-custom-gray-dark" /> {/* Title skeleton */}
                <Skeleton className="h-6 w-64 bg-custom-gray-dark" /> {/* Subtitle skeleton */}
              </div>
            </div>
            {/* Status box skeleton */}
            <Skeleton className="h-32 w-full md:w-64 bg-custom-gray-dark" />
          </div>

          {/* About section skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-8 w-32 bg-custom-gray-dark" /> {/* Section title */}
            <Skeleton className="h-40 w-full bg-custom-gray-dark" /> {/* Content */}
          </div>

          {/* Projects section skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-8 w-32 bg-custom-gray-dark" /> {/* Section title */}
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 w-72 bg-custom-gray-dark" />
              ))}
            </div>
          </div>
        </div>

        {/* right side 30% - Penugasan skeleton */}
        <div className="xl:w-[30%]">
          <Skeleton className="h-[calc(100vh-2rem)] w-full rounded-lg bg-custom-gray-dark" />
        </div>
      </Container>
    </section>
  );
};

export default Loading;