import React, { useState } from "react";
export default function useBanner() {
  const [banner, setBanner] = useState();
  return [banner, setBanner];
}
