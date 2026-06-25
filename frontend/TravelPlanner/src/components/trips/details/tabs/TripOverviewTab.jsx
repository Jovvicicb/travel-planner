import { useNavigate } from "react-router-dom";
import { toTripDetailsDisplayModel } from "../../../../mappers/trips/details/tripDetailsDisplayMapper";
import { useDeleteTrip } from "../../../../hooks/trips/delete/useDeleteTrip";
import { Button } from "../../../ui/Button";
import { ButtonLink } from "../../../ui/ButtonLink";
import { Card } from "../../../ui/Card";
import { ErrorBox } from "../../../ui/ErrorBox";
import { SectionHeader } from "../../../ui/SectionHeader";
import { TripInfoItem } from "../TripInfoItem";

export function TripOverviewTab({ trip }) {
  const navigate = useNavigate();
  const displayTrip = toTripDetailsDisplayModel(trip);
  const { deleting, deleteError, deleteTrip } = useDeleteTrip();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this travel plan?",
    );

    if (!confirmed) {
      return;
    }

    await deleteTrip(displayTrip.id);

    navigate("/trips");
  }

  return (
    <Card>
      <SectionHeader
        title="Overview"
        description="Review the main information about this travel plan."
        action={
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink to={`/trips/${displayTrip.id}/edit`} size="sm">
              Edit travel plan
            </ButtonLink>

            <Button
              type="button"
              variant="danger"
              size="sm"
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        }
      />

      {deleteError && (
        <div className="mb-5">
          <ErrorBox message={deleteError} />
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <TripInfoItem label="Start date" value={displayTrip.startDate} />
        <TripInfoItem label="End date" value={displayTrip.endDate} />
        <TripInfoItem label="Budget" value={displayTrip.budget} />
        <TripInfoItem label="Owner ID" value={`#${displayTrip.ownerUserId}`} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-5">
          <h3 className="text-base font-black text-[#2f2924]">Description</h3>

          <p className="mt-2 whitespace-pre-line text-sm font-semibold leading-6 text-[#7b6b5d]">
            {displayTrip.description}
          </p>
        </section>

        <section className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-5">
          <h3 className="text-base font-black text-[#2f2924]">Notes</h3>

          <p className="mt-2 whitespace-pre-line text-sm font-semibold leading-6 text-[#7b6b5d]">
            {displayTrip.notes}
          </p>
        </section>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <TripInfoItem label="Created at" value={displayTrip.createdAt} />
        <TripInfoItem label="Updated at" value={displayTrip.updatedAt} />
      </div>
    </Card>
  );
}
