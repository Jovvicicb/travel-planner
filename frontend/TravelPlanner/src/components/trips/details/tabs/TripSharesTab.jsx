import { useState } from "react";

import { useSuccessMessage } from "../../../../hooks/common/useSuccessMessage";
import { useCollaborators } from "../../../../hooks/trips/shares/collaborators/useCollaborators";
import { useRemoveCollaborator } from "../../../../hooks/trips/shares/collaborators/useRemoveCollaborator";
import { useCreateShare } from "../../../../hooks/trips/shares/create/useCreateShare";
import { useDeactivateShare } from "../../../../hooks/trips/shares/deactivate/useDeactivateShare";
import { useShares } from "../../../../hooks/trips/shares/list/useShares";
import { createShareFormModel } from "../../../../models/trips/shares/create/createShareFormModel";
import { validateCreateShareForm } from "../../../../validation/trips/shares/create/shareCreateValidation";
import { ConfirmDialog } from "../../../ui/ConfirmDialog";
import { EmptyState } from "../../../ui/EmptyState";
import { ErrorBox } from "../../../ui/ErrorBox";
import { LoadingState } from "../../../ui/LoadingState";
import { SectionHeader } from "../../../ui/SectionHeader";
import { SuccessBox } from "../../../ui/SuccessBox";
import { CollaboratorList } from "../../shares/collaborators/CollaboratorList";
import { CreatedShareCard } from "../../shares/create/CreatedShareCard";
import { CreateShareForm } from "../../shares/create/CreateShareForm";
import { ShareList } from "../../shares/list/ShareList";
import { SharingTabSwitcher } from "../../shares/tabs/SharingTabSwitcher";

