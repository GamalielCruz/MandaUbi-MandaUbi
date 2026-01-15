"use client";

import { useState } from "react";

export default function Banner() {
  const [bannerOpen, setBannerOpen] = useState<boolean>(true);

  return (
    <>
      {bannerOpen && (
        <div className="fixed bottom-0 right-0 z-50 w-full md:bottom-8 md:right-12 md:w-auto">
          <div className="flex justify-between bg-slate-800 p-3 text-sm text-slate-50 shadow-lg md:rounded">
            
          </div>
        </div>
      )}
    </>
  );
}
