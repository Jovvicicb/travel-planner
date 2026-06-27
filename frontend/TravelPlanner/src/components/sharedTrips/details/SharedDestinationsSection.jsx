import { EmptyState } from "../../ui/EmptyState";
import { SectionHeader } from "../../ui/SectionHeader";

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

export function SharedDestinationsSection({ destinations }) {
  return (
    <section className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Destinations"
        description="Places included in this shared travel plan."
      />

      {destinations.length === 0 && (
        <EmptyState
          title="No destinations"
          description="This shared travel plan does not have destinations yet."
        />
      )}

      {destinations.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          {destinations.map((destination) => (
            <article
              key={destination.id}
              className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5"
            >
              <h3 className="text-base font-black text-[#2f2924]">
                {destination.name}
              </h3>

              <p className="mt-1 text-sm font-semibold text-[#4b4036]">
                {destination.location}
              </p>

              <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
                {formatDate(destination.startDate)} -{" "}
                {formatDate(destination.endDate)}
              </p>

              <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-[#7b6b5d]">
                {destination.notes || "No notes added."}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
