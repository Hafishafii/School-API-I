import type { SportItem } from "../types";
import WinnerCard from "./WinnerCard";

export default function SportCard({ sport }: { sport: SportItem }) {
  return (
    <section className="bg-white/90 backdrop-blur rounded-2xl shadow-sm ring-1 ring-gray-100 p-4 sm:p-6 mb-8 flex flex-col">
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold text-center break-words">
        {sport.title}
      </h2>

      {/* Description */}
      <p className="text-gray-700 text-sm sm:text-[15px] mt-2 text-justify break-words">
        {sport.description}
      </p>

      {/* Winners */}
      <div className="mt-6">
        <h3 className="text-sm sm:text-base font-semibold text-center text-gray-700 mb-3">
          Winners
        </h3>

        {sport.winners.length === 0 ? (
          <p className="text-center text-gray-500 text-sm sm:text-base break-words">
            No winners announced yet.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {["3rd", "1st", "2nd"].map((pos) =>
              sport.winners
                .filter((w) => w.position === pos)
                .map((w) => (
                  <WinnerCard
                    key={`${sport.id}-${pos}-${w.id}`}
                    winner={w}
                  />
                ))
            )}
          </div>
        )}
      </div>

      {/* Gallery */}
      {sport.images.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <div className="flex gap-2 sm:gap-3 snap-x snap-mandatory">
            {sport.images.map((src, i) => (
              <img
                key={`${sport.id}-img-${i}`}
                src={src}
                alt={`${sport.title} ${i + 1}`}
                className="w-32 sm:w-36 md:w-40 h-28 sm:h-32 md:h-36 lg:h-40 object-cover rounded-lg flex-shrink-0 snap-start"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
