import { AppHeader } from "../../components/layout/AppHeader";
import { SharedAccessEntry } from "../../components/sharedTrips/access/SharedAccessEntry";
import { SharedAccessStepCard } from "../../components/sharedTrips/access/SharedAccessStepCard";
import { SectionHeader } from "../../components/ui/SectionHeader";

export function SharedAccessPage() {
  return (
    <div className="grid gap-6">
      <AppHeader
        title="Shared access"
        subtitle="Open shared travel plans from links you receive in one simple place."
      />

      <section className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
        <SectionHeader
          title="How shared access works"
          description="Use a shared link to preview a travel plan and claim edit access when the link allows it."
        />

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <SharedAccessStepCard
            number="1"
            title="Paste the link"
            description="Paste the shared travel plan link or token you received from another user."
          />

          <SharedAccessStepCard
            number="2"
            title="Open preview"
            description="Travel Planner opens the shared preview page with trip details, activities, expenses and checklist."
          />

          <SharedAccessStepCard
            number="3"
            title="Claim edit access"
            description="If the link allows editing, you can claim access and continue working on the travel plan."
          />
        </div>
      </section>

      <section className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
        <SectionHeader
          title="Open shared travel plan"
          description="Paste a shared travel plan link or token below."
        />

        <div className="mt-5 max-w-2xl">
          <SharedAccessEntry />
        </div>
      </section>
    </div>
  );
}
