import { CollaboratorCard } from "./CollaboratorCard";

export function CollaboratorList({ collaborators, removing, onRemove }) {
  return (
    <div className="grid gap-4">
      {collaborators.map((collaborator) => (
        <CollaboratorCard
          key={`${collaborator.travelPlanId}-${collaborator.userId}`}
          collaborator={collaborator}
          removing={removing}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
