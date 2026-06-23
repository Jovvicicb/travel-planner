import { AppHeader } from "../../components/layout/AppHeader";
import { Card } from "../../components/ui/Card";

export function AdminUsersPage() {
  return (
    <>
      <AppHeader
        title="Users"
        description="Manage registered users and their roles."
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <Card>
          <p className="text-sm font-semibold text-[#7b6b5d]">
            Admin users module will be implemented later.
          </p>
        </Card>
      </main>
    </>
  );
}