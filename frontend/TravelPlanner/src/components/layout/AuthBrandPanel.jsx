import logo from "../../assets/TravelPlaner_logo.png";

import { SharedAccessEntry } from "../sharedTrips/access/SharedAccessEntry";

const brandDescription =
  "Plan every detail of your trip in one place, or open a shared travel plan using a link or QR code.";

export function AuthBrandPanel() {
  return (
    <div className="hidden bg-[#5a4d41] p-10 text-[#f8f3ec] lg:flex lg:flex-col lg:justify-center">
      <div>
        <img
          src={logo}
          alt="Travel Planner"
          className="h-28 w-full object-contain"
        />

        <p className="mt-5 max-w-md text-base font-semibold italic leading-7 text-[#eadfd2]">
          {brandDescription}
        </p>

        <div className="mt-8">
          <SharedAccessEntry dark showQrScanner />
        </div>
      </div>
    </div>
  );
}
