import { Link } from "react-router-dom";
import { AppHeader } from "../../components/layout/AppHeader";
import { Card } from "../../components/ui/Card";

export function TripsPage() {
  return (
    <>
      <AppHeader
        title="Travel plans"
        description="Create, organize and manage all your upcoming trips in one place."
        action={
          <Link
            to="/trips/create"
            className="rounded-2xl bg-[#4b4036] px-5 py-3 text-sm font-black text-[#f8f3ec] shadow-lg shadow-[#2f2924]/10 transition hover:bg-[#5a4d41]"
          >
            Create travel plan
          </Link>
        }
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