const gallerySkeletons = Array.from({ length: 3 });
const imageSkeletons = Array.from({ length: 5 });

export default function ProjectGallerySkeleton() {
  return (
    <div className="container mx-auto px-4">
      {gallerySkeletons.map((_, galleryIndex) => (
        <div key={galleryIndex} className="mb-7 last:mb-0">
          <div className="mb-5 sm:mb-7">
            <div className="h-7 w-3/4 animate-pulse rounded bg-[#D9EAE8] sm:h-9 sm:w-1/2" />
            <div className="mt-3 h-4 w-full max-w-2xl animate-pulse rounded bg-[#D9EAE8] sm:h-5" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {imageSkeletons.map((__, imageIndex) => (
              <div
                key={imageIndex}
                className="h-[210px] animate-pulse rounded-md bg-[#D9EAE8] sm:h-[236px] lg:h-[258px]"
              />
            ))}
          </div>

          <div className="mt-5 flex justify-end gap-2 sm:mt-6 sm:gap-3">
            <div className="h-9 w-9 animate-pulse rounded-full bg-[#D9EAE8] sm:h-10 sm:w-10" />
            <div className="h-9 w-9 animate-pulse rounded-full bg-[#D9EAE8] sm:h-10 sm:w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
