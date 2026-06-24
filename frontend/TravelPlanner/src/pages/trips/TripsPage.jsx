import { AppHeader } from "../../components/layout/AppHeader";
import { Card } from "../../components/ui/Card";
import { ButtonLink } from "../../components/ui/ButtonLink";

export function TripsPage() {
  return (
    <>
      <AppHeader
        title="Travel plans"
        description="Create, organize and manage all your upcoming trips in one place."
        action={<ButtonLink to="/trips/create">Create travel plan</ButtonLink>}
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <Card>
          <p className="text-sm font-semibold text-[#7b6b5d]">
            Travel plans list will be implemented in the next stage.
          </p>
        </Card>
      </main>
    </>
  );
}
