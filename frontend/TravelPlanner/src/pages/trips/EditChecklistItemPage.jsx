import { useParams } from "react-router-dom";

import { AppHeader } from "../../components/layout/AppHeader";
import { EditChecklistItemFormContent } from "../../components/trips/checklist/update/EditChecklistItemFormContent";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { useChecklistItems } from "../../hooks/trips/checklist/list/useChecklistItems";
import { useTripDetails } from "../../hooks/trips/details/useTripDetails";

export function EditChecklistItemPage() {
  const { tripId, itemId } = useParams();

  const { trip, loadingTrip, tripError } = useTripDetails(tripId);

  const { checklistItems, loadingChecklistItems, checklistItemsError } =
    useChecklistItems(tripId);

  const item = checklistItems.find(
    (checklistItem) => checklistItem.id === Number(itemId),
  );

  const loading = loadingTrip || loadingChecklistItems;
  const error = tripError || checklistItemsError;

  const backTo = `/trips/${tripId}?tab=checklist`;

  return (
    <>
      <AppHeader
        title="Edit checklist item"
        description={
          item
            ? `Update checklist item "${item.title}".`
            : "Update selected checklist item."
        }
        backTo={backTo}
        backLabel="Back to checklist"
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <section className="mx-auto w-full max-w-4xl rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
          {loading && <LoadingState message="Loading checklist item..." />}

          {!loading && error && <ErrorBox message={error} />}

          {!loading && !error && !item && (
            <ErrorBox message="Checklist item not found." />
          )}

          {!loading && !error && trip && item && (
            <EditChecklistItemFormContent
              key={item.id}
              trip={trip}
              item={item}
            />
          )}
        </section>
      </main>
    </>
  );
}
