const skeletonRows = Array.from({ length: 5 });

export default function ServicesListSkeleton() {
  return (
    <div className="space-y-10 sm:space-y-14 lg:space-y-16">
      {skeletonRows.map((_, index) => {
        const isReverse = index % 2 === 1;

        return (
          <article
            key={index}
            className="grid animate-pulse items-center gap-5 rounded-lg bg-white p-3 shadow-[0_16px_45px_rgba(0,112,102,0.08)] md:grid-cols-2 md:gap-8 md:p-4 lg:gap-[90px] lg:bg-transparent lg:p-0 lg:shadow-none"
          >
            <div
              className={`h-[210px] rounded-md bg-[#D9EAE8] sm:h-[270px] lg:h-[464px] ${
                isReverse ? "md:order-2" : ""
              }`}
            />

            <div className={isReverse ? "md:order-1" : ""}>
              <div className="h-8 w-2/3 rounded bg-[#D9EAE8] sm:h-10 lg:h-11" />
              <div className="mt-5 space-y-3">
                <div className="h-4 w-full rounded bg-[#D9EAE8] sm:h-5" />
                <div className="h-4 w-11/12 rounded bg-[#D9EAE8] sm:h-5" />
                <div className="h-4 w-4/5 rounded bg-[#D9EAE8] sm:h-5" />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 md:block md:space-y-3">
                {Array.from({ length: 4 }).map((__, pointIndex) => (
                  <div
                    key={pointIndex}
                    className="flex items-center gap-2 rounded-md bg-[#F4FAFA] px-2 py-2 md:bg-transparent md:px-0 md:py-0"
                  >
                    <div className="h-4 w-4 shrink-0 rounded-full bg-[#C1DAD7]" />
                    <div className="h-4 w-full rounded bg-[#D9EAE8]" />
                  </div>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
