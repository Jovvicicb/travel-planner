export function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="min-h-screen bg-[#eee6dc] px-6 py-10 text-[#2f2924]">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#d6c8b8] bg-[#f8f3ec] shadow-2xl shadow-[#2f2924]/10 lg:grid-cols-[1fr_1.05fr]">
          <div className="hidden bg-[#5a4d41] p-10 text-[#f8f3ec] lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#f8f3ec] text-lg font-black text-[#5a4d41] shadow-md shadow-[#2f2924]/20">
                TP
              </div>

              <div className="mt-8">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#d8cbbb]">
                  Travel Planner
                </p>

                <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-[#fffaf3]">
                  Plan your trips with clarity.
                </h1>

                <p className="mt-4 max-w-sm text-sm font-semibold leading-6 text-[#eadfd2]">
                  Organize destinations, activities, budgets and reminders in
                  one calm workspace.
                </p>
              </div>
            </div>

            <p className="text-xs font-semibold text-[#d8cbbb]">
              Plan smarter. Travel easier.
            </p>
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
          </div>
        </section>
      </div>
    </main>
  );
}