import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#eee6dc] text-[#2f2924]">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto px-6 py-7 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
