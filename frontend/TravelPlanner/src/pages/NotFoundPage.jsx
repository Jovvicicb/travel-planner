import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ui/ButtonLink";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#6a5b4c] px-4 py-10 text-[#f8f3ec]">
      <div className="w-full max-w-2xl rounded-4xl border border-[#8a7867] bg-[#4b4036]/95 p-8 text-center shadow-2xl shadow-[#2f2924]/30">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-[#a8927d] bg-[#5a4d41] text-4xl font-bold text-[#f8f3ec] shadow-lg shadow-[#2f2924]/20">
          404
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#d8c7b5]">
          Page not found
        </p>

        <h1 className="mb-4 text-3xl font-bold text-[#fff8ef] md:text-4xl">
          This travel route does not exist
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-sm leading-7 text-[#e7d8c8] md:text-base">
          The page you are looking for may have been moved, deleted or the link
          may be incorrect. You can return to your travel plans and continue
          organizing your trip.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink to="/trips">Back to travel plans</ButtonLink>

          <Link
            to="/"
            className="rounded-full border border-[#a8927d] px-5 py-2.5 text-sm font-semibold text-[#f8f3ec] transition hover:bg-[#5a4d41]"
          >
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}
