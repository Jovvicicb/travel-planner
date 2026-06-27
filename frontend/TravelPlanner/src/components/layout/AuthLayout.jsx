import { SharedAccessEntry } from "../sharedTrips/access/SharedAccessEntry";

export function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="min-h-screen bg-[#eee6dc] px-6 py-10 text-[#2f2924]">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full max-w-5xl overflow-hidden rounded-4xl border border-[#d6c8b8] bg-[#f8f3ec] shadow-2xl shadow-[#2f2924]/10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hidden bg-[#5a4d41] p-10 text-[#f8f3ec] lg:flex lg:flex-col lg:justify-center">
            <div>
              <h1 className="text-5xl font-black leading-tight tracking-tight text-[#fffaf3]">
                Travel Planner
              </h1>

              <p className="mt-4 max-w-sm text-sm font-semibold leading-6 text-[#eadfd2]">
                Sign in to manage your travel plans, or paste a shared trip link
                to open a travel plan preview.
              </p>

              <div className="mt-8">
                <SharedAccessEntry dark showQrScanner />
              </div>
            </div>
          </div>

          <div className="p-7 sm:p-10">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7b6b5d]">
                Travel Planner
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-[#2f2924]">
                {title}
              </h2>

              {subtitle && (
                <p className="mt-2 text-sm font-semibold leading-6 text-[#7b6b5d]">
                  {subtitle}
                </p>
              )}
            </div>

            {children}

            <div className="mt-7 border-t border-[#d6c8b8] pt-6 lg:hidden">
              <p className="text-sm font-black text-[#2f2924]">
                Have a shared trip link?
              </p>

              <p className="mt-1 text-sm font-semibold leading-6 text-[#7b6b5d]">
                Paste it below or scan a QR code to open the shared travel plan
                preview.
              </p>

              <div className="mt-4">
                <SharedAccessEntry showQrScanner />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
