import { useEffect, useState } from "react";
import { useCreateShare } from "../../../../hooks/trips/shares/create/useCreateShare";
import { useDeactivateShare } from "../../../../hooks/trips/shares/deactivate/useDeactivateShare";
import { useShares } from "../../../../hooks/trips/shares/list/useShares";
import { createShareFormModel } from "../../../../models/trips/shares/create/createShareFormModel";
import { validateCreateShareForm } from "../../../../validation/trips/shares/create/shareCreateValidation";
import { CreatedShareCard } from "../../shares/create/CreatedShareCard";
import { CreateShareForm } from "../../shares/create/CreateShareForm";
import { ShareList } from "../../shares/list/ShareList";
import { ConfirmDialog } from "../../../ui/ConfirmDialog";
import { EmptyState } from "../../../ui/EmptyState";
import { ErrorBox } from "../../../ui/ErrorBox";
import { LoadingState } from "../../../ui/LoadingState";
import { SectionHeader } from "../../../ui/SectionHeader";
import { SuccessBox } from "../../../ui/SuccessBox";

export function TripSharesTab({ trip }) {
  const [formData, setFormData] = useState(() => createShareFormModel());
  const [errors, setErrors] = useState({});
  const [createdShare, setCreatedShare] = useState(null);
  const [shareToDeactivate, setShareToDeactivate] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const { shares, loadingShares, sharesError, reloadShares } = useShares(
    trip.id,
  );

  const { creatingShare, createShareError, createShare } = useCreateShare();

  const { deactivatingShare, deactivateShareError, deactivateShare } =
    useDeactivateShare();

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [successMessage]);

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

    setSuccessMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateCreateShareForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const newShare = await createShare(trip.id, formData);

    setCreatedShare(newShare);
    setFormData(createShareFormModel());
    setErrors({});
    setSuccessMessage("Share link created successfully.");

    await reloadShares();
  }

  function handleCancel() {
    setFormData(createShareFormModel());
    setErrors({});
    setCreatedShare(null);
    setSuccessMessage("");
  }

  async function handleCopyLink(link) {
    await navigator.clipboard.writeText(link);

    setSuccessMessage("Share link copied to clipboard.");
  }

  function handleDeactivateClick(share) {
    setShareToDeactivate(share);
    setSuccessMessage("");
  }

  function handleCancelDeactivate() {
    setShareToDeactivate(null);
  }

  async function handleConfirmDeactivate() {
    if (!shareToDeactivate) {
      return;
    }

    await deactivateShare(trip.id, shareToDeactivate.id);

    setShareToDeactivate(null);
    setSuccessMessage("Share link deactivated successfully.");

    await reloadShares();
  }

  return (
    <div className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Sharing"
        description="Create share links and QR codes for this travel plan."
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
        <SectionHeader
          title="Share links"
          description="Review generated links, copy them or deactivate access."
        />

        {loadingShares && <LoadingState message="Loading share links..." />}

        {!loadingShares && sharesError && <ErrorBox message={sharesError} />}

        {!loadingShares && !sharesError && shares.length === 0 && (
          <EmptyState
            title="No share links yet"
            description="Create a share link to let someone open this travel plan."
          />
        )}

        {!loadingShares && !sharesError && shares.length > 0 && (
          <ShareList
            shares={shares}
            deactivating={deactivatingShare}
            onCopy={handleCopyLink}
            onDeactivate={handleDeactivateClick}
          />
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
    </div>
  );
}
