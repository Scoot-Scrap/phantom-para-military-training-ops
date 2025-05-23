// File: lib/predictiveLoader.js

import { getTopNextPages } from "./predictiveModel";

/**
 * Prefetches predicted next pages when on a sufficiently fast network.
 */
export async function initPredictivePreload(currentPage) {
  const predictions = await getTopNextPages(currentPage, 3); // top 3 pages :contentReference[oaicite:0]{index=0}
  // Only prefetch if connection is >1.5Mbps and probability >50%
  const downlink = navigator.connection?.downlink || 10;
  predictions.forEach(({ page, probability }) => {
    if (downlink > 1.5 && probability > 0.5) {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = page;
      document.head.appendChild(link); // prefetch hint :contentReference[oaicite:1]{index=1}
    }
  });
}
