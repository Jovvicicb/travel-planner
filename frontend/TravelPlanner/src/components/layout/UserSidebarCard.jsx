import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { getUserInitials } from "../../helpers/userInitialsHelper";
import { Badge } from "../ui/Badge";

export function UserSidebarCard() {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="mt-5 rounded-3xl border border-[#746454] bg-[#5a4d41] p-4 shadow-lg shadow-[#2f2924]/15">
        <p className="mb-3 text-sm font-bold text-[#f8f3ec]">
          Continue planning your trips.
        </p>

        <div className="grid gap-2">
          <Link
            to="/login"
            className="rounded-2xl bg-[#f8f3ec] px-3 py-2.5 text-center text-sm font-black text-[#4b4036] transition hover:bg-[#eee6dc]"
          >
            Sign in
          </Link>

          <Link
            to="/register"
            className="rounded-2xl border border-[#746454] bg-[#4b4036] px-3 py-2.5 text-center text-sm font-black text-[#f8f3ec] transition hover:bg-[#6f5f48]"
          >
            Create account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-3xl border border-[#746454] bg-[#5a4d41] p-4 shadow-lg shadow-[#2f2924]/15">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f8f3ec] text-sm font-black text-[#4b4036] shadow-md shadow-[#2f2924]/20">
          {getUserInitials(user?.fullName)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-black text-[#fffaf3]">
            {user?.fullName}
          </p>

          <p className="truncate text-xs font-medium text-[#d8cbbb]">
            {user?.email}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <Badge variant={isAdmin ? "light" : "earthDark"}>
          {isAdmin ? "Admin" : "User"}
        </Badge>

        <button
          type="button"
          onClick={logout}
          className="rounded-xl px-3 py-1.5 text-xs font-black text-[#f2c7c7] transition hover:bg-[#6f3f3f]/30 hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
