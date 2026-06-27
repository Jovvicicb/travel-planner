import { EmptyState } from "../../ui/EmptyState";
import { SectionHeader } from "../../ui/SectionHeader";

export function SharedChecklistSection({ checklistItems }) {
  return (
    <section className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Checklist"
        description="Read-only preparation tasks for this travel plan."
      />

      {checklistItems.length === 0 && (
        <EmptyState
          title="No checklist items"
          description="This shared travel plan does not have checklist items yet."
        />
      )}

      {checklistItems.length > 0 && (
        <div className="grid gap-3">
          {checklistItems.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  readOnly
                  className="mt-1 h-5 w-5 shrink-0 accent-[#6f5f48]"
                />

                <div>
                  <h3
                    className={[
                      "text-base font-black",
                      item.isCompleted
                        ? "text-[#7b6b5d] line-through"
                        : "text-[#2f2924]",
                    ].join(" ")}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-[#7b6b5d]">
                    {item.isCompleted ? "Completed" : "Pending"}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
