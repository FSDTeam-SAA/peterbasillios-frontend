const skeletonItems = Array.from({ length: 4 });

export default function WhatWeBuildSkeleton() {
  return (
    <section className="overflow-hidden py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-8 text-center sm:mb-14 lg:mb-16">
          <h2 className="text-[34px] font-normal leading-tight text-[#000000] sm:text-5xl md:text-6xl lg:text-7xl">
            What We <span className="italic font-light">Build</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-2 lg:gap-8 xl:grid-cols-4">
          {skeletonItems.map((_, index) => (
            <article
              key={index}
              className={`group flex flex-col rounded-md bg-[#F4FAFA] p-2 shadow-[0_14px_35px_rgba(0,112,102,0.08)] sm:border-l sm:border-gray-300 sm:bg-transparent sm:p-0 sm:pl-5 sm:shadow-none ${
                index % 2 === 1 ? "xl:pt-20" : ""
              }`}
            >
              <div className="h-4 w-6 animate-pulse rounded bg-[#D9EAE8] sm:h-5 sm:w-8" />
              <div className="mt-2 h-[38px] w-4/5 animate-pulse rounded bg-[#D9EAE8] sm:h-8" />
              <div className="relative mt-3 aspect-[4/3] animate-pulse overflow-hidden rounded-md bg-[#D9EAE8] sm:mt-4 sm:rounded-lg" />

              <div className="mt-3 space-y-2 sm:mt-5">
                <div className="h-3 w-full animate-pulse rounded bg-[#D9EAE8] sm:h-4" />
                <div className="h-3 w-11/12 animate-pulse rounded bg-[#D9EAE8] sm:h-4" />
                <div className="h-3 w-4/5 animate-pulse rounded bg-[#D9EAE8] sm:h-4" />
              </div>

              <div className="mt-4 h-9 w-9 animate-pulse rounded-full bg-[#D9EAE8] sm:mt-6 sm:h-11 sm:w-11" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
