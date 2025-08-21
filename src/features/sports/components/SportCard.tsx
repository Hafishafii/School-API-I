import type { SportItem } from "../types";
import WinnerCard from "./WinnerCard";

export default function SportCard({ sport }: { sport: SportItem }) {
  return (
    <section className="bg-white/90 backdrop-blur rounded-2xl shadow-sm ring-1 ring-gray-100 p-5 md:p-6 mb-8">
      {/* Title */}
      <h2 className="text-xl font-semibold text-center">{sport.title}</h2>

      {/* Description */}
      <p className="text-gray-700 text-sm md:text-[15px] mt-2 text-justify">
        {sport.description}
      </p>

      {/* Winners */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-center text-gray-700 mb-3">
          Winners
        </h3>

        {sport.winners.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">No winners announced yet.</p>
        ) : (
          <div className="flex justify-center gap-6">
            {/* Render winners in forced order: 3rd | 1st | 2nd */}
            {["3rd", "1st", "2nd"].map((pos) =>
              sport.winners
                .filter((w) => w.position === pos)
                .map((w) => <WinnerCard key={`${sport.id}-${pos}-${w.id}`} winner={w} />)
            )}
          </div>
        )}
      </div>

      {/* Gallery */}
      {sport.images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {sport.images.map((src, i) => (
            <img
              key={`${sport.id}-img-${i}`}
              src={src}
              alt={`${sport.title} ${i + 1}`}
              className="w-full h-36 md:h-40 object-cover rounded-lg"
              loading="lazy"
            />
          ))}
        </div>
      )}
    </section>
  );
}
