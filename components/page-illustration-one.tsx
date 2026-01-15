import Image from "next/image";

import Stripes from "@/public/images/stripes.svg";

export default function PageIllustrationOne() {
  return (
    <>
   
      {/* Circles */}
      <div
        className="pointer-events-none absolute -top-60 left-1/2 ml-[580px] -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-96 w-80 rounded-full bg-gradient-to-tr from-emerald-500 opacity-50 blur-[560px]" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-[20px] ml-[200px] -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-700 opacity-90 blur-[160px]" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-[40px] -ml-[300px] -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-200 opacity-90 blur-[160px]" />
      </div>

      
    </>
  );
}
