export function AuthBackgroundPattern() {
  return (
    <>
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#5a4d41]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-[#5a4d41]/8 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 opacity-10">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-150 760 C 90 560, 230 420, 430 300 C 660 170, 860 430, 1080 320 C 1280 220, 1450 80, 1600 10"
            stroke="#5a4d41"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M-100 650 C 140 500, 300 620, 500 460 C 720 290, 900 360, 1100 220 C 1310 70, 1460 120, 1590 40"
            stroke="#5a4d41"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M-140 870 C 120 710, 360 790, 580 610 C 800 430, 1000 570, 1210 390 C 1380 250, 1500 280, 1620 170"
            stroke="#5a4d41"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <circle cx="430" cy="300" r="5" fill="#5a4d41" />
          <circle cx="1080" cy="320" r="5" fill="#5a4d41" />
          <circle cx="500" cy="460" r="4.5" fill="#5a4d41" />
          <circle cx="1100" cy="220" r="4.5" fill="#5a4d41" />
          <circle cx="580" cy="610" r="5" fill="#5a4d41" />
          <circle cx="1210" cy="390" r="5" fill="#5a4d41" />
        </svg>
      </div>
    </>
  );
}