export function TripSharesTab({ trip }) {
  const [formData, setFormData] = useState(() => createShareFormModel());
  const [errors, setErrors] = useState({});
  const [createdShare, setCreatedShare] = useState(null);
  const [shareToDeactivate, setShareToDeactivate] = useState(null);
  const [collaboratorToRemove, setCollaboratorToRemove] = useState(null);
  const [activeSharingTab, setActiveSharingTab] = useState("links");

  const { successMessage, setSuccessMessage, clearSuccessMessage } =
    useSuccessMessage();

  const { shares, loadingShares, sharesError, reloadShares } = useShares(
    trip.id,
  );

  const {
    collaborators,
    loadingCollaborators,
    collaboratorsError,
    reloadCollaborators,
  } = useCollaborators(trip.id);

  const { creatingShare, createShareError, createShare } = useCreateShare();

  const { deactivatingShare, deactivateShareError, deactivateShare } =
    useDeactivateShare();

  const { removingCollaborator, removeCollaboratorError, removeCollaborator } =
    useRemoveCollaborator();

  const hasShares = shares.length > 0;
  const hasCollaborators = collaborators.length > 0;

  function resetForm() {
    setFormData(createShareFormModel());
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

    const validation = validateCreateShareForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const newShare = await createShare(trip.id, formData);

    if (!newShare) {
      return;
    }

    setCreatedShare(newShare);
    resetForm();
    setActiveSharingTab("links");
    setSuccessMessage("Share link created successfully.");

    await reloadShares();
  }

  function handleCancel() {
    resetForm();
    setCreatedShare(null);
    clearSuccessMessage();
  }

  async function handleCopyLink(link) {
    await navigator.clipboard.writeText(link);

    setSuccessMessage("Share link copied to clipboard.");
  }

  function handleDeactivateClick(share) {
    setShareToDeactivate(share);
    clearSuccessMessage();
  }

  function handleCancelDeactivate() {
    setShareToDeactivate(null);
  }

  async function handleConfirmDeactivate() {
    if (!shareToDeactivate) {
      return;
    }

    const deactivatedShare = await deactivateShare(
      trip.id,
      shareToDeactivate.id,
    );

    if (!deactivatedShare) {
      return;
    }

    setShareToDeactivate(null);
    setSuccessMessage("Share link deactivated successfully.");

    await reloadShares();
  }

  function handleRemoveCollaboratorClick(collaborator) {
    setCollaboratorToRemove(collaborator);
    clearSuccessMessage();
  }

  function handleCancelRemoveCollaborator() {
    setCollaboratorToRemove(null);
  }

  async function handleConfirmRemoveCollaborator() {
    if (!collaboratorToRemove) {
      return;
    }

    const removedCollaborator = await removeCollaborator(
      trip.id,
      collaboratorToRemove.userId,
    );

    if (!removedCollaborator) {
      return;
    }

    const removedName =
      collaboratorToRemove.fullName || `User #${collaboratorToRemove.userId}`;

    setCollaboratorToRemove(null);
    setSuccessMessage(`${removedName} removed from collaborators.`);

    await reloadCollaborators();
  }

  return (
    <div className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Sharing"
        description="Create share links, QR codes and manage edit collaborators."
      />

      {successMessage && (
        <div className="mb-5">
          <SuccessBox message={successMessage} />
        </div>
      )}

      {createShareError && (
        <div className="mb-5">
          <ErrorBox message={createShareError} />
        </div>
      )}

      {deactivateShareError && (
        <div className="mb-5">
          <ErrorBox message={deactivateShareError} />
        </div>
      )}

      {removeCollaboratorError && (
        <div className="mb-5">
          <ErrorBox message={removeCollaboratorError} />
        </div>
      )}

      <CreateShareForm
        formData={formData}
        errors={errors}
        submitting={creatingShare}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      {createdShare && (
        <div className="mt-5">
          <CreatedShareCard share={createdShare} onCopy={handleCopyLink} />
        </div>
      )}

      <div className="mt-6 border-t-2 border-[#b8a692] pt-5">
        <SharingTabSwitcher
          activeTab={activeSharingTab}
          onChange={setActiveSharingTab}
        />

        {activeSharingTab === "links" && (
          <div className="mt-5">
            <SectionHeader
              title="Share links"
              description="Review generated links, copy them or deactivate access."
            />

            {loadingShares && <LoadingState message="Loading share links..." />}

            {!loadingShares && sharesError && (
              <ErrorBox message={sharesError} />
            )}

            {!loadingShares && !sharesError && !hasShares && (
              <EmptyState
                title="No share links yet"
                description="Create a share link to let someone open this travel plan."
              />
            )}

            {!loadingShares && !sharesError && hasShares && (
              <ShareList
                shares={shares}
                deactivating={deactivatingShare}
                onCopy={handleCopyLink}
                onDeactivate={handleDeactivateClick}
              />
            )}
          </div>
        )}

        {activeSharingTab === "collaborators" && (
          <div className="mt-5">
            <SectionHeader
              title="Collaborators"
              description="Manage users who claimed edit access to this travel plan."
            />

            {loadingCollaborators && (
              <LoadingState message="Loading collaborators..." />
            )}

            {!loadingCollaborators && collaboratorsError && (
              <ErrorBox message={collaboratorsError} />
            )}

            {!loadingCollaborators &&
              !collaboratorsError &&
              !hasCollaborators && (
                <EmptyState
                  title="No collaborators yet"
                  description="Users who claim edit access from an edit share link will appear here."
                />
              )}

            {!loadingCollaborators &&
              !collaboratorsError &&
              hasCollaborators && (
                <CollaboratorList
                  collaborators={collaborators}
                  removing={removingCollaborator}
                  onRemove={handleRemoveCollaboratorClick}
                />
              )}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(shareToDeactivate)}
        title="Deactivate share link?"
        description="This will make the selected share link unusable. People with this link will no longer be able to open it."
        confirmLabel="Deactivate link"
        cancelLabel="Cancel"
        confirming={deactivatingShare}
        onConfirm={handleConfirmDeactivate}
        onCancel={handleCancelDeactivate}
      />

      <ConfirmDialog
        open={Boolean(collaboratorToRemove)}
        title="Remove collaborator?"
        description={
          collaboratorToRemove
            ? `This will remove edit access for "${
                collaboratorToRemove.fullName ||
                `User #${collaboratorToRemove.userId}`
              }".`
            : ""
        }
        confirmLabel="Remove access"
        cancelLabel="Cancel"
        confirming={removingCollaborator}
        onConfirm={handleConfirmRemoveCollaborator}
        onCancel={handleCancelRemoveCollaborator}
      />
    </div>
  );
}
