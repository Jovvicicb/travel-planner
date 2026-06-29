import { useState } from "react";

import { useSuccessMessage } from "../../../../hooks/common/useSuccessMessage";
import { useCreateChecklistItem } from "../../../../hooks/trips/checklist/create/useCreateChecklistItem";
import { useDeleteChecklistItem } from "../../../../hooks/trips/checklist/delete/useDeleteChecklistItem";
import { useChecklistItems } from "../../../../hooks/trips/checklist/list/useChecklistItems";
import { useToggleChecklistItem } from "../../../../hooks/trips/checklist/toggle/useToggleChecklistItem";
import { createChecklistItemFormModel } from "../../../../models/trips/checklist/create/createChecklistItemFormModel";
import { validateCreateChecklistItemForm } from "../../../../validation/trips/checklist/create/checklistItemCreateValidation";
import { ConfirmDialog } from "../../../ui/ConfirmDialog";
import { EmptyState } from "../../../ui/EmptyState";
import { ErrorBox } from "../../../ui/ErrorBox";
import { LoadingState } from "../../../ui/LoadingState";
import { SectionHeader } from "../../../ui/SectionHeader";
import { SuccessBox } from "../../../ui/SuccessBox";
import { CreateChecklistItemForm } from "../../checklist/create/CreateChecklistItemForm";
import { ChecklistItemList } from "../../checklist/list/ChecklistItemList";

export function TripChecklistTab({ trip }) {
  const [formData, setFormData] = useState(() =>
    createChecklistItemFormModel(),
  );

  const [errors, setErrors] = useState({});
  const [itemToDelete, setItemToDelete] = useState(null);

  const { successMessage, setSuccessMessage, clearSuccessMessage } =
    useSuccessMessage();

  const {
    checklistItems,
    loadingChecklistItems,
    checklistItemsError,
    reloadChecklistItems,
  } = useChecklistItems(trip.id);

  const {
    creatingChecklistItem,
    createChecklistItemError,
    createChecklistItem,
  } = useCreateChecklistItem();

  const {
    togglingChecklistItem,
    toggleChecklistItemError,
    toggleChecklistItem,
  } = useToggleChecklistItem();

  const {
    deletingChecklistItem,
    deleteChecklistItemError,
    deleteChecklistItem,
  } = useDeleteChecklistItem();

  const hasChecklistItems = checklistItems.length > 0;

  function resetForm() {
    setFormData(createChecklistItemFormModel());
    setErrors({});
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    clearSuccessMessage();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateCreateChecklistItemForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const createdItem = await createChecklistItem(trip.id, formData);

    if (!createdItem) {
      return;
    }

    resetForm();

    setSuccessMessage(
      `Checklist item "${createdItem.title}" created successfully.`,
    );

    await reloadChecklistItems();
  }

  function handleCancel() {
    resetForm();
    clearSuccessMessage();
  }

  async function handleToggle(item) {
    const updatedItem = await toggleChecklistItem(trip.id, item.id);

    if (!updatedItem) {
      return;
    }

    setSuccessMessage(
      updatedItem.isCompleted
        ? `Checklist item "${updatedItem.title}" marked as completed.`
        : `Checklist item "${updatedItem.title}" marked as pending.`,
    );

    await reloadChecklistItems();
  }

  function handleDeleteClick(item) {
    setItemToDelete(item);
    clearSuccessMessage();
  }

  function handleCancelDelete() {
    setItemToDelete(null);
  }

  async function handleConfirmDelete() {
    if (!itemToDelete) {
      return;
    }

    const deletedItem = await deleteChecklistItem(trip.id, itemToDelete.id);

    if (!deletedItem) {
      return;
    }

    const deletedItemTitle = itemToDelete.title;

    setItemToDelete(null);

    setSuccessMessage(
      `Checklist item "${deletedItemTitle}" deleted successfully.`,
    );

    await reloadChecklistItems();
  }

  return (
    <div className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Checklist"
        description="Create trip preparation tasks and keep important items organized."
      />

      {successMessage && (
        <div className="mb-5">
          <SuccessBox message={successMessage} />
        </div>
      )}

      {createChecklistItemError && (
        <div className="mb-5">
          <ErrorBox message={createChecklistItemError} />
        </div>
      )}

      {toggleChecklistItemError && (
        <div className="mb-5">
          <ErrorBox message={toggleChecklistItemError} />
        </div>
      )}

      {deleteChecklistItemError && (
        <div className="mb-5">
          <ErrorBox message={deleteChecklistItemError} />
        </div>
      )}

      <CreateChecklistItemForm
        formData={formData}
        errors={errors}
        submitting={creatingChecklistItem}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <div className="mt-6 border-t-2 border-[#b8a692] pt-5">
        <SectionHeader
          title="Checklist items"
          description="Review preparation tasks connected to this travel plan."
        />

        {loadingChecklistItems && (
          <LoadingState message="Loading checklist items..." />
        )}

        {!loadingChecklistItems && checklistItemsError && (
          <ErrorBox message={checklistItemsError} />
        )}

        {!loadingChecklistItems &&
          !checklistItemsError &&
          !hasChecklistItems && (
            <EmptyState
              title="No checklist items yet"
              description="Add the first checklist item to start organizing trip tasks."
            />
          )}

        {!loadingChecklistItems &&
          !checklistItemsError &&
          hasChecklistItems && (
            <ChecklistItemList
              items={checklistItems}
              tripId={trip.id}
              toggling={togglingChecklistItem}
              onToggle={handleToggle}
              onDelete={handleDeleteClick}
            />
          )}
      </div>

      <ConfirmDialog
        open={Boolean(itemToDelete)}
        title="Delete checklist item?"
        description={
          itemToDelete
            ? `This action will permanently delete "${itemToDelete.title}". This cannot be undone.`
            : ""
        }
        confirmLabel="Delete item"
        cancelLabel="Cancel"
        confirming={deletingChecklistItem}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
