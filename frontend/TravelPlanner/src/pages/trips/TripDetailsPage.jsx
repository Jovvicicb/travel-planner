import { useParams } from "react-router-dom";
import { AppHeader } from "../../components/layout/AppHeader";
import { Card } from "../../components/ui/Card";

export function TripDetailsPage() {
  const { tripId } = useParams();

  return (
    <>
      <AppHeader
        title="Travel plan details"
        description="Trip details module will be implemented in the next stage."
        backTo="/trips"
        backLabel="Back to travel plans"
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <Card>
          <p className="text-sm font-semibold text-[#7b6b5d]">
            Created travel plan ID: {tripId}
          </p>
        </Card>
      </main>
    </>
  );
}