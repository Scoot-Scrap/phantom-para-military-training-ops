// File: pages/_app.js

import { useEffect } from "react";
import { initPredictivePreload } from "../lib/predictiveLoader";

export default function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    initPredictivePreload(router.pathname); // trigger on route change :contentReference[oaicite:2]{index=2}
  }, [router.pathname]);

  return <Component {...pageProps} />;
}
